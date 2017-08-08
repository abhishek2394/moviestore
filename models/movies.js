var mongoose = require('mongoose');

//Movie Schemas
var movieSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	description: {
		type: String,
		
	},
	actor: {
		type: String,
		required: true
	},
	writer: {
		type: String,
		required: true
	},
	director: {
		type: String,
		required: true
	},
	image_url: {
		type: String,
	},
	trailer: {
		type: String,
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Movie = module.exports =  mongoose.model('Movie', movieSchema);

//Get Movies
module.exports.getMovies = function(callback, limit){
	Movie.find(callback).limit(limit);
}

//Get movie
module.exports.getMovieById = function(callback, id){
	Movie.findById(callback, id);
}
//Add movie
module.exports.addMovie = function(movie, callback){
	Movie.create(movie, callback);
}

module.exports.deleteMovie = function(id, callback){
	var query={_id: id};
	Movie.remove(query, callback);
}
module.exports.updateMovie = function(id, movie, options, callback){
	var query = {_id: id};
	var update = {
		name: movie.name,
		genre: movie.genre,
		description: movie.description,
		actor: movie.actor,
		writer: movie.writer,
		director: movie.director,
		image_url: movie.image_url,
		trailer: movie.trailer
	}
	Movie.findOneAndUpdate(query, update, options, callback);
}