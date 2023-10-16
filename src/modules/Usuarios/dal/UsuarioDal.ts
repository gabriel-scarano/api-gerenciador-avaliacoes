import Usuario from "../entities/Usuario";
import prisma from "@config/db/Prisma";
import AppError from "@shared/errors/AppError";

export const create = async (payload: Usuario): Promise<Usuario> => {
    const usuarioExists = await prisma.usuario.findFirst({
        where: {
            email: payload.email,
        },
    });

    if (usuarioExists) {
        throw new AppError('E-mail já utilizado.', 409);
    }

    const usuario = await prisma.usuario.create({
        data: payload,
    });

    return usuario;
};

export const update = async (payload: Usuario): Promise<Usuario> => {
    const usuario = await prisma.usuario.findFirst({
        where: {
            id: payload.id,
        },
    });

    if (!usuario) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    const updatedUsuario = await prisma.usuario.update({
        where: {
            id: payload.id,
        },
        data: payload,
    });

    return updatedUsuario;
};

export const getById = async (id: string): Promise<Usuario> => {
    const usuario = await prisma.usuario.findFirst({
        where: {
            id,
        },
    });

    if (!usuario) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    return usuario;
};

export const getByEmail = async (email: string): Promise<Usuario> => {
    const usuario = await prisma.usuario.findFirst({
        where: {
            email,
        },
    });

    if (!usuario) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    return usuario;
};

export const deleteById = async (id: string): Promise<boolean> => {
    const usuario = await prisma.usuario.findFirst({
        where: {
            id,
        },
    });

    if (!usuario) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    const deletedUsuario = await prisma.usuario.delete({
        where: {
            id,
        },
    });

    return !!deletedUsuario;
};