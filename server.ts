import app from "./src/app";

const startserver = () => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Listening on Port:${port}`);
  });
};

startserver();
