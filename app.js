require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));
app.use(express.static(path.join(__dirname, "build")));

// other middleware
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Max-Age', '86400'); // Cache preflight requests for 24 hours
//     next();
//   });
  

// all routes
const user = require("./routes/user");
const defect = require("./routes/defect");
const process = require("./routes/process");
const plantCode = require("./routes/plantCode");
const productionLine = require("./routes/productionLine");
const report = require("./routes/report");

// router middleware
app.use("/api/v1", user);
app.use("/api/v1", defect);
app.use("/api/v1", process);
app.use("/api/v1", plantCode);
app.use("/api/v1", productionLine);
app.use("/api/v1", report);

app.get("*", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "build", "index.html"))
    } catch(err) {
        console.log(err);
    }
})

module.exports = app;
