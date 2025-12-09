const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config();


mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Successfully connected to MongoDB!"))
	.catch((err) => console.error("Connection error", err));

const PORT = process.env.PORT || 4000;

const app = express();

// ========= Middlewares =================
app.use(morgan("dev")); 
app.use(express.json()); 
//app.use(cors({ origin: process.env.FRONTEND_URL }));
require("./config/passport");

// ========= Routes ======================
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
	res.send("Welcome to my API!");
});

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});