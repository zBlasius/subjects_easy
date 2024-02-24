
interface User {
    name: string;
    email: string;
    // Outros campos do usuário
}

class Database {
    user: User;

    constructor(user: User) {
        this.user = user
    }

    // Função para listar usuários com opções de filtro
    async list(collection: string) {
        try {
            return `list ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };

    // Função para criar um novo usuário
    async create(collection: string) {
        try {
            return `create ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };

    // Função para editar um usuário por ID
    async edit(collection: string, id: number, data: object) {
        try {
            return `edit ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };

    // Função para remover um usuário por ID
    async delete(collection: string, id: number) {
        try {
            return `delete ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };
}

export default Database