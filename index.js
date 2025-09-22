import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./route/user.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

connectDB();

app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoute);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
