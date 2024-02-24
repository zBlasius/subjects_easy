import ClientModel from "../models/ClientModel"

const ClientController = {
    getAllClients: async (req:any, res:any)=>{
        try {
            const clients = await ClientModel.list()
            return clients
        } catch (error) {
            throw error;
        }
    },
    editSomeClient: async (req:any, res:any) =>{
        try {
            const updatedClient = await ClientModel.edit(123, {})
            return updatedClient
        } catch (error) {
            throw error;
        }
    }
}

export default ClientController