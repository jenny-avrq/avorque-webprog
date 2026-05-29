const mongoose = require('mongoose');

const connectDB = async () => {
    // Connect MongoDB at default port 27017
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is missing in environment variables");
            return;
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);

        if (process.env.NODE_ENV !== "production") {
            process.exit(1);
        }
    }
};

module.exports = connectDB;