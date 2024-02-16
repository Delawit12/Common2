import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
//import multerConfig from "./config/multer.js";

import fs from "fs/promises";
import sharp from "sharp";
import path from "path";
import os from "os";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getServerIPAddress = () => {
  const ifaces = os.networkInterfaces();
  let ipAddress = "localhost";

  Object.keys(ifaces).forEach((iface) => {
    ifaces[iface].forEach((ifaceDetails) => {
      if (ifaceDetails.family === "IPv4" && ifaceDetails.internal === false) {
        ipAddress = ifaceDetails.address;
      }
    });
  });

  return ipAddress;
};

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

import install from "./config/install.js";
install();
import server from "./socket/index.js";

// Enable CORS middleware before setting up routes
const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.43.110:5173"],
  credentials: true,
};
server.use(cors(corsOptions));

// Middleware for parsing JSON and URL-encoded data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//server.use(multerConfig.any());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define your routes
import appRoute from "./routes/index.js";
server.use(appRoute);

server.get("/", (req, res) => {
  res.send("response");
});

server.get("/test", (req, res) => {
  res.send("test url");
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
