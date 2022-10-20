import { NextFunction, Request, Response } from "express";
import express from "express";
import router from "./routes/routes";

const app = express();
app.use(express.json());
app.use(router.router);

app.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Solutions Lab: Projeto API" });
});

app.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    response.status(error.status || 500);
    response.json({ error: error.message });
  }
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `
      App listen on port: ${PORT}
      `
  );
});
