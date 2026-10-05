// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.use(express.json());
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});
var distDir = path.resolve(__dirname, "dist");
app.use(express.static(distDir));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(distDir, "index.html"));
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Production server running on http://0.0.0.0:${PORT}`);
});
