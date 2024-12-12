import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import { Server } from "socket.io"; // Use named import for Socket.IO server

import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/message.routes.js"
import channelRoutes from "./routes/channel.routes.js"
import moviesRoutes from './routes/movies.routes.js'
import seriesRoutes from "./routes/series.routes.js"

import { connectToDb } from "./db/db.connect.js";


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000", // Adjust to your frontend origin
      methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes)
app.use("/api/channels", channelRoutes)
app.use("/api/movies", moviesRoutes)
app.use("/api/series", seriesRoutes)


server.listen(PORT, () => {
  connectToDb();
  console.log(`Server running on port ${PORT}`);
});