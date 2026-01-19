"use server";

import { apiInstance } from "@/shared/lib/brevo";

interface SendOrderEmailParams {
  orderId: string;
  firstName: string;
  email: string;
  htmlContent: string;
}

export async function sendOrderEmail(params: SendOrderEmailParams) {
  const { orderId, firstName, email, htmlContent } = params;
  const brevoSender = process.env.BREVO_SENDER_EMAIL;
  const brevoSenderName = process.env.BREVO_SENDER_NAME || "Next Pizza";
  try {
    if (!brevoSender) {
      throw new Error("BREVO_SENDER is not defined in environment variables");
    }
    await apiInstance.sendTransacEmail({
      sender: {
        email: brevoSender,
        name: brevoSenderName,
      },
      to: [{ email, name: firstName }],
      subject: `Please pay for order №${orderId}`,
      htmlContent,
    });

    console.log(`Email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
}
