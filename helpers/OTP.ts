// Packages imports
import bcrypt from "bcrypt";

// Local Imports 
import OTP from "../models/otp";

// Create an OTP instance
export async function CreateOTP(verification_type: string, email: string, password: string, name: string) {
    try {
        // Genereate OTP
        const OTP_Random = Math.floor(100000 + Math.random() * 900000)

        // Create new OTP instance
        const newOtp = new OTP({
            verification_type,
            otp: OTP_Random.toString(),
            email: email,
            password: password,
            name: name
        });

        // Hash the otp
        const salt = await bcrypt.genSalt(10);
        newOtp.otp = await bcrypt.hash(newOtp.otp, salt);

        const hashedPassword = await bcrypt.hash(newOtp.password, salt);
        newOtp.password = hashedPassword;

        // Save the OTP instance
        await newOtp.save();

        return { otp_id: newOtp._id, otp: OTP_Random, ok: true };
    } catch (error) {
        return { ok: false };
    }
}