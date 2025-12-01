// SendGrid Replit Integration Utility
// Reference: SendGrid Replit connection integration

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    console.warn("X_REPLIT_TOKEN not found, falling back to SENDGRID_API_KEY env var");
    return {
      apiKey: process.env.SENDGRID_API_KEY,
      fromEmail: "noreply@gridguardian.ai"
    };
  }

  try {
    const response = await fetch(
      "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=sendgrid",
      {
        headers: {
          Accept: "application/json",
          X_REPLIT_TOKEN: xReplitToken,
        },
      }
    );
    
    const data = await response.json();
    const connectionSettings = data.items?.[0];

    if (!connectionSettings?.settings?.api_key || !connectionSettings?.settings?.from_email) {
      console.warn("SendGrid not properly connected, falling back to SENDGRID_API_KEY env var");
      return {
        apiKey: process.env.SENDGRID_API_KEY,
        fromEmail: "noreply@gridguardian.ai"
      };
    }

    return {
      apiKey: connectionSettings.settings.api_key,
      fromEmail: connectionSettings.settings.from_email,
    };
  } catch (error) {
    console.warn("Failed to fetch SendGrid credentials from connector, falling back to env var:", error);
    return {
      apiKey: process.env.SENDGRID_API_KEY,
      fromEmail: "noreply@gridguardian.ai"
    };
  }
}

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const { apiKey, fromEmail } = await getCredentials();

    if (!apiKey) {
      console.error("❌ SendGrid API key not configured - cannot send email");
      return false;
    }

    console.log(`📧 Sending email to ${to} with subject: ${subject}`);
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(apiKey);

    const result = await sgMail.send({
      to,
      from: fromEmail,
      subject,
      html,
    });

    console.log(`✅ Email sent successfully to ${to}`, result);
    return true;
  } catch (error) {
    console.error(`❌ SendGrid email error for ${to}:`, error);
    return false;
  }
}
