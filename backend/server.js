require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");

// ========================================
// APP CONFIGURATION
// ========================================

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.set("trust proxy", 1);
app.disable("x-powered-by");

// ========================================
// ENVIRONMENT VARIABLES
// ========================================

const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// ========================================
// SECURITY MIDDLEWARE
// ========================================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// CORS - Single configuration only
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.warn("Blocked CORS origin:", origin);

      return callback(new Error("Origin is not allowed by CORS"));
    },

    methods: ["GET", "POST", "OPTIONS"],

    allowedHeaders: ["Content-Type"],

    optionsSuccessStatus: 204,
  })
);

app.use(express.json({ limit: "20kb" }));

app.use(
  express.urlencoded({
    extended: false,
    limit: "20kb",
  })
);

// ========================================
// RATE LIMITING
// ========================================

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

// ========================================
// HELPER FUNCTIONS
// ========================================

const clean = (value, maxLength = 2000) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
};

const escapeHtml = (value) => {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[char];
  });
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ========================================
// HEALTH CHECK
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "suryoday-solar-website-backend",
    status: "running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "suryoday-solar-website-backend",
    status: "ok",
  });
});

// ========================================
// CONTACT / LEAD FORM API
// ========================================

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    // Check email service
    if (!resend) {
      console.error("RESEND_API_KEY is missing");

      return res.status(503).json({
        success: false,
        message: "Email service is currently unavailable.",
      });
    }

    // ------------------------------------
    // RECEIVE CUSTOMER DETAILS
    // ------------------------------------

    const name = clean(req.body?.name, 120);

    const phone = clean(req.body?.phone, 10);

    const email = clean(req.body?.email, 254).toLowerCase();

    const city = clean(req.body?.city, 100);

    const state = clean(req.body?.state, 100);

    const bill = clean(req.body?.bill, 100);

    const message = clean(req.body?.message, 2000);

    const source = clean(req.body?.source, 100) || "Website";

    // ------------------------------------
    // VALIDATION
    // ------------------------------------

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number.",
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // ------------------------------------
    // EMAIL CONFIGURATION
    // ------------------------------------

    const from = process.env.RESEND_FROM_EMAIL;

    const adminEmail = process.env.CONTACT_RECEIVER;

    if (!from || !adminEmail) {
      console.error("Email configuration incomplete", {
        hasFromEmail: Boolean(from),
        hasContactReceiver: Boolean(adminEmail),
      });

      return res.status(503).json({
        success: false,
        message: "Email configuration is incomplete.",
      });
    }

    // ------------------------------------
    // SANITIZE EMAIL CONTENT
    // ------------------------------------

    const safe = (value) =>
      escapeHtml(value || "Not provided");

    const safeName = safe(name);
    const safePhone = safe(phone);
    const safeEmail = safe(email);
    const safeCity = safe(city);
    const safeState = safe(state);
    const safeBill = safe(bill);

    const safeMessage = safe(message).replace(
      /\r?\n/g,
      "<br>"
    );

    const safeSource = safe(source);

    // ====================================
    // 1. ADMIN ENQUIRY EMAIL
    // ====================================

    console.log("Sending admin enquiry email...");

    let adminResult;

    try {
      adminResult = await resend.emails.send({
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
Source: ${source}
        `,
      });

      if (adminResult.error) {
        console.error(
          "ADMIN RESEND ERROR:",
          adminResult.error
        );

        return res.status(502).json({
          success: false,
          message: "Your enquiry could not be submitted. Please try again.",
        });
      }

      console.log(
        "ADMIN EMAIL ACCEPTED:",
        adminResult.data?.id
      );

    } catch (error) {
      console.error(
        "ADMIN EMAIL EXCEPTION:",
        error.message
      );

      return res.status(502).json({
        success: false,
        message: "Unable to send your enquiry. Please try again.",
      });
    }

    // ====================================
    // 2. CUSTOMER THANK YOU EMAIL
    // ====================================

    let customerEmailSent = false;

    if (email) {
      console.log("Sending customer confirmation email...");

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
Monthly Bill: ${bill || "Not provided"}

Regards,
Suryoday Solar Energy Team
          `,
        });

        if (customerResult.error) {
          console.error(
            "CUSTOMER RESEND ERROR:",
            customerResult.error
          );
        } else {
          customerEmailSent = true;

          console.log(
            "CUSTOMER EMAIL ACCEPTED:",
            customerResult.data?.id
          );
        }

      } catch (error) {
        console.error(
          "CUSTOMER EMAIL EXCEPTION:",
          error.message
        );
      }
    } else {
      console.log(
        "Customer email skipped: No email address provided."
      );
    }

    // ====================================
    // SUCCESS RESPONSE
    // ====================================

    return res.status(200).json({
      success: true,

      message:
        "Thank you! Our solar expert will call you within 30 minutes.",

      adminEmailSent: true,

      customerEmailSent,
    });

  } catch (error) {
    console.error(
      "CONTACT ROUTE ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

// ========================================
// GLOBAL ERROR HANDLER
// ========================================

app.use((error, req, res, next) => {
  if (error.message === "Origin is not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "This website origin is not allowed.",
    });
  }

  console.error("SERVER ERROR:", error.message);

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, "0.0.0.0", () => {
  console.log("----------------------------------");
  console.log("Suryoday Solar Backend Started");
  console.log("Port:", PORT);
  console.log("Environment:", process.env.NODE_ENV || "development");
  console.log("Allowed frontend origins:", allowedOrigins);
  console.log("Resend configured:", Boolean(resend));
  console.log("----------------------------------");
});