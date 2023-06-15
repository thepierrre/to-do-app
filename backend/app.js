const express = require("express");
const app = express();
const mongoose = require("mongoose");

const listsRoutes = require("./routes/lists-routes");
const tasksRoutes = require("./routes/tasks-routes");
const HttpError = require("./models/http-error");

const port = process.env.PORT;
const mongoDBConnect = process.env.MONGODB;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/lists", listsRoutes);
app.use("/api/lists", tasksRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(mongoDBConnect)
  .then(() => {
    app.listen(port);
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log(err);
  });
