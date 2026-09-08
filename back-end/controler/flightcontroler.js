import { Flight } from "../model/flightmodel.js"


export const addFlight = async (req, res)=>{
    try {
        const {airline, flightNumber, from, to, departureTime, arrivalTime, date, price} = req.body
        const seats = [];
        const ExitsFlight = await Flight.findOne({flightNumber});

        if(ExitsFlight){
            return res.status(400).json({
                status: false,
                message: "Flight Already Declare"
            })
        };

        const seatLetter = ["A", "B", "C", "D"];

        for(let row = 1; row<=30; row++){
            for(let letter of seatLetter){
                seats.push({
                    seatNumber : `${row}${letter}`,
                    status : "available",
                })
            }
        }

        const NewFlight = await Flight.create({airline, flightNumber, from, to, departureTime, arrivalTime, date, price, seats});

        return res.status(201).json({
            status: true,
            message: "Flight Declare Succesfully!",
            Flight: NewFlight
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getFlight = async (req, res)=>{
    try {
        const ExitsFlight = await Flight.find();

        if(!ExitsFlight){
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
        
        const { flightNumber } = req.params;

        const flight = await Flight.findOne({flightNumber});


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

export const updateFlight = async (req, res)=>{
    try {
        const {id} = req.params;
        const {airline, from, to, departureTime, arrivalTime, date, price, seats} = req.body;

        const ExitsFlight = await Flight.findByIdAndUpdate(id, {airline, from, to, departureTime, arrivalTime, date, price, seats}, {returnDocument: "after",});

        if(!ExitsFlight){
            return res.status(404).json({
                status: false,
                message: "Flight Not Found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Flight Update Succesfully!",
            Flight : ExitsFlight
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const delateFlight = async (req, res)=>{
    try {
        const {id} = req.params;

        const ExitsFlight = await Flight.findByIdAndDelete(id);

        if(!ExitsFlight){
            return res.status(404).json({
                status: false,
                message: "Flight Not Found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Flight Remove Succesfully!",
            Flight : ExitsFlight
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}