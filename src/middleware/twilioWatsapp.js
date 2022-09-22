import { enviroment } from '../config/config.js';
import twilio from "twilio";

const client = twilio(enviroment.ACCOUNTSID, enviroment.AUTHTOKEN_TWILIO)

const option = {
    body: "",
    from: `whatsapp:${enviroment.TWILIO_WHATSAPP_SANDBOX}`,
    to: `whatsapp:${enviroment.ADMIN_PHONE_NUMBER}`
}

export { client, option }