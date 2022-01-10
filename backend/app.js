require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const route = require("./routers");

// connection

mongoose
  .connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"));

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// route
app.use("/api", route);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// port
// redeploy
const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`server running at port ${port}`));
