const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./src/routes/postRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const userRoutes = require("./src/routes/userRoutes");
const tagRoutes = require("./src/routes/tagRoutes");

const app = express();
const port = process.env.PORT || 3000;
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/alextuadev";

app.use(express.json());

app.use("/api/tags", tagRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido a mi API de Express con MongoDB");
});

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });
