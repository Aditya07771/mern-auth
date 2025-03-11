import express from 'express';
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";  
import connectDB from './config/mongodb.js';
import authRouter from "./routes/authRoutes.js"
import userRouter from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 9000;
connectDB();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']; // Only allow this origin

app.use(express.json()); // All the request will pass through JSON
app.use(cookieParser()); 

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

 // We can send cookies from express app 

// API ENDPOINTS
app.get('/', (req, res)=> res.send("API working   "));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
