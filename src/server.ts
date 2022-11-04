import express, { Request, Response } from "express";
import errorHandler from "./middleware/error";
import router from "./routes/routes";

const app = express();
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Solutions Lab: Projeto API" });
});

export default app;

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   res.status(404);
//   res.json({ error: err.message });
// });
