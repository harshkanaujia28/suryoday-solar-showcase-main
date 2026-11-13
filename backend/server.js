require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || origins.includes(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }

      console.warn("Blocked CORS origin:", origin);
      return callback(new Error("Origin is not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204,
  }),
);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many enquiries. Please try again in 15 minutes.",
  },
});

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const clean = (value, maxLength = 2000) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "suryoday-solar-website-backend",
    status: "ok",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "suryoday-solar-website-backend",
    status: "ok",
  });
});

// POST /api/contact
// POST /api/contact
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    if (!resend) {
      return res.status(503).json({
        success: false,
        message: "Email service is not configured.",
      });
    }

    // Receive customer details
    const name = clean(req.body?.name, 120);
    const phone = clean(req.body?.phone, 10);
    const email = clean(req.body?.email, 254);
    const city = clean(req.body?.city, 100);
    const state = clean(req.body?.state, 100);
    const bill = clean(req.body?.bill, 100);
    const message = clean(req.body?.message, 3000);
    const source = clean(req.body?.source, 100);

    // Validation
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid mobile number.",
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const from = process.env.RESEND_FROM_EMAIL;
    const adminEmail = process.env.CONTACT_RECEIVER;

    if (!from || !adminEmail) {
      return res.status(503).json({
        success: false,
        message: "Email configuration is incomplete.",
      });
    }

    // Escape HTML to prevent HTML injection
    const safe = (value) => escapeHtml(value || "Not provided");

    const safeName = safe(name);
    const safePhone = safe(phone);
    const safeEmail = safe(email);
    const safeCity = safe(city);
    const safeState = safe(state);
    const safeBill = safe(bill);
    const safeMessage = safe(message).replace(/\r?\n/g, "<br>");
    const safeSource = safe(source || "Website");

    // =====================================
    // 1. SEND ENQUIRY EMAIL TO ADMIN
    // =====================================

    const adminResult = await resend.emails.send({
      from,
      to: [adminEmail],
      ...(email ? { replyTo: email } : {}),
      subject: `New Solar Enquiry - ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#172033">

          <div style="background:#102b55;padding:25px;color:white;border-radius:12px 12px 0 0">
            <h2 style="margin:0">New Website Enquiry</h2>
            <p>Suryoday Solar Energy</p>
          </div>

          <div style="padding:25px;border:1px solid #eee;border-radius:0 0 12px 12px">

            <h3>Customer Details</h3>

            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>City:</strong> ${safeCity}</p>
            <p><strong>State:</strong> ${safeState}</p>
            <p><strong>Monthly Electricity Bill:</strong> ${safeBill}</p>
            <p><strong>Message:</strong><br>${safeMessage}</p>
            <p><strong>Lead Source:</strong> ${safeSource}</p>

            <hr style="border:0;border-top:1px solid #eee;margin:25px 0">

            <p style="font-size:12px;color:#777">
              This enquiry was submitted through Suryoday Solar Energy website.
            </p>

          </div>
        </div>
      `,
      text: `
New Suryoday Solar Enquiry

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
City: ${city || "Not provided"}
State: ${state || "Not provided"}
Monthly Bill: ${bill || "Not provided"}
Message: ${message || "Not provided"}
Source: ${source || "Website"}
      `,
    });

    if (adminResult.error) {
      console.error("Admin email error:", adminResult.error);

      return res.status(502).json({
        success: false,
        message: "Your enquiry could not be submitted. Please try again.",
      });
    }

    // =====================================
    // 2. SEND THANK YOU EMAIL TO CUSTOMER
    // =====================================

    let customerEmailSent = false;

    if (email) {
      try {
        const customerResult = await resend.emails.send({
          from,
          to: [email],
          subject: "Thank You for Contacting Suryoday Solar Energy!",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#172033;border:1px solid #eee;border-radius:12px;overflow:hidden">

              <div style="background:#102b55;padding:30px;color:white;text-align:center">
                <h2 style="margin:0">Thank You, ${safeName}!</h2>
                <p>Suryoday Solar Energy</p>
              </div>

              <div style="padding:30px">

                <h3>Your enquiry has been received!</h3>

                <p>
                  Thank you for showing interest in Suryoday Solar Energy.
                  We have successfully received your enquiry.
                </p>

                <p>
                  Our team will review your details and contact you shortly.
                </p>

                <div style="background:#f8fafc;padding:20px;border-radius:10px;margin:25px 0">

                  <h3>Your Enquiry Details</h3>

                  <p><strong>Name:</strong> ${safeName}</p>
                  <p><strong>Phone:</strong> ${safePhone}</p>
                  <p><strong>City:</strong> ${safeCity}</p>
                  <p><strong>Monthly Bill:</strong> ${safeBill}</p>

                </div>

                <p>
                  If you have any questions, simply reply to this email.
                </p>

                <p style="margin-top:30px">
                  Regards,<br>
                  <strong>Suryoday Solar Energy Team</strong>
                </p>

              </div>
            </div>
          `,
          text: `
Hello ${name},

Thank you for contacting Suryoday Solar Energy!

Your enquiry has been received successfully.
Our team will contact you shortly.

Your Details:
Name: ${name}
Phone: ${phone}
City: ${city || "Not provided"}
Monthly Electricity Bill: ${bill || "Not provided"}

Regards,
Suryoday Solar Energy Team
          `,
        });

        if (customerResult.error) {
          console.error(
            "Customer confirmation email error:",
            customerResult.error,
          );
        } else {
          customerEmailSent = true;
        }
      } catch (error) {
        console.error("Customer email failed:", error.message);
      }
    }

    console.log("Admin enquiry email sent:", adminResult.data?.id);

    return res.status(200).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      customerEmailSent,
    });
  } catch (error) {
    console.error("Contact route error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

app.use((error, req, res, next) => {
  if (error.message === "Origin is not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "This website origin is not allowed.",
    });
  }

  console.error("Server error:", error.message);

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

app.listen(PORT, () => {
  console.log(`Suryoday Solar backend running on port ${PORT}`);
});