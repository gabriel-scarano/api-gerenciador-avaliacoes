export default class Usuario {
    id?: string;
    email: string;
    senha: string;
    nome: string;
    data_nascimento: Date;
    genero: string | null;
    createdAt?: Date;
    updatedAt?: Date;

    private constructor (usuario: Usuario) {
        this.id = usuario.id;
        this.email = usuario.email;
        this.senha = usuario.senha;
        this.nome = usuario.nome;
        this.data_nascimento = usuario.data_nascimento;
        this.genero = usuario.genero;
        this.createdAt = usuario.createdAt;
        this.updatedAt = usuario.updatedAt;
    }

    static create (usuario: Usuario) {
        return new Usuario(usuario);
    }
    
}