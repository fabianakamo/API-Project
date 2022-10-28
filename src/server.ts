import { NextFunction, Request, Response } from "express";
import express from "express";
import router from "./routes/routes";

const app = express();
app.use(express.json());
app.use(router.router);

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Solutions Lab: Projeto API" });
});

// app.use(errorHandler);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   res.status(404);
//   res.json({ error: err.message });
// });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `
      App listen on port: ${PORT}
      `
  );
});
