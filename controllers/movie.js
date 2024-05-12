const { Movie }  = require("../models/models");
const getMovies = async(req, res)=>{
    try{
        const { _id } = req.user;
        const movies = await Movie.find({user: _id});
        res.send(movies);
    }
    catch(err){
        console.log(err);
       return res.status(500).send({"message": "Error in getting list of movies. Please try Again!"});
    }
}

const deleteMovie = async(req, res)=>{
    try{
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        res.send(deletedMovie);
    }catch(err){
        console.log(err);
        res.status(500).send("Error while deleting movie. Please try Again!")
    }
}

const updateMovie = async(req, res)=>{
    try{
        const updatedMovie = await Movie.findByIdAndUpdate({_id: req.params.id}, req.body);

        res.status(201).send(updatedMovie);
    }catch(err){
        return res.status(500).send("Error in updating movie in database. Try Again!")
    }
}

const getSingleMovie = async(req, res)=>{
    try{
        const singleMovie = await Movie.findOne({
            _id: req.params.id
        })
    
        res.send(singleMovie);
    }catch(err){
        console.log(err);
        res.status(500).send("Error in getting movie details. Please try again");
    }
}

const createMovie = async(req, res)=>{
    const movie = req.body;
    const { _id } = req.user;
    try{
        await Movie.create({...movie, user: _id});

        res.send({"message": "movie created in the database"});
    }catch(err){
        console.log(err);
        res.status(500).send("Error in adding movie. Please try again!");
    }
}

module.exports = { getMovies, createMovie, getSingleMovie, updateMovie, deleteMovie };