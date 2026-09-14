import { User } from "../model/authmodel.js";
import { Booking } from "../model/bookingmodel.js";
import { Flight } from "../model/flightmodel.js";


export const getDashboardStats = async (req, res) => {
    try {

        // Total Counts
        const totalFlights = await Flight.countDocuments();
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalBookings = await Booking.countDocuments();

        // Recent Bookings
        const recentBookings = await Booking.find()
            .populate("user", "name email")
            .populate("flight", "FLightNumber from to date")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,

            totalFlights,
            totalUsers,
            totalBookings,

            recentBookings
        });

    } catch (error) {

        console.error("Dashboard Stats Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics"
        });
    }
};