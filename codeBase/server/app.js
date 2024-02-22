import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import { app, io, mainServer } from "./socket/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
import appRoute from "./routes/index.js";
app.use(appRoute);

app.get("/", (req, res) => {
  res.send("response");
});

mainServer.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});