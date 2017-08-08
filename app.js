var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genres');
Movie = require('./models/movies');
//connect to mongoose

mongoose.connect('mongodb://localhost:27017/Mongodb', { useMongoClient: true });
var db = mongoose.connection;

mongoose.model('users',{name: String});
app.get('/', function(req, res){
	res.send('Hello World!');
});
app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){

			throw err;
		}
		res.json(genres);
	});

});
app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err){

			throw err;
		}
		res.json(genre);
	});

});

app.put('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre,{}, function(err, genre){
		if(err){

			throw err;
		}
		res.json(genre);
	});

});
app.delete('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	Genre.deleteGenre(id , function(err, genre){
		if(err){

			throw err;
		}
		res.json(genre);
	});

});

app.get('/api/movies', function(req, res){
	Movie.getMovies(function(err, movies){
		if(err){

			throw err;
		}
		res.json(movies);
	});

});
app.post('/api/movies', function(req, res){
	var movie = req.body;
	Movie.addMovie(movie, function(err, movie){
		if(err){

			throw err;
		}
		res.json(movie);
	});

});

app.get('/api/movies/:_id', function(req, res){
	Movie.getMovieById(req.params._id, function(err, movie){
		if(err){

			throw err;
		}
		res.json(movie);
	});

});
app.put('/api/movies/:_id', function(req, res) {
	var id = req.params._id;
	var movie = req.body;
	Movie.updateMovie(id, movie, {}, function(err, movie) {
		if(err){
			throw err;
		}
		res.json(movie);
	});
});
app.delete('/api/movies/:_id', function(req, res){
	var id = req.params._id;
	Movie.deleteMovie(id , function(err, movie){
		if(err){

			throw err;
		}
		res.json(movie);
	});

});


app.listen(27017);
console.log('Running on Port 3000..');

