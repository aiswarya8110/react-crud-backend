const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    release_year: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Movie = new model("Movie", MovieSchema);


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
       type: String,
       required: true,
    },
    token: {
        type: String,
        required: false
    }
})


const User = new model("User", userSchema);



module.exports = { Movie, User };