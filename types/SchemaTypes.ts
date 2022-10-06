// interface for OTPSchema
export interface OTPSchemaInterface {
    otp: string;
    verification_type: string;
    created_at: Date;
    email: string;
    password: string;
    name: string;
}


// interface for UsersSchema
export interface UserSchemaInterface {
    name: string;
    email: string;
    password: string;
}