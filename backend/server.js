require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const origins = (
  process.env.FRONTEND_URL || "http://localhost:8080"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));

app.use(cors({
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
}));

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
  value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    if (!resend) {
      return res.status(503).json({
        success: false,
        message: "Contact service is not configured.",
      });
    }

    const name = clean(req.body?.name, 120);
    const phone = clean(req.body?.phone, 20);
    const email = clean(req.body?.email, 254);
    const service = clean(req.body?.service, 120);
    const message = clean(req.body?.message, 3000);

    if (!name || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, service and message are required.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit Indian mobile number.",
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.CONTACT_RECEIVER;

    if (!from || !to) {
      return res.status(503).json({
        success: false,
        message: "Contact email settings are incomplete.",
      });
    }

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email || "Not provided");
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#172033">

        <div style="background:#102b55;padding:24px;color:white;border-radius:12px 12px 0 0">
          <h2 style="margin:0">New Website Enquiry</h2>
          <p style="margin-bottom:0">Suryoday Solar Energy</p>
        </div>

        <div style="padding:24px;border:1px solid #e5e7eb;border-radius:0 0 12px 12px">

          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Interested In:</strong> ${safeService}</p>

          <p>
            <strong>Message:</strong><br/>
            ${safeMessage}
          </p>

          <hr style="border:0;border-top:1px solid #eee;margin:24px 0"/>

          <p style="font-size:12px;color:#777">
            This enquiry was submitted through the Suryoday Solar website.
          </p>

        </div>
      </div>
    `;

    const emailText = [
      "New Suryoday Solar Energy enquiry",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Service: ${service}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      ...(email ? { replyTo: email } : {}),
      subject: `New Suryoday Solar Enquiry — ${name}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        success: false,
        message: "Could not send your enquiry. Please try again.",
      });
    }

    console.log("Suryoday enquiry sent:", data?.id);

    return res.status(200).json({
      success: true,
      message: "Thank you for contacting Suryoday Solar Energy. Your enquiry has been sent successfully.",
      id: data?.id,
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
  console.log("Allowed frontend origins:", origins);
});