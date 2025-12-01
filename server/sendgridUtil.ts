// SendGrid Email Utility
import sgMail from "@sendgrid/mail";

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      console.error("❌ SendGrid API key not configured (SENDGRID_API_KEY)");
      return false;
    }

    console.log(`📧 Sending email to ${to} with subject: ${subject}`);
    sgMail.setApiKey(apiKey);

    // Use a verified sender email or domain
    const fromEmail = "noreply@gridguardian.ai";
    
    const result = await sgMail.send({
      to,
      from: fromEmail,
      subject,
      html,
    });

    console.log(`✅ Email sent successfully to ${to}`);
    return true;
  } catch (error: any) {
    console.error(`❌ SendGrid email error for ${to}:`);
    console.error("Error:", error?.message);
    if (error?.response?.body) {
      console.error("Response:", error.response.body);
    }
    return false;
  }
}
