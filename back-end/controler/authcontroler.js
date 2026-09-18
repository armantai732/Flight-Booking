import express, { json } from 'express'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import twilio from 'twilio'
import { User } from '../model/authmodel.js'

const formatMobileNumber = (mobile) => {
    if (!mobile) return '';
    let cleaned = mobile.toString().trim();
    if (!cleaned.startsWith('+')) {
        if (cleaned.length === 10) {
            cleaned = '+91' + cleaned;
        } else {
            cleaned = '+' + cleaned;
        }
    }
    return cleaned;
};

export const SendOTP = async (req, res) => {
    try {
        const { mobile, email } = req.body;

        if (!mobile) {
            return res.status(400).json({
                status: false,
                message: "Mobile number is required!"
            });
        }

        if (email) {
            const ExitsUser = await User.findOne({ email });
            if (ExitsUser) {
                return res.status(400).json({
                    status: false,
                    message: "User with this email is already registered!"
                });
            }
        }

        const formattedMobile = formatMobileNumber(mobile);

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

        const isTwilioConfigured = accountSid && 
            authToken && 
            serviceSid && 
            !accountSid.includes("YOUR_TWILIO") && 
            accountSid.startsWith("AC");

        if (!isTwilioConfigured) {
            console.log(`[TEST MODE] Twilio keys not configured in .env. Test OTP for ${formattedMobile} is 123456`);
            return res.status(200).json({
                status: true,
                message: "[TEST MODE] OTP sent! Use test OTP 123456 to register. (Set real Twilio keys in back-end/.env for SMS)",
                testMode: true
            });
        }

        const client = twilio(accountSid, authToken);

        const verification = await client.verify.v2.services(serviceSid)
            .verifications
            .create({ to: formattedMobile, channel: 'sms' });

        return res.status(200).json({
            status: true,
            message: `OTP sent successfully to ${formattedMobile}`,
            sid: verification.sid
        });

    } catch (error) {
        console.error("Send OTP Error:", error);

        const formattedMobile = formatMobileNumber(req.body?.mobile);

        // Twilio Error 21608: Trial account cannot send SMS to unverified numbers
        if (error.code === 21608 || error.status === 403) {
            console.log(`[TWILIO TRIAL NOTICE] Number ${formattedMobile} is unverified on Twilio Trial Account. Falling back to test OTP 123456.`);
            return res.status(200).json({
                status: true,
                message: "Twilio Trial Account Notice: Unverified mobile number. Use Test OTP: 123456 to complete registration (or verify number at twilio.com).",
                testMode: true
            });
        }

        return res.status(400).json({
            status: false,
            message: error.message || "Failed to send OTP via Twilio. Check your Twilio credentials."
        });
    }
};

export const Register = async (req, res)=>{
    try {
        const {name, email, mobile, password, otp, date, gender} = req.body;

        if (!name || !email || !mobile || !password || !otp) {
            return res.status(400).json({
                status: false,
                message: "All fields (name, email, mobile, password, OTP) are required!"
            });
        }

        const ExitsUser = await User.findOne({email});
        if(ExitsUser){
            return res.status(400).json({
                status: false,
                message: "User Already Registered!",
            });
        }

        const formattedMobile = formatMobileNumber(mobile);

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

        const isTwilioConfigured = accountSid && 
            authToken && 
            serviceSid && 
            !accountSid.includes("YOUR_TWILIO") && 
            accountSid.startsWith("AC");

        if (!isTwilioConfigured) {
            if (otp !== "123456") {
                return res.status(400).json({
                    status: false,
                    message: "Invalid OTP! In test mode, please use OTP: 123456"
                });
            }
        } else {
            try {
                const client = twilio(accountSid, authToken);

                const verificationCheck = await client.verify.v2.services(serviceSid)
                    .verificationChecks
                    .create({ to: formattedMobile, code: otp });

                if (verificationCheck.status !== 'approved') {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid OTP! Please check and try again."
                    });
                }
            } catch (err) {
                console.error("Twilio Verification Check Error:", err);

                // If trial account unverified number error (21608/20404/404/403) and user used 123456, allow registration
                if ((err.code === 21608 || err.code === 20404 || err.status === 403 || err.status === 404) && otp === "123456") {
                    console.log(`[TWILIO TRIAL NOTICE] Verification check bypassed for test OTP 123456 on unverified number.`);
                } else {
                    return res.status(400).json({
                        status: false,
                        message: err.message || "Twilio OTP verification failed"
                    });
                }
            }
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            mobile: formattedMobile,
            password: hashPassword,
            date: date || null,
            gender: gender || null
        });

        return res.status(201).json({
            status: true,
            message: "Register Succesfully!",
            data: newUser
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(400).json({
            status: false,
            message: error.message || "Registration failed"
        });
    }
}

export const Login = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const ExitsUser = await User.findOne({email});

        if(!ExitsUser){
            return res.status(404).json({
                status: false,
                message: "Register First"
            })
        }

        const isMatch = await bcrypt.compare(password, ExitsUser.password);

        if(!isMatch){
            return res.status(400).json({
                status: false,
                message: "Password is Not match",
            })
        }

        const token = jsonwebtoken.sign({id: ExitsUser._id, email:ExitsUser.email}, process.env.JSON_WEB_TOKEN, {expiresIn: "7d"});

        

        return res.status(200).json({
            status : true,
            message: "Login Succesfully!",
            data: token,
            role: ExitsUser.role,
        })

    } catch (error) {
        console.log(error.message)
    }
}


export const GetProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Profile fetched successfully",
            data: user
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }
};


export const UpdateProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        const {
            name,
            mobile,
            date,
            gender
        } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // Update only provided fields
        if (name !== undefined) {
            user.name = name;
        }

        if (mobile !== undefined) {
            user.mobile = mobile;
        }

        if (date !== undefined) {
            user.date = date || null;
        }

        if (gender !== undefined) {
            user.gender = gender || null;
        }

        await user.save();

        return res.status(200).json({
            status: true,
            message: "Profile updated successfully",
            data: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                date: user.date,
                gender: user.gender,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
};




export const changePassword = async (req, res) => {
    try {

        const { password, newPassword, confirmPassword } = req.body;


        if (!password || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match"
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            status: true,
            message: "Password changed successfully"
        });

    } catch (error) {

        console.error("Change Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const SocialLogin = async (req, res) => {
    try {
        const { name, email, uid } = req.body;

        if (!email) {
            return res.status(400).json({
                status: false,
                message: "Email is required for social login"
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            const randomPassword = await bcrypt.hash(uid || Math.random().toString(), 10);
            user = await User.create({
                name: name || "User",
                email: email,
                mobile: "Not Provided",
                password: randomPassword,
                role: "user"
            });
        }

        const token = jsonwebtoken.sign(
            { id: user._id, email: user.email },
            process.env.JSON_WEB_TOKEN,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            status: true,
            message: "Login Successfully!",
            data: token,
            role: user.role
        });

    } catch (error) {
        console.error("Social Login Error:", error);
        return res.status(500).json({
            status: false,
            message: error.message || "Social Login Failed"
        });
    }
};