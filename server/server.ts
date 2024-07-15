// import ClientController from "./src/architecture/old_structure/controllers/ClientController/ClientController";
import UserController from "./src/architecture/old_structure/controllers/UserController/UserController";
import "reflect-metadata";
import { Server } from "socket.io";
import { createServer } from "http";
const server = createServer();
import cors from "cors";
import express from "express";
import path from "path";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/temp", express.static(path.join(__dirname, "temp")));


const io = new Server(server);
const multer = require("multer");
const port = 8080;

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, path.join(__dirname, "temp"));
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const log = (message: string)=>{
  // TODO - Implementar classe para lidar com logs de erros
  console.log(message)
}

app.get("/", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/get_all_clients", (req: any, res: any) => {
  // ClientController.getAllClients(req, res).then((ret) => {
  //   res.send(ret);
  // });
});

app.get("/edit_some_client", (req: any, res: any) => {
  // ClientController.editSomeClient(req, res).then((ret) => {
  //   res.send(ret);
  // });
});

app.post("/create_user", (req, res) => {
  const body = req.body;
  const data = body.data;
  UserController.createUser(body.email, data).then((ret) => {
    res.send(ret);
  });
});

app.get("/login", (req, res) => {
  const body: any = req.query;

  UserController.login({ email: body.email, password: body.password })
    .then((ret) => {
      res.send({ auth: true });
    })
    .catch((err) => {
      res.send({ auth: false });
    });
});

// app.post("/create_new_course", (req, res) => {
//   const body: any = req.body;
//   const courseController = new CourseController({}); //TODO - melhorar isso

//   courseController.createCourse(body).then((ret) => {
//     res.status(200).send(ret);
//   }).catch(err=>{
//     log("creating course error") 
//     res.status(400).send({error:true})
//   })
// }); 

app.get("/list_all_course", (req, res) => {
  // const query: any = req.query
  // CourseController.listAllCourseByUser({ email: query.email }).then(ret => {
  //   res.send({ list: ret })
  // }).catch(err => {
  //   res.send({ err })
  // })
});

app.get("/get_course_by_id", (req, res) => {
  // const query: any = req.query
  // CourseController.listCourseById({ id: query._id }).then(ret => {
  //   res.send({ list: ret })
  // }).catch(err => {
  //   res.send({ err })
  // })
});

app.post("/upload", upload.single("file"), (req: any, res: any) => {
  // const body = req.body;
  // CourseController.saveNewVideo(body).then(ret=>{
  //   res.send(ret)
  // }).catch(err=>{
  //   res.send({err})
  // })

  res.status(200).send("Arquivo recebido com sucesso!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
