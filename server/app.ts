import MongoAction from "./src/database/mongodb/connection";
import express, { Application } from "express";
import path from "path";
import cors from "cors";

class App {
  database = new MongoAction();
  express: Application;

  constructor() {
    this.database.connect();
    this.express = express();
    this.middleware();
  }

  private middleware() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use("/temp", express.static(path.join(__dirname, "temp")));
  }

  private routes(): void {
    // this.express.use("/api", BaseRouter)
  }

}
