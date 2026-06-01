import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import vendedorRoutes
from "./routes/vendedor.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import pagoRoutes from "./routes/pago.routes.js";
import pedidoRoutes from "./routes/pedido.routes.js";
import pedidoVendedorRoutes from "./routes/pedidoVendedor.routes.js";
import resenaRoutes from "./routes/resena.routes.js";
import incidenciaRoutes from "./routes/incidencia.routes.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/categorias", categoriaRoutes);

app.use(
    "/api/vendedor",
    vendedorRoutes
);
app.use("/api/incidencias", incidenciaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vendedor/pedidos", pedidoVendedorRoutes);
app.use("/api/pedidos", pedidoRoutes);

app.use("/api/pedido", pedidoRoutes);
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "EMAPA Marketplace API"
    });

});
app.use(
    "/api/productos",
    productoRoutes
);
app.use("/api/carrito", carritoRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api", resenaRoutes);
export default app;