
export default class Exception extends Error{
    // TODO - Fazer tratativas aqui
    
    constructor(message:string){
        super(message);
        this.name = this.constructor.name;
    }
}