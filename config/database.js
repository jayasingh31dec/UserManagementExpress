const mongoose = require("mongoose");

let connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB", error);
    }
};

module.exports = connectDB;
