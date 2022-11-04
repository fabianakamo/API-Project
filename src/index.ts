import app from "./server";

const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `
        Yep this is working 🍺 🎉 
        App listen on port: ${PORT} 🥷
      `
  );
});
