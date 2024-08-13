import "dotenv/config";
import express from "express";
import router from "./routes/index.js";
import morgan from "morgan";
import cors from "cors";
import "./server.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", router);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ status, message: message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
