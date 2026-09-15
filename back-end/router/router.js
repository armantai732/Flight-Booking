import express, { Router } from 'express'
import { changePassword, GetProfile, Login, Register, UpdateProfile } from '../controler/authcontroler.js';
import { addFlight, delateFlight, getFlight, getSingleFlight, updateFlight } from '../controler/flightcontroler.js';
import { approveBooking, createBooking, getAllBookings, getMyBookings } from '../controler/bookingcontroler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getDashboardStats } from '../controler/adminController.js';
import upload from '../middleware/uploadMiddleware.js';

const routes = Router();

routes.post("/register", Register);
routes.post("/login", Login);
routes.get("/profile", authMiddleware, GetProfile);
routes.put("/profile/update", authMiddleware, UpdateProfile);
routes.put("/change-password", authMiddleware,changePassword );



routes.post("/createflight", upload.single("image"), addFlight);
routes.get("/getflight", getFlight);
routes.get("/getsingleflight/:FLightNumber", getSingleFlight);
routes.put("/updateflight/:id", updateFlight);
routes.delete("/deleteflight/:id", delateFlight);



routes.post("/booking",authMiddleware,  createBooking);
routes.get("/my-bookings", authMiddleware, getMyBookings);
routes.get("/all-bookings", getAllBookings);
routes.put("/approve-booking/:id", approveBooking);

routes.get("/dashboard-stats", getDashboardStats);



export default routes;