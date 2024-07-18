import MongoAction from "./src/database/mongodb/connection";
import express, { Application } from "express";
import BaseRouter from "./src/routes"
import path from "path";
import cors from "cors";
const PORT = 8080; //? Vale a pena colocar em uma enviroment?

export class App {
  database = new MongoAction(); //! Qual nome poderia ser melhor pra essa classe?
  express: Application;

  constructor() {
    this.express = express();
    this.database.connect();
    this.routes();
    this.middleware();
    this.listen();
  }

  private middleware():void {
    this.express.use(express.json());
    this.express.use(cors({
      credentials: true
    }));
    this.express.use("/temp", express.static(path.join(__dirname, "temp"))); //! Vou usar?

  }

  private session(){
    
  }

  private routes(): void {
    this.express.use("/api", BaseRouter) 
  }

  private listen(){ 
    this.express.listen(PORT, ()=>{
      console.log(`App listening on port ${PORT}`)
    })
  }
}
