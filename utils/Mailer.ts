// Packages Imports
import Email from "email-templates";
import nodemailer from "nodemailer";

// Local imports
import messages from "../config/messages";

// defined the transporter object
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.email,
        pass: process.env.password,
    },
});

// initialize mailer instance
const Mailer = new Email({
    transport: transporter,
    preview: false,
    send: true,
});

// function to send email to user using OTP template
export async function SendOTPEmail({ to = "", subject = "", otp = "" }) {
    try {
        const response = await Mailer.send({
            message: {
                to: to,
                from: `2FA <${process.env.email}>`,
                subject: subject,
                text: `OTP for ${subject} is ${otp}`,
            },
        });

        return { response: "Email Sent Successfully", ok: true, data: response };
    } catch (error) {
        return { response: messages.serverError, ok: false };
    }
} 