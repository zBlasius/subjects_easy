import Database from "../database/mongodb/database";
const db = new Database({
    name:"Gustavo",
    email:"gustavo.blasius@gmail.com"
})

const Client = {
    list: async () => {
      try {
        const result = await db.list("Client");
        return result;
      } catch (error) {
        throw error;
      }
    },
  
    create: async () => {
      try {
        const result = await db.create("Client");
        return result;
      } catch (error) {
        throw error;
      }
    },
  
    edit: async (clientId: number, updatedData: object) => {
      try {
        const result = await db.edit("Client", clientId, updatedData);
        return result;
      } catch (error) {
        throw error;
      }
    },
  
    delete: async (clientId: number) => {
      try {
        const result = await db.delete("Client", clientId);
        return result;
      } catch (error) {
        throw error;
      }
    }
  };
  
  export default Client;