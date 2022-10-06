// Importing Packages
import express from "express";
import mongoose from "mongoose";
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config()

// Importing files 
import db_configs from "./config/db_configs";
import messages from "./config/messages";
import production from "./config/production";

// Importing routes  
import AuthRoutes from "./routes/auth";

// Connect to MongoDB
mongoose
    .connect(db_configs.db_url)
    .then(() => console.log(`Connected to ${process.env.DB_Name} Mongo DB...`))
    .catch((error) => console.error(messages.serverError, error));

// Express app initialization
const app = express();

// Configuring Express to use static files
app.use(express.static(path.join(__dirname, "")));

// Configuring Express app for production
production(app);

// Add Routes
app.use(process.env.apiVersion + process.env.auth, AuthRoutes);

// Add a 404 error handler
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname + "/views/404.html"));
});

// App listening on port
app.listen(db_configs.Port, () =>
    console.log(`Mode = ${process.env.NODE_ENV} and Listening on ${db_configs.Port}..`)
);