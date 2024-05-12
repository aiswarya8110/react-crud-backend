const express = require("express");
const { createUser, loginUser, logoutUser } = require("../controllers/user");
const authMiddleware = require('../authMiddleware/authMiddleware');
const Router = express.Router();

Router.post("/register", createUser);
Router.post("/login", loginUser);
Router.post("/logout", authMiddleware, logoutUser);

module.exports = Router;