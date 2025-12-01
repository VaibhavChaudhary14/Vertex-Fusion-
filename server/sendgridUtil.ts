// SendGrid Email Utility

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      console.error("❌ SendGrid API key not configured (SENDGRID_API_KEY)");
      return false;
    }

    console.log(`📧 Sending email to ${to} with subject: ${subject}`);
    
    // Dynamic import for ES module compatibility
    const sgMailModule = await import('@sendgrid/mail');
    const sgMail = sgMailModule.default;
    
    sgMail.setApiKey(apiKey);

    const msg = {
      to,
      from: 'noreply@gridguardian.ai',
      subject,
      html,
    };

    const result = await sgMail.send(msg);
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
