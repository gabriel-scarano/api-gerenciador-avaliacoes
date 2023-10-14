import { Router } from "express";
import { celebrate, Segments } from 'celebrate';
import Joi from "joi";
import UsuarioController from "../controllers/UsuarioController";

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

usuarioRoutes.post(
    '/',
    celebrate(
        {
            [Segments.BODY]: {
                email: Joi.string().email().required(),
                senha: Joi.string().required(),
                nome: Joi.string().max(60).required(),
                data_nascimento: Joi.date().required(),
                genero: Joi.string().max(30).optional(),
            },
        },
        {
          abortEarly: false,
        }
    ),
    usuarioController.create,
);

usuarioRoutes.put(
    '/',
    celebrate(
        {
            [Segments.BODY]: {
                id: Joi.string().uuid().required(),
                nome: Joi.string().max(60).optional(),
                data_nascimento: Joi.date().optional(),
                genero: Joi.string().max(30).optional(),
            },
        },
        {
          abortEarly: false,
        }
    ),
    usuarioController.update,
);

usuarioRoutes.patch(
    '/alterarSenha',
    celebrate(
        {
            [Segments.BODY]: {
                id: Joi.string().uuid().required(),
                senha: Joi.string().required(),
                confirmar_senha: Joi.string().required(),
            },
        },
        {
          abortEarly: false,
        }
    ),
    usuarioController.updatePassword,
);

usuarioRoutes.get(
    '/:id',
    celebrate(
        {
            [Segments.PARAMS]: {
                id: Joi.string().uuid().required(),
            },
        },
        {
          abortEarly: false,
        }
    ),
    usuarioController.getById,
);

usuarioRoutes.delete(
    '/:id',
    celebrate(
        {
            [Segments.PARAMS]: {
                id: Joi.string().uuid().required(),
            },
        },
        {
          abortEarly: false,
        }
    ),
    usuarioController.deleteById,
);

export default usuarioRoutes;