import express, { Router } from 'express'
import { Login, Register } from '../controler/authcontroler.js';
import { addFlight, delateFlight, getFlight, getSingleFlight, updateFlight } from '../controler/flightcontroler.js';
import { createBooking, getBooking } from '../controler/bookingcontroler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const routes = Router();

routes.post("/register", Register);
routes.post("/login", Login);



routes.post("/createflight", addFlight);
routes.get("/getflight", getFlight);
routes.get("/getsingleflight/:flightNumber", getSingleFlight);
routes.put("/updateflight/:id", updateFlight);
routes.delete("/deleteflight/:id", delateFlight);



routes.post("/booking",authMiddleware,  createBooking);
routes.get("/checkSeat/:flightNumber/:seatNumber", getBooking);



export default routes;