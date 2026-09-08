import jwt from "jsonwebtoken";
import { User } from "../model/authmodel.js";

export const authMiddleware = async (req, res, next) => {
    try {
        // Token header se lena
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "Authorization token is required"
            });
        }

        // Bearer TOKEN
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Invalid authorization format"
            });
        }

        // Token verify
        const decoded = jwt.verify(
            token,
            process.env.JSON_WEB_TOKEN
        );

        // User database se find
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // User ko request ke andar store karna
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token"
        });
    }
};