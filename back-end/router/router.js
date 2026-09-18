import { Router } from 'express';
import { changePassword, GetProfile, Login, Register, SendOTP, SocialLogin, UpdateProfile } from '../controler/authcontroler.js';
import { addFlight, delateFlight, getFlight, getSingleFlight, updateFlight } from '../controler/flightcontroler.js';
import { approveBooking, createBooking, getAllBookings, getMyBookings } from '../controler/bookingcontroler.js';
import { createRazorpayOrder, verifyRazorpayPayment } from '../controler/paymentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getDashboardStats, getuser } from '../controler/adminController.js';
import upload from '../middleware/uploadMiddleware.js';
import { createContact } from '../controler/contactcontroler.js';

const routes = Router();

routes.post("/send-otp", SendOTP);
routes.post("/register", Register);
routes.post("/login", Login);
routes.post("/social-login", SocialLogin);
routes.get("/profile", authMiddleware, GetProfile);
routes.put("/profile/update", authMiddleware, UpdateProfile);
routes.put("/change-password", authMiddleware,changePassword );
routes.post("/contact", createContact);


routes.post("/createflight", upload.single("image"), addFlight);
routes.get("/getflight", getFlight);
routes.get("/getsingleflight/:FLightNumber", getSingleFlight);
routes.put("/updateflight/:id", updateFlight);
routes.delete("/deleteflight/:id", delateFlight);



routes.post("/booking",authMiddleware,  createBooking);
routes.post("/create-razorpay-order", authMiddleware, createRazorpayOrder);
routes.post("/verify-razorpay-payment", authMiddleware, verifyRazorpayPayment);
routes.get("/my-bookings", authMiddleware, getMyBookings);
routes.get("/all-bookings", getAllBookings);
routes.put("/approve-booking/:id", approveBooking);
routes.get("/getuser", getuser);
routes.get("/dashboard-stats", getDashboardStats);



export default routes;