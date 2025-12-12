import express from "express";
import cors from "cors";

const app = express();

app.use(cors());





app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
