const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const logger = require("morgan");
const session = require("express-session");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(logger("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/files", express.static("files"));

// app.use(
//   cors({
//      origin: "http://localhost:3500",
//     // origin: "https://knowifycapital.uk",
//     // origin: "*",
//   })
// );

app.use(cors());

app.use(express.static("public"));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

require("./router")(app);
require("./db/db");

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "ERP is running",
  });
});

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT", PORT);
});

module.exports = app;
