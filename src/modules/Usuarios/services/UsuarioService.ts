import Usuario from "../entities/Usuario";
import * as usuarioDal from '../dal/UsuarioDal';
import Senha from "@shared/http/util/Senha";
import AppError from "@shared/errors/AppError";

export const create = async (payload: Usuario): Promise<Usuario> => {
    // faz o hash na senha
    payload.senha = await Senha.hashSenha(payload.senha);

    // faz o email ficar todo em minúsculo para a validação se ele já existe
    payload.email = payload.email.toLowerCase();

    return usuarioDal.create(payload);
};

export const update = async (payload: Usuario): Promise<Usuario> => {
    return usuarioDal.update(payload);
};

export const getById = async (id: string): Promise<Usuario> => {
    return usuarioDal.getById(id);
};

export const deleteById = async (id: string): Promise<boolean> => {
    return usuarioDal.deleteById(id);
};

export const updatePassword = async (id: string, senha: string, confirmar_senha: string) => {
    const usuario = await getById(id);
    
    if (senha != confirmar_senha) {
        throw new AppError('As senhas informadas não são iguais.', 400);
    }

    usuario.senha = await Senha.hashSenha(senha);

    return usuarioDal.update(usuario);
};