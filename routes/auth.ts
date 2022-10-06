// package and other modules 
import express from "express";

// controllers imports
import { login, loginEmailVerify, register, sendEmailVerifyOtp } from "../controllers/users";

// validators imports     
import { LoginOTPValidate, LoginValidate, RegisterOTPValidate, RegisterValidate } from "../middlewares/AuthValidators";

// Initialize router
const router = express.Router();

// Send Login OTP Route
router.post("/send-login-verify-otp", LoginOTPValidate, loginEmailVerify);

// Login Route
router.post("/login", LoginValidate, login);

// Send Email Verify OTP
router.post("/send-email-verify-otp", RegisterOTPValidate, sendEmailVerifyOtp);

// Register Route
router.post("/register", RegisterValidate, register);

// Exports
const AuthRoutes = router;

// export router
export default AuthRoutes;