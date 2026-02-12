import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsapp = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886";

// Initialize only if keys exist
const client = (accountSid && authToken) ? twilio(accountSid, authToken) : null;

export async function sendWhatsApp(to, body) {
    if (!client) {
        console.warn("Twilio client not initialized (missing keys). Skipping WhatsApp message.");
        return { success: false, error: "Missing configuration" };
    }

    try {
        // Ensure 'to' number has whatsapp prefix
        const toWhatsapp = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

        const message = await client.messages.create({
            body: body,
            from: fromWhatsapp,
            to: toWhatsapp,
        });


        return { success: true, sid: message.sid };
    } catch (error) {
        console.error("Twilio Send Error Details:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        return {
            success: false,
            error: error.message,
            code: error.code,
            moreInfo: error.moreInfo
        };
    }
}
