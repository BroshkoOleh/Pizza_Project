import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

const brevoApiKey = process.env.BREVO_API_KEY;

if (!brevoApiKey) {
  console.error("BREVO_API_KEY is not defined in environment variables");
} else {
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);
  console.log("Brevo API key loaded successfully");
}

export { apiInstance };
