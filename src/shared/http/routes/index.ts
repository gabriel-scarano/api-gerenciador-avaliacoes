import usuarioRoutes from "@modules/Usuarios/routes/UsuarioRoutes";
import { Request, Response, Router } from "express";

const routes = Router();

routes.use('/usuario', usuarioRoutes);

export default routes;