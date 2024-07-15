import "reflect-metadata";
import {App} from "./app"
// import ClientController from "./src/architecture/old_structure/controllers/ClientController/ClientController";
// import UserController from "./src/architecture/old_structure/controllers/UserController/UserController";

async function main(){
  new App();
}

main();

// app.post("/create_user", (req, res) => {
//   const body = req.body;
//   const data = body.data;
//   UserController.createUser(body.email, data).then((ret) => {
//     res.send(ret);
//   });
// });

// app.get("/login", (req, res) => {
//   const body: any = req.query;

//   UserController.login({ email: body.email, password: body.password })
//     .then((ret) => {
//       res.send({ auth: true });
//     })
//     .catch((err) => {
//       res.send({ auth: false });
//     });
// });
