import { Request, Response } from 'express';
import * as service from '../services/UsuarioService';

export default class UsuarioController {
    public async create(req: Request, res: Response): Promise<Response> {
        const payload = req.body;

        const result = await service.create(payload);
        return res.status(201).send(result);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const payload = req.body;

        const result = await service.update(payload);
        return res.status(200).send(result);
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        const result = await service.getById(id);
        return res.status(200).send(result);
    }

    public async deleteById(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        await service.deleteById(id);
        return res.status(200).send({ message: 'Usuário deletado com sucesso.' });
    }

    public async updatePassword(req: Request, res: Response): Promise<Response> {
        const { id, senha, confirmar_senha } = req.body;

        const result = await service.updatePassword(id, senha, confirmar_senha);
        return res.status(200).send(result);
    }
}