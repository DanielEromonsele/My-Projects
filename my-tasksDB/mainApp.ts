import cors from "cors";
import { Application, Request, Response } from "express";
import todo from "./router/todoRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api", todo);
    app.use(cors());
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Welcome to my api",
        });
      } catch (error) {
        return res.status(404).json({
          message: "error",
        });
      }
    });
  } catch (error) {
    return error;
  }
};
