import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "fs";

const swaggerDocument = YAML.parse(fs.readFileSync("./swagger.yaml", "utf8"));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/", routes);

app.get("/", (_req, res) => {
  res.send("Hello there - API");
});

app.all("*", (_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
