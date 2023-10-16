import { Router } from "express";
import { celebrate, Segments } from 'celebrate';
import Joi from "joi";
import UsuarioController from "../controllers/UsuarioController";

const loginRoutes = Router();
const usuarioController = new UsuarioController();

loginRoutes.post(
    '/',
    celebrate(
        {
            [Segments.BODY]: {
                email: Joi.string().email().required(),
                senha: Joi.string().required(),
            },
        },
        {
          abortEarly: false,
        }
    ),
    usuarioController.login,
);

export default loginRoutes;