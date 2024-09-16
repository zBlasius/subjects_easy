import MongoAction from "./src/database/mongodb/connection";
import express, { Application } from "express";
import session from "express-session";
import BaseRouter from "./src/routes"
import path from "path";
import cors from "cors";
import { ObjectId } from 'mongodb';
const PORT = 8080; //? Vale a pena colocar em uma enviroment? Sim

declare module "express-session" {
  interface SessionData {
    user: {
      userId: string | ObjectId;
      fullName: string;
      email: string;
      password:string;
      type: string
    }; 
  }
}

export class App {
  database = new MongoAction();
  express: Application;

  constructor() {
    this.express = express();
    this.database.connect(); 
    this.session();
    this.middleware(); 
    this.routes();
    this.listen();
  }

  private session(){
    this.express.use(
      session({
        secret: "mySecretKey",
        resave: true,
        saveUninitialized: true,
        cookie: {secure: true}
      })
    )
  }

  private middleware():void {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(cors({
      credentials: true 
    })); 
    this.express.use("/temp", express.static(path.join(__dirname, "temp"))); //! Vou usar?
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
