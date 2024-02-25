import ClientController from "./controllers/ClientController"
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import "./database/connection"
import cors from 'cors';
import express from 'express'
const app = express()
app.use(express.json());
app.use(cors());
const port = 8080

app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})

app.get('/get_all_clients', (req: any, res: any) => {
  ClientController.getAllClients(req, res).then(ret => {
    res.send(ret)
  })
})

app.get('/edit_some_client', (req: any, res: any) => {
  ClientController.editSomeClient(req, res).then(ret => {
    res.send(ret)
  })
})

app.post("/create_user", (req, res) => {
  const body = req.body;
  const data = body.data
  UserController.createUser(body.email, data).then(ret => {
    res.send(ret)
  })
})

app.get("/login", (req, res) => {
  const body: any = req.query

  UserController.login({ email: body.email, password: body.password }).then(ret => {
    res.send({ auth: true })
  }).catch(err => {
    res.send({ auth: false })
  })
})

app.post("/create_new_course", (req, res) => {
  const body:any = req.body.data;
  console.log('body', body)
  const user = { email: "blasiusgustavo19@gmail.com" }
  CourseController.createCourse(user, body).then(ret => {
    res.send({ ret })
  }).catch(err => {
    res.send({ err })
  })
})

app.get("/list_all_course", (req, res) => {
  const query: any = req.query

  CourseController.listAllCourseByUser({ email: query.email }).then(ret => {
    res.send({ list: ret })
  }).catch(err => {
    res.send({ err })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})