// packages Imports
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// helpers
import messages from "../config/messages";

// LoginSchema to validate the request body
const LoginSchema = Joi.object({
    otp_id: Joi.string().required().messages({
        "any.required": "OTP ID is required",
        "string.empty": "OTP ID is required",
    }),
    otp: Joi.string().required().messages({
        "any.required": "OTP is required",
        "string.empty": "OTP is required",
    }),
}).options({ stripUnknown: true });

// New User email otp request
const EmailOtpSchema = Joi.object({
    email: Joi.string().required().messages({
        "any.required": "Email is required",
        "string.empty": "Email is required",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is required",
    }),
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name is required",
    }),
}).options({ stripUnknown: true });

// Login otp request
const LoginOTPSchema = Joi.object({
    email: Joi.string().required().messages({
        "any.required": "Email is required",
        "string.empty": "Email is required",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is required",
    }),
}).options({ stripUnknown: true });

// Register Schema to validate the request body
const RegisterSchema = Joi.object({
    otp_id: Joi.string().required().messages({
        "any.required": "OTP ID is required",
        "string.empty": "OTP ID is required",
    }),
    otp: Joi.string().required().messages({
        "any.required": "OTP is required",
        "string.empty": "OTP is required",
    }),
}).options({ stripUnknown: true });

// function to check the request body for Login
export const LoginValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check for fields
        const result = LoginSchema.validate(req.body);

        if (result.error)
            return res.status(400).send({
                message: result.error.details[0].message,
            });

        next();
    } catch (error) {
        return res.status(500).send({ message: messages.serverError });
    }
}

// function to check the request body for Login
export const LoginOTPValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check for fields
        const result = LoginOTPSchema.validate(req.body);

        if (result.error)
            return res.status(400).send({
                message: result.error.details[0].message,
            });

        next();
    } catch (error) {
        return res.status(500).send({ message: messages.serverError });
    }
}

// function to check the request body for Login
export const RegisterOTPValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check for fields
        const result = EmailOtpSchema.validate(req.body);

        if (result.error)
            return res.status(400).send({
                message: result.error.details[0].message,
            });

        next();
    } catch (error) {
        return res.status(500).send({ message: messages.serverError });
    }
}

// function to check the request body for Register
export const RegisterValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check for fields
        const result = RegisterSchema.validate(req.body);

        if (result.error)
            return res.status(400).send({
                message: result.error.details[0].message,
            });

        next();
    } catch (error) {
        return res.status(500).send({ message: messages.serverError });
    }
}