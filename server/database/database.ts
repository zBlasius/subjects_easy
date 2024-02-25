
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

    async list(collection: string) {
        try {
            return [
                {name:"Gustavo Blasius", age:30},
                {name:"Maria joaquina", age:20},
                {name:"Cirilo", age:12}
            ]
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };

    async create(collection: string) {
        try {
            return `create ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };

    async edit(collection: string, id: number, data: object) {
        try {
            return `edit ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };

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