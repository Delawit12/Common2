import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import appRoute from "./routes/index.js";
import { app, io, mainServer } from "./socket/socket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

// const corsOptions = {
//   origin: ["http://localhost:5173", "*"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(appRoute);

app.get("/", (req, res) => {
  res.send("response");
});

mainServer.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
