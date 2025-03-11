import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/EmailTemplate.js";


export const register= async (req, res) =>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.json({success: false, message: "Missing Details"})
    }
     try {
        
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.json({success: false, message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10) // encrpting the password form bcrypt 

        const user = new userModel({name, email, password: hashedPassword}); // from using model it saved in mongodb
        await user.save(); // its save in mongodb database

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'}); // jwt ek box hai uske kuch info dalna hai mtlab payload dalna hai aur jwtSecret key matlab seal packing ke liya usko koi khol na paye

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 Days of expiration time
        })

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Auth",
            text: `Welcom to Auth website, Your account has been created with email id: ${email}`
        }
        
        await transporter.sendMail(mailOption);

        return res.json({success:true});



     } catch (error) {
        return res.json({success:false, message: error.message})
        
     }

}

export const login = async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success:false, message: "Email and password are required"})
    }

    try {
        const user = await userModel.findOne({email});

        if(!email){
            return res.json({success:false, message:"Invalid email"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
           return  res.json({success:false, message:"Invalid password"})
        }
        

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'}); // jwt ek box hai uske kuch info dalna hai mtlab payload dalna hai aur jwtSecret key matlab seal packing ke liya usko koi khol na paye

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 Days of expiration time
        })
        

        return res.json({success:true});

    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}


export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Same as login
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            expires: new Date(0) // Expire the cookie immediately
        });

        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



export const sendVerifyOtp =async (req, res)=>{
    try {
        const {userId} = req.body

        const user = await userModel.findById(userId)

        if(user.isAccountVerified){
            return res.json({success:false, message:" Account Already verified"})
        }

        const otp = String(Math.floor(100000 + Math.random()*900000)); // it's six digit random number

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)

        };

        await transporter.sendMail(mailOption);

        return res.json({sucess:true, message:"Verification OTP Send on Email"});



    } catch (error) {
        return res.json({sucess:false, message:error.message})
    }
}


export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    // First, ensure that both userId and otp are provided
    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        // Fetch user by userId
        const user = await userModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if the OTP matches
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        // Check if OTP is expired
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP is Expired" });
        }

        // Mark the account as verified
        user.isAccountVerified = true;
        user.verifyOtp = '';  // Clear the OTP field
        user.verifyOtpExpireAt = 0;  // Reset OTP expiry time

        await user.save();

        return res.json({ success: true, message: "Email Verified Successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Check if user is authenticated
export const isAuthenticated = async (req, res)=>{
    try {

        return res.json({sucess:true})
        
    } catch (error) {
        return res.json({success:false, message:error.message});
    }

};

//Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" }); // Fixed 're.json'
        }

        // Generate a 6-digit random OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

        await user.save(); // Save resetOtp and resetOtpExpiredAt in the database

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };

        try {
            await transporter.sendMail(mailOption);
        } catch (error) {
            return res.json({ success: false, message: "Failed to send OTP email" });
        }

        return res.json({ success: true, message: "OTP sent to your email" }); // Fixed 'sucess:true'
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


// Reset User Password
export const resetPassword = async (req, res)=>{
    const {email, otp, newPassword} = req.body

    if(!email || !otp || !newPassword){
        return res.json({success:false, message:"Email, OTP, and new password is required"})
    }
    try {

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({success:false, message:"Invalid OTP"})
        }
        
        if (user.resetOtpExpiredAt > Date.now()) {
            return res.json(({success:false, message:"OTP Expired"}))
        }

        const hashedPassword= await bcrypt.hash(newPassword, 10);

        user.password= hashedPassword;

        user.resetOtp="";
        user.resetOtpExpiredAt="";
        
        await user.save();

        return res.json({success:true, message:"Password has been reset successfully"});

    } catch (error) {
        return res.json({success:false, message:error.message})
    }


}




