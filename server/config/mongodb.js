import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`);
        mongoose.connection.on('connected', () => console.log("Database CONNECTED"));
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); 
    }
};


export default connectDB;