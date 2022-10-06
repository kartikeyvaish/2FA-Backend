// Packages imports
import mongoose from "mongoose";

// Local imports   
import { OTPSchemaInterface } from "../types/SchemaTypes";

// time limit for an OTP
const OTP_TIME_LIMIT = 600; // 10 minutes

// OTP Schema Schema
const OTPSchema = new mongoose.Schema<OTPSchemaInterface>({
    verification_type: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
        expires: OTP_TIME_LIMIT,
    },
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

// OTP Model
const OTP = mongoose.model<OTPSchemaInterface>("otp", OTPSchema);

// Exporting the OTP model
export default OTP; 