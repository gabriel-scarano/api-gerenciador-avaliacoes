import { Request, Response, Router } from "express";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.status(200).send({ mensagem: 'Olá mundo' });
});