require("reflect-metadata");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./app");

const taskRoute = require("./routes/taskRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", taskRoute);

const port = process.env.PORT || 5000;

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
})();
