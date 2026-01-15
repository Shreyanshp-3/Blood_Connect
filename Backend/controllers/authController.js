import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Otp from "../models/Otp.js";

// send OTP

export const sendOTP = async (req, res) => {
    const { phone } = req.body;
    if (!phone || phone.length != 10) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const otpHash = await bcrypt.hash(otp, 10);

    await Otp.deleteMany({ phone });          //remove old OTPs if any

    await Otp.create({
        phone,
        otpHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)   //5 minutes

    });
    console.log("OTP (mock sms):", otp);

    res.json({ message: "OTP sent successfully" });
};



// verify OTP

export const verifyOTP = async (req, res) => {

    const { phone, otp } = req.body;

    const record = await Otp.findOne({ phone });

    if (!record) {
        return res.status(400).json({ message: "OTP not found" });
    }

    if (record.expiresAt < new Date()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    const isValid = await bcrypt.compare(otp, record.otpHash);

    if (!isValid) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
        user = await User.create({ phone });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({
        token,
        isProfileComplete: user.isProfileComplete
    });
};

