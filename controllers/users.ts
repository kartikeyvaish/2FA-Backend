// Pakcages Imports 
import bcrypt from 'bcrypt';
import { Request, Response } from "express";

// Models imports 
import OTP from '../models/otp';
import users from "../models/users";

// helpers and other imports
import { CreateOTP } from '../helpers/OTP';
import messages from '../config/messages';
import { SendOTPEmail } from '../utils/Mailer';

// function to send otp to email for Email verification
export async function sendEmailVerifyOtp(req: Request, res: Response) {
    try {
        // if OTP is already sent to the email
        const otpObj = await OTP.findOne({ email: req.body.email });
        if (otpObj) {
            return res.send({
                message: messages.otpSentMail,
                otp_id: otpObj._id,
            });
        }

        // Create new OTP instance
        const newOtp = await CreateOTP("Email Verification", req.body.email, req.body.password, req.body.name);
        if (!newOtp.ok) return res.status(400).send({
            message: messages.otpSendError,
            email_verified: false,
        });

        // Send Email
        const sendMail = await SendOTPEmail({
            to: req.body.email,
            subject: "Email Verification",
            otp: newOtp.otp.toString(),
        });

        // If email has been sent successfully
        if (sendMail.ok) { return res.send({ message: messages.otpSentMail, otp_id: newOtp.otp_id }); }

        return res.status(400).send({ message: messages.otpSentMail });
    } catch (error) {
        return res.status(500).send({
            message: messages.otpSentMail,
        });
    }
}

// function to register
export const register = async (req: Request, res: Response) => {
    try {
        const optInstance = await OTP.findById(req.body.otp_id);

        if (!optInstance) return res.status(400).send({
            message: messages.invalidOTP,
        });

        // Check if OTP is valid
        const isOtpValid = await bcrypt.compare(req.body.otp, optInstance.otp);

        if (!isOtpValid) return res.status(400).send({ message: messages.invalidOTP });

        // check if email is already registered
        const isEmailRegistered = await users.findOne({ email: optInstance.email });

        if (isEmailRegistered) return res.status(400).send({
            message: messages.associatedEmailAccount,
        });

        const newUser = new users({
            name: optInstance.name,
            email: optInstance.email,
            password: optInstance.password,
        });

        // Save user
        await newUser.save();

        // Delete OTP instance
        await optInstance.delete();

        // send response
        return res.status(200).send({ message: messages.accountCreated, email_verified: true, name: newUser.name, email: newUser.email });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: messages.serverError });
    }
}

// function to send otp to email while loggin in
export async function loginEmailVerify(req: Request, res: Response) {
    try {
        // check if user exists
        const user = await users.findOne({
            email: req.body.email,
        });

        if (!user) return res.status(404).send({ message: messages.accountMissing, isLoggedIn: false });

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect)
            return res.status(400).send({ message: messages.invalidCredentials, isLoggedIn: false });

        // if OTP is already sent to the email
        const otpObj = await OTP.findOne({ email: req.body.email, verification_type: "Login 2FA" });
        if (otpObj) {
            return res.send({
                message: messages.otpSentMail,
                otp_id: otpObj._id,
            });
        }

        // Create new OTP instance
        const newOtp = await CreateOTP("Login 2FA", user.email, user.password, user.name);
        if (!newOtp.ok) return res.status(400).send({
            message: messages.otpSendError,
            email_verified: false,
        });

        // Send Email
        const sendMail = await SendOTPEmail({
            to: req.body.email,
            subject: "Email Verification",
            otp: newOtp.otp.toString(),
        });

        // If email has been sent successfully
        if (sendMail.ok) {
            return res.send({
                message: messages.otpSentMail,
                otp_id: newOtp.otp_id,
            });
        }

        return res.status(400).send({
            message: messages.otpSentMail,
        });
    } catch (error) {
        return res.status(500).send({
            message: messages.serverError,
        });
    }
}

// function to login
export async function login(req: Request, res: Response) {
    try {
        // Return response
        try {
            const optInstance = await OTP.findById(req.body.otp_id);

            if (!optInstance) return res.status(400).send({
                message: messages.invalidOTP,
            });

            // Check if OTP is valid
            const isOtpValid = await bcrypt.compare(req.body.otp, optInstance.otp);

            if (!isOtpValid) return res.status(400).send({
                message: messages.invalidOTP,
            });

            const userObj = await users.findOne({ email: optInstance.email });

            // Delete OTP instance
            await optInstance.delete();

            return res.status(200).send({
                message: messages.loggedIn,
                email_verified: true, name: userObj.name, email: userObj.email
            });

        } catch (error) {
            // Error Response
            return res.status(500).send({ message: messages.loginError, isLoggedIn: false });
        }
    } catch (error) {
        // Error Response
        return res.status(500).send({
            message: messages.loginError, isLoggedIn: false
        });
    }
}