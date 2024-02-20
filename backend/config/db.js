import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if (process.env.NODE_ENV === "development") {
            console.log(
                `MongoDB connected: ${connect.connection.host}`.cyan.underline,
            );
        }
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

export default connectDB;
