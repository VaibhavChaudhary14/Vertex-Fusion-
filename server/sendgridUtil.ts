// Mailtrap Email Utility with Enhanced Error Handling
// Uses nodemailer for SMTP with Mailtrap

import nodemailer from "nodemailer";

const FROM_EMAIL = "noreply@gridguardian.ai";
const FROM_NAME = "Vertex Fusion";
const EMAIL_RETRY_ATTEMPTS = 3;
const EMAIL_RETRY_DELAY = 1000; // 1 second

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
 * Creates and returns a Mailtrap transporter instance
 */
function getMailtrapTransporter() {
  const host = process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io";
  const port = parseInt(process.env.MAILTRAP_PORT || "2525");
  const user = process.env.MAILTRAP_USER;
  const pass = process.env.MAILTRAP_PASS;

  if (!user || !pass) {
    throw new Error("Mailtrap credentials not configured (MAILTRAP_USER or MAILTRAP_PASS missing)");
  }

  return nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
    secure: port === 465, // Use TLS for port 465
  });
}

/**
 * Sends email using Mailtrap SMTP with retry logic
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  attempts = 0
): Promise<SendEmailResult> {
  try {
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

    // Get transporter with credentials check
    let transporter;
    try {
      transporter = getMailtrapTransporter();
    } catch (credentialError: any) {
      console.error(`❌ [Email] ${credentialError.message}`);
      return {
        success: false,
        error: credentialError.message,
      };
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log(`[${new Date().toISOString()}] ✅ [Email] Sent successfully to: ${to} | MessageId: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    const timestamp = new Date().toISOString();

    // Detailed error logging
    console.error(`[${timestamp}] ❌ [Email] Failed to send to ${to}`);
    console.error(`   Error Type: ${error?.name || "Unknown"}`);
    console.error(`   Message: ${error?.message}`);

    if (error?.code) {
      console.error(`   Error Code: ${error.code}`);
    }

    if (error?.response) {
      console.error(`   Response:`, error.response);
    }

    // Retry logic for transient failures
    if (attempts < EMAIL_RETRY_ATTEMPTS - 1) {
      const isTransientError =
        error?.code === "ECONNREFUSED" ||
        error?.code === "ETIMEDOUT" ||
        error?.code === "ENOTFOUND" ||
        error?.code === "ECONNRESET" ||
        (error?.response?.status >= 500 && error?.response?.status < 600);

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
