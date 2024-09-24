require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Import the 'cors' middleware

// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));
app.use(express.static(path.join(__dirname, "build")));

// Other middleware
app.use(cookieParser());
app.use(morgan("tiny"));

// Enable CORS for all routes
app.use(cors()); // Add this line to allow cross-origin requests

// Define your routes
const user = require("./routes/user");
const defect = require("./routes/defect");
const process = require("./routes/process");
const plantCode = require("./routes/plantCode");
const productionLine = require("./routes/productionLine");
const report = require("./routes/report");

// Router middleware
app.use("/api/v1", user);
app.use("/api/v1", defect);
app.use("/api/v1", process);
app.use("/api/v1", plantCode);
app.use("/api/v1", productionLine);
app.use("/api/v1", report);

// Serve your frontend (index.html)
app.get("*", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = app;
