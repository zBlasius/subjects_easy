import MongoAction from "./src/database/mongodb/connection";
import express, { Application } from "express";
import session from "express-session";
import BaseRouter from "./src/routes";
import path from "path";
import cors from "cors";
import { ObjectId } from "mongodb";
import 'dotenv/config'
const PORT = 8080;

declare module "express-session" {
  interface SessionData {
    user: {
      userId: string | ObjectId;
      fullName: string;
      email: string;
      password: string;
      type: string;
    };
  }
}

export class App {
  database = new MongoAction();
  express: Application;

  constructor() {
    this.express = express();
    this.logMemoryUsage("database.connect() - Point A");
    this.database.connect();
    this.logMemoryUsage("database.connect() - Point B");
    this.session();
    this.middleware();
    this.routes();
    this.listen();
  }

  private logMemoryUsage(location: string) {
    const memoryUsage = process.memoryUsage();
    console.log(`[${location}] Memory Usage:`);
    console.log(`  RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  External: ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`);
  }

  private session() {
    this.logMemoryUsage("session point A")
    this.express.use(
      session({
        secret: "mySecretKey",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );

    this.logMemoryUsage("session point B")
  }

  private middleware(): void {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(
      cors({
        credentials: true,
      })
    );
    this.express.use("/temp", express.static(path.join(__dirname, "temp"))); //! Vou usar?
  }

  private routes(): void { 
    this.express.use("/api", BaseRouter);
  }

  private listen() {
    this.express.listen(PORT, () => {
      this.logMemoryUsage('Listening port')
      console.log(`App listening on port ${PORT}`);
    });
  }
}
