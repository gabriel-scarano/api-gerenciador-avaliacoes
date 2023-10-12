import app from "./server";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT} 🚀`);
});