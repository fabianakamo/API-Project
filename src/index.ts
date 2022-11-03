import app from "./server";

const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `
      App listen on port: ${PORT}
      `
  );
});
