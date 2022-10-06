// Packages imports
import mongoose from "mongoose";

// Local imports  
import { UserSchemaInterface } from "../types/SchemaTypes";

// create UserSchema
const UsersSchema = new mongoose.Schema<UserSchemaInterface>({
    name: {
        type: String,
        required: true,
    },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
    },
});

// Create Model
const users = mongoose.model<UserSchemaInterface>("users", UsersSchema);

// Exports
export default users;