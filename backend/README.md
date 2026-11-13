# Suryoday Solar — Lead Form Backend

Express + MongoDB Atlas + Resend API backend for the Suryoday Solar website lead form.

## Requirements
- Node.js 20+
- MongoDB Atlas database and connection string
- Resend account, API key, and a verified sending domain

## Setup (Windows PowerShell)

```powershell
cd suryoday-lead-backend
npm install
Copy-Item .env.example .env
```

Edit `.env` and set:
- `MONGODB_URI`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` — sender must use a domain verified in Resend
- `ADMIN_EMAIL` — inbox that receives new enquiries
- `FRONTEND_URLS` — exact local frontend origin(s), comma-separated

Never commit `.env` or expose the Resend API key in frontend code.

## Run

```powershell
npm run dev
```

Health check: `http://localhost:5000/api/health`

## API

`POST http://localhost:5000/api/leads`

Example JSON:

```json
{
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "email": "rahul@example.com",
  "city": "Kanpur",
  "state": "Uttar Pradesh",
  "bill": "₹2,500 – ₹5,000",
  "message": "I need a 3KW solar system",
  "source": "homepage"
}
```

Required: `name`, `phone`, `city`. Email, state, bill, message and source are optional.
Phone validation accepts 10-digit Indian mobile numbers starting 6–9.

Success response is HTTP 201. The lead is saved before Resend is called. If email delivery fails, the lead remains in MongoDB and its `notificationStatus` is set to `failed`; the API still returns success so a customer's enquiry is not lost.

## Frontend integration (Vite + React)

Add this to the frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Replace the old localStorage submit handler with:

```tsx
async function handle(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (loading) return;

  setLoading(true);
  try {
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to submit enquiry.");
    }

    toast.success("Thank you! Our solar expert will contact you shortly.");
    form.reset();
  } catch (error) {
    console.error("Lead submission failed:", error);
    toast.error(error instanceof Error ? error.message : "Please try again.");
  } finally {
    setLoading(false);
  }
}
```

Restart Vite after changing `.env`.

## Production checklist
1. Deploy the API on a server with HTTPS.
2. Set production environment variables in the hosting dashboard (do not upload `.env`).
3. Set `FRONTEND_URLS` to the exact deployed website origin.
4. Use a MongoDB database user restricted to the application database; do not use an Atlas admin account.
5. Configure Resend sender domain DNS records and test delivery.
6. If running multiple API instances, use a shared rate-limit store (for example Redis); the default limiter is in-memory.
7. Add monitoring/alerts and a retry queue for failed email notifications before relying on email as the only operational alert.
8. Add authenticated admin-only endpoints before exposing lead records or status updates. This starter intentionally exposes only public lead creation and health check.

## Notes
- No public endpoint to list leads is included; never expose customer leads without authentication and server-side authorization.
- The `website` honeypot field is optional. If you add it to the form, keep it visually hidden from real users and out of keyboard navigation.
