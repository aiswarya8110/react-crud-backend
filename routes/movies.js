const express = require("express");
const Router = express.Router();
const { createMovie, getMovies, getSingleMovie, updateMovie, deleteMovie }=require("../controllers/movie");
const authMiddleware = require("../authMiddleware/authMiddleware");

Router.get("/movies", authMiddleware, getMovies)

Router.post("/movies", authMiddleware, createMovie)

Router.get("/movies/:id",authMiddleware, getSingleMovie);

Router.patch("/movies/:id", authMiddleware, updateMovie);

Router.delete("/movies/:id",authMiddleware, deleteMovie);

module.exports = Router;