import bcrypt from 'bcryptjs';

export default class Senha {
    static async hashSenha (senha: string): Promise<string> {
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedSenha = await bcrypt.hash(senha, salt);

        return hashedSenha;
    }

    static async compararSenhas (senha: string, hashedSenha: string): Promise<boolean> {
        const response = bcrypt.compare(senha, hashedSenha);
        return response;
    }
}