import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (data) => {

    const existingUser = await prisma.usuario.findUnique({
        where: {
            email: data.email
        }
    });

    if (existingUser) {
        throw new Error("El correo ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.usuario.create({
    data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        password: hashedPassword,

        rol: data.tipo, // 🔥 FIX REAL

        estado:
            data.tipo === "VENDEDOR"
                ? "INACTIVO"
                : "ACTIVO"
    }
});
    if (data.tipo === "VENDEDOR") {

        const pendiente = await prisma.estadoSolicitud.findFirst({
            where: { nombre: "PENDIENTE" }
        });

        await prisma.solicitudVendedor.create({
    data: {
        usuarioId: user.id,
        estadoSolicitudId: pendiente.id,
        motivo: data.motivo
    }
});
    }

    return user;
};
export const loginUser = async (email, password) => {

    const user = await prisma.usuario.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    // 🚨 VALIDAR ESTADO
    if (user.estado !== "ACTIVO") {
        throw new Error("Tu cuenta está inactiva o pendiente de aprobación");
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {
        throw new Error("Credenciales incorrectas");
    }

    const token = jwt.sign(
        {
            id: user.id,
            rol: user.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user
    };
};