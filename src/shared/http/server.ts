import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import AsyncErrors from './middlewares/AsyncErrors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(AsyncErrors);

export default app;