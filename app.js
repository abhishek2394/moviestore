var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectId = require("mongodb").ObjectID;
var mongoose = require('mongoose');

app.use(express.static(__dirname + "/moviestore"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Genre = require('./models/genres');
Movie = require('./models/movies');
//connect to mongoose
var db =mongoose.connection ;
mongodb.MongoClient.connect(process.env.MONGODB_URI ||'mongodb://abhi:gautam@ds017886.mlab.com:17886/moviestore' , function (err, database) {
  if (err) {
    console.log(err);
		console.log(database);
    process.exit(1);
  }



// Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

	// Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
	});
});

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
