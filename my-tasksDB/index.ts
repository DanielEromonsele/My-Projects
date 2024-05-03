import express, { Application } from "express";
import cors from "cors";

import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";

const app: Application = express();
const port: number = parseInt(process.env.PORT!);

app.use(express.json());
app.use(cors());

mainApp(app);
const server = app.listen(port, () => {
  console.clear();
  console.log("server is up and running");
  dbConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log("uncaughtException", error);
});
process.on("unhandleRejection", (reason: any) => {
  console.log("unhandleRejection", reason);

  server.close(() => {
    process.exit(1);
  });
});
