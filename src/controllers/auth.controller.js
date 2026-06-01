import {
    registerUser,
    loginUser
} from "../services/auth.service.js";

export const register = async (req, res) => {

    try {

        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "Usuario registrado correctamente",
            data: user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await loginUser(email, password);

        return res.status(200).json({
            success: true,
            data: result   // 🔥 AQUÍ ESTÁ EL FIX
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message
        });

    }
};