import nodemailer from "nodemailer";

/**
 * Notifier for VARSHA AGRO Enquiries
 * Ensures client never loses a lead, even on ephemeral hosting.
 */

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || "contact@varshaagro.com";
const NOTIFICATION_FALLBACK_EMAIL = "baba.bondar@gmail.com";

let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
} else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
}

export async function notifyNewInquiry(inquiry) {
  const { referenceId, name, phone, email, requirement, quantity, message, dateFormatted, timeFormatted, source } = inquiry;

  console.log(`[LEAD RECEIVED] ${referenceId} - ${name} (${phone}) interested in ${requirement}`);

  // 1. Send Email Notification if transporter is configured
  if (transporter) {
    try {
      const mailOptions = {
        from: `"VARSHA AGRO Website" <${process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@varshaagro.com"}>`,
        to: `${NOTIFICATION_EMAIL}, ${NOTIFICATION_FALLBACK_EMAIL}`,
        subject: `🌾 New Lead [${referenceId}]: ${name} - ${requirement}`,
        text: `NEW INQUIRY RECEIVED - VARSHA AGRO
-------------------------------------------
Reference ID : ${referenceId}
Customer Name: ${name}
Phone Number : ${phone}
Email        : ${email || "Not provided"}
Requirement  : ${requirement}
Quantity     : ${quantity || "Not specified"}
Source       : ${source || "Website Form"}
Received At  : ${dateFormatted} at ${timeFormatted}

Customer Message:
${message || "No additional message provided."}

Quick Actions:
- Call Customer: tel:${phone.replace(/\s+/g, "")}
- WhatsApp Customer: https://wa.me/${phone.replace(/[^0-9]/g, "")}
-------------------------------------------
VARSHA AGRO | Wathwada, Kalamb, Dist. Dharashiv, Maharashtra`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #123B2A; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #123B2A; color: #ffffff; padding: 20px; text-align: center;">
              <h2 style="margin: 0; font-size: 22px; color: #C69A3A;">VARSHA AGRO</h2>
              <p style="margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">New Business Enquiry Received</p>
            </div>
            <div style="padding: 24px; background-color: #F7F4EC;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #123B2A; width: 140px;">Reference ID:</td>
                  <td style="padding: 8px 0; font-family: monospace; font-weight: bold; font-size: 16px; color: #123B2A;">${referenceId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #123B2A;">Customer Name:</td>
                  <td style="padding: 8px 0; color: #202522;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #123B2A;">Contact Phone:</td>
                  <td style="padding: 8px 0;">
                    <a href="tel:${phone.replace(/\s+/g, "")}" style="color: #123B2A; font-weight: bold; text-decoration: none;">${phone}</a>
                    &nbsp;|&nbsp;
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="color: #25D366; font-weight: bold; text-decoration: none;">Chat on WhatsApp &rarr;</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #123B2A;">Email:</td>
                  <td style="padding: 8px 0; color: #202522;">${email || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #123B2A;">Interested In:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #3F6B45;">${requirement}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #123B2A;">Quantity / Volume:</td>
                  <td style="padding: 8px 0; color: #202522;">${quantity || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #123B2A;">Submission Time:</td>
                  <td style="padding: 8px 0; color: #666666;">${dateFormatted} at ${timeFormatted}</td>
                </tr>
              </table>
              <div style="margin-top: 18px; padding: 14px; background: #ffffff; border-radius: 6px; border: 1px solid #e0ded7;">
                <strong style="color: #123B2A; display: block; margin-bottom: 6px;">Customer Notes / Message:</strong>
                <p style="margin: 0; color: #333333; line-height: 1.5; white-space: pre-wrap;">${message || "No message provided."}</p>
              </div>
            </div>
            <div style="background-color: #123B2A; color: #F7F4EC; padding: 12px; text-align: center; font-size: 11px;">
              VARSHA AGRO &bull; Wathwada, Taluka Kalamb, Dist. Dharashiv, Maharashtra
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`[LEAD NOTIFICATION] Email sent successfully for ${referenceId}`);
    } catch (err) {
      console.error("[LEAD NOTIFICATION ERROR] Failed to send email notification:", err.message);
    }
  } else {
    console.log(`[LEAD NOTIFICATION SIMULATED] No SMTP credentials configured. Lead recorded in database for ${referenceId}. To enable email notifications, configure SMTP_HOST, SMTP_USER, SMTP_PASS in .env`);
  }

  // 2. Dispatch to Webhook URL if provided (Telegram/Slack/Zapier/WhatsApp integration)
  if (process.env.ENQUIRY_WEBHOOK_URL) {
    try {
      await fetch(process.env.ENQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry)
      });
      console.log(`[LEAD WEBHOOK] Dispatched lead ${referenceId} to webhook URL`);
    } catch (err) {
      console.error("[LEAD WEBHOOK ERROR]", err.message);
    }
  }
}
