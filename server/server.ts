import ClientController from "./controllers/ClientController"
import "./database/connection"
import cors from 'cors';
import express from 'express'
const app = express()
app.use(express.json());
app.use(cors());
const port = 8080

app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

app.get('/get_all_clients', (req:any, res:any)=>{
    ClientController.getAllClients(req,res).then(ret=>{
        res.send(ret)
    })
})

app.get('/edit_some_client', (req:any, res:any)=>{
    ClientController.editSomeClient(req,res).then(ret=>{
        res.send(ret)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})