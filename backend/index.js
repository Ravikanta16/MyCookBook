const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const authRoutes = require("./routes/auth");
const http = require("http");
const server = http.createServer(app);

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/MyCookBook", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/auth", authRoutes);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = { server };