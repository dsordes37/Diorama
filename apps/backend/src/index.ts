import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Rota base de teste
app.get("/api/v1", async (_req, res) => {
  res.json({ message: "API Diorama" });
});

app.listen(PORT, () => {
  console.log(`ativo na porta ${PORT}`);
});
