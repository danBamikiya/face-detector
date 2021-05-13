import getMovie from './getMovie';
import appendMoviePosterToDOM from './appendMoviePosterToDOM';
import appendMovieDetailsToDOM from './appendMovieDetailsToDOM';
import getActorsImgsURL from './getActorsImgsUrl';
import useActorsImgsUrlWhenReady from './useActorsImgsUrl';

const submitBtn = document.getElementById('submitBtn');
const inputTxt = document.getElementById('inputTxt');
const moviePosterContainer = document.getElementsByClassName(
	'movie-poster-container'
)[0];
const moviePosterDetailsContainer = moviePosterContainer.nextElementSibling;
const canvasElement = document.getElementsByTagName('canvas')[0];

const posterImg = document.createElement('img');
const posterDetails = document.createElement('div');
posterDetails.className = 'poster-details';
const div = document.createElement('div');
div.className = 'movie-poster-details';

const Movie = {};

const AppendToDOMDependencies = {
	Movie,
	posterDetails,
	moviePosterDetailsContainer,
	moviePosterContainer,
	posterImg,
	title_paragraph: document.createElement('p'),
	year_paragraph: document.createElement('p'),
	length_paragraph: document.createElement('p'),
	rating_paragraph: document.createElement('p'),
	plot_paragraph: document.createElement('p')
};

function showMovie(movie) {
	Movie.title = movie['title'].trim();
	Movie.year = movie['year'];
	Movie.length = movie['length'];
	Movie.rating = movie['rating'];
	Movie.poster = movie['poster'];
	Movie.plot = movie['plot'];
	Movie.cast = movie['cast'];

	getActorsImgsURL(Movie);
	appendMoviePosterToDOM(AppendToDOMDependencies);
	appendMovieDetailsToDOM(AppendToDOMDependencies);
	useActorsImgsUrlWhenReady(Movie);
}

function submitValue(e) {
	e.preventDefault();
	// get input field value
	let txtValue = inputTxt.value;
	getMovie(txtValue, showMovie);
	// clear input field
	inputTxt.value = '';
}

submitBtn.addEventListener('click', submitValue);
