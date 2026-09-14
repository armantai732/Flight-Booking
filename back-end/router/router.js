import express, { Router } from 'express'
import { changePassword, GetProfile, Login, Register, UpdateProfile } from '../controler/authcontroler.js';
import { addFlight, delateFlight, getFlight, getSingleFlight, updateFlight } from '../controler/flightcontroler.js';
import { createBooking, getBooking } from '../controler/bookingcontroler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getDashboardStats } from '../controler/adminController.js';

const routes = Router();

routes.post("/register", Register);
routes.post("/login", Login);
routes.get("/profile", authMiddleware, GetProfile);
routes.put("/profile/update", authMiddleware, UpdateProfile);
routes.put("/change-password", authMiddleware,changePassword );



routes.post("/createflight", addFlight);
routes.get("/getflight", getFlight);
routes.get("/getsingleflight/:FLightNumber", getSingleFlight);
routes.put("/updateflight/:id", updateFlight);
routes.delete("/deleteflight/:id", delateFlight);



routes.post("/booking",authMiddleware,  createBooking);
routes.get("/checkSeat/:FLightNumber/:seatNumber", getBooking);


routes.get("/dashboard-stats", getDashboardStats);



export default routes;