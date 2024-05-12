const express = require("express");
const app = express();

require("dotenv").config();
require("./db");

const cors = require("cors");
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const moviesRouter = require("./routes/movies");
const userRouter = require("./routes/user");

const PORT = 3000;
app.use(express.json());
app.use('/api', moviesRouter);
app.use("/api/auth", userRouter);

app.get("/", (req, res)=>{
    return res.send("<h2>Hello World</h2>")
})

app.listen(PORT, ()=>{
    console.log("server running");
})