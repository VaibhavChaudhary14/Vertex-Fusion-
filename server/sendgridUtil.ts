// Mailtrap Email API Utility
// Uses Mailtrap Email API/Send endpoint for reliable delivery

const FROM_EMAIL = "noreply@gridguardian.ai";
const FROM_NAME = "Vertex Fusion";
const EMAIL_RETRY_ATTEMPTS = 3;
const EMAIL_RETRY_DELAY = 1000; // 1 second
const MAILTRAP_API_ENDPOINT = "https://send.api.mailtrap.io/api/send";

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sends email using Mailtrap Email API with retry logic
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  attempts = 0
): Promise<SendEmailResult> {
  try {
    const apiToken = process.env.MAILTRAP_API_TOKEN;

    if (!apiToken) {
      console.error("❌ [Email] Mailtrap API token not configured");
      return {
        success: false,
        error: "Mailtrap API token not configured",
      };
    }

    // Validate email format
    if (!isValidEmail(to)) {
      console.error(`❌ [Email] Invalid recipient email: ${to}`);
      return {
        success: false,
        error: "Invalid recipient email format",
      };
    }

    // Validate inputs
    if (!subject || !html) {
      console.error("❌ [Email] Missing subject or html content");
      return {
        success: false,
        error: "Missing subject or content",
      };
    }

    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] 📧 [Email] Sending to: ${to} | Subject: ${subject} | Attempt: ${attempts + 1}/${EMAIL_RETRY_ATTEMPTS}`
    );

    // Prepare email payload
    const payload = {
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: to }],
      subject,
      html,
    };

    // Send via Mailtrap Email API
    const response = await fetch(MAILTRAP_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Mailtrap API error ${response.status}: ${errorData?.message || response.statusText}`
      );
    }

    const result = await response.json();
    const messageId = result?.success ? result?.message_ids?.[0] || "sent" : null;

    console.log(
      `[${new Date().toISOString()}] ✅ [Email] Sent successfully to: ${to} | MessageId: ${messageId}`
    );

    return {
      success: true,
      messageId,
    };
  } catch (error: any) {
    const timestamp = new Date().toISOString();

    // Detailed error logging
    console.error(`[${timestamp}] ❌ [Email] Failed to send to ${to}`);
    console.error(`   Error Type: ${error?.name || "Unknown"}`);
    console.error(`   Message: ${error?.message}`);

    // Retry logic for transient failures
    if (attempts < EMAIL_RETRY_ATTEMPTS - 1) {
      const isTransientError =
        error?.message?.includes("ECONNREFUSED") ||
        error?.message?.includes("ETIMEDOUT") ||
        error?.message?.includes("ENOTFOUND") ||
        error?.message?.includes("ECONNRESET") ||
        error?.message?.includes("502") ||
        error?.message?.includes("503") ||
        error?.message?.includes("504");

      if (isTransientError) {
        console.log(`[${timestamp}] 🔄 [Email] Retrying in ${EMAIL_RETRY_DELAY}ms...`);
        await new Promise((resolve) => setTimeout(resolve, EMAIL_RETRY_DELAY));
        return sendEmail(to, subject, html, attempts + 1);
      }
    }

    return {
      success: false,
      error: error?.message || "Unknown email error",
    };
  }
}

/**
 * Send verification email template
 */
export async function sendVerificationEmail(email: string, firstName: string, verificationLink: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #00c084; }
          .header h1 { color: #00c084; margin: 0; font-size: 28px; }
          .content { padding: 30px 0; }
          .button { display: inline-block; padding: 12px 30px; background-color: #00c084; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛡️ Vertex Fusion</h1>
          </div>
          <div class="content">
            <p>Hi ${firstName},</p>
            <p>Welcome to Vertex Fusion! Please verify your email address to complete your account setup.</p>
            <p style="text-align: center;">
              <a href="${verificationLink}" class="button">Verify Email Address</a>
            </p>
            <p>If the button doesn't work, copy and paste this link:</p>
            <p style="word-break: break-all; font-size: 12px; color: #666;"><code>${verificationLink}</code></p>
            <p>This link expires in 24 hours.</p>
          </div>
          <div class="footer">
            <p>Vertex Fusion - Smart Grid Security Platform</p>
            <p>© 2025. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail(email, "Verify your Vertex Fusion account", html);
}

/**
 * Send password reset email template
 */
export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #00c084; }
          .header h1 { color: #00c084; margin: 0; font-size: 28px; }
          .content { padding: 30px 0; }
          .button { display: inline-block; padding: 12px 30px; background-color: #00c084; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; }
          .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset</h1>
          </div>
          <div class="content">
            <p>We received a request to reset your Vertex Fusion password.</p>
            <p style="text-align: center;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </p>
            <p>If the button doesn't work, copy and paste this link:</p>
            <p style="word-break: break-all; font-size: 12px; color: #666;"><code>${resetLink}</code></p>
            <div class="warning">
              <strong>⚠️ Security Note:</strong> This link expires in 24 hours. If you didn't request this, please ignore this email.
            </div>
          </div>
          <div class="footer">
            <p>Vertex Fusion - Smart Grid Security Platform</p>
            <p>© 2025. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail(email, "Reset your Vertex Fusion password", html);
}
