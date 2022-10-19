import express from "express";
import router from "./routes/routes";

const app = express();
app.use(express.json());
app.use(router.router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `
      App listen on port: ${PORT}
      `
  );
});
