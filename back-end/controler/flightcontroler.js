import cloudinary from "../config/cloudinary.js";
import { Flight } from "../model/flightmodel.js"

export const addFlight = async (req, res) => {
    try {

        const {
            airline,
            FLightNumber,
            Aircraft,
            from,
            to,
            departureTime,
            arrivalTime,
            Baggage,
            date,
            price,
            seatRows
        } = req.body;


        // Image check
        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Flight image is required"
            });
        }


        // Check duplicate flight
        const ExitsFlight = await Flight.findOne({ FLightNumber });

        if (ExitsFlight) {
            return res.status(400).json({
                status: false,
                message: "Flight Already Declare"
            });
        }


        // Upload image to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "flights"
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }

                }
            );

            stream.end(req.file.buffer);

        });

        // Create seats
        const seats = [];

        const seatLetter = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F"
        ];


        for (let row = 1; row <= Number(seatRows); row++) {

            for (let letter of seatLetter) {

                seats.push({
                    seatNumber: `${row}${letter}`,
                    status: "available"
                });

            }

        }


        // Create Flight
        const NewFlight = await Flight.create({

            airline,

            FLightNumber,

            Aircraft,

            image: uploadResult.secure_url,

            from,

            to,

            departureTime,

            arrivalTime,

            Baggage: Number(Baggage),

            date,

            price,

            seats

        });


        return res.status(201).json({

            status: true,

            message: "Flight Declare Successfully!",

            Flight: NewFlight

        });


    } catch (error) {

        console.error("Add Flight Error:", error);

        return res.status(500).json({

            status: false,

            message: error.message

        });

    }
};

export const getFlight = async (req, res) => {
    try {
        const ExitsFlight = await Flight.find();

        if (!ExitsFlight) {
            return res.status(404).json({
                status: false,
                message: "Flight Not Found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Flight Get Succesfully!",
            Flight: ExitsFlight
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getSingleFlight = async (req, res) => {
    try {

        const { FLightNumber } = req.params;

        const flight = await Flight.findOne({ FLightNumber });


        if (!flight) {
            return res.status(404).json({
                status: false,
                message: "Flight Not Found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Flight Get Successfully!",
            flight
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });

    }
}

export const updateFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const { airline, Aircraft, FLightNumber, image, from, to, departureTime, arrivalTime, date, price, seats } = req.body;

        const ExitsFlight = await Flight.findByIdAndUpdate(id, { airline, FLightNumber, Aircraft, image, from, to, departureTime, arrivalTime, date, price, seats }, { returnDocument: "after", });

        if (!ExitsFlight) {
            return res.status(404).json({
                status: false,
                message: "Flight Not Found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Flight Update Succesfully!",
            Flight: ExitsFlight
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const delateFlight = async (req, res) => {
    try {
        const { id } = req.params;

        const ExitsFlight = await Flight.findByIdAndDelete(id);

        if (!ExitsFlight) {
            return res.status(404).json({
                status: false,
                message: "Flight Not Found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Flight Remove Succesfully!",
            Flight: ExitsFlight
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}





