import "dotenv/config";
import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js"
import authRouter from "./src/routes/auth.router.js"
import auth from "./src/middlewares/auth.middleware.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Bienvenido!");
});

app.use("/auth", authRouter);
app.use("/api/products", auth, productsRouter);



app.use((req, res, next) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
