import loginRoutes from "@modules/Usuarios/routes/LoginRoutes";
import usuarioRoutes from "@modules/Usuarios/routes/UsuarioRoutes";
import { Request, Response, Router } from "express";

const routes = Router();

routes.use('/login', loginRoutes);
routes.use('/usuario', usuarioRoutes);

export default routes;