
// query selector variables go here 👇
var displayTitle = document.querySelector('.poster-title');
var displayQuote = document.querySelector('.poster-quote');
var displayImg = document.querySelector('.poster-img');
var mainPoster = document.querySelector('.main-poster');
var posterForm = document.querySelector('.poster-form');
var savedPostersSection = document.querySelector('.saved-posters');

// we've provided you with some data to work with 👇\
var savedPosters = [];
var currentPoster;

//buttons
var randomButton = document.querySelector('.show-random');
var makeNewButton = document.querySelector('.show-form');
var savedButton = document.querySelector('.show-saved');
var takeBackButton = document.querySelector('.show-main');
var backToMainButton = document.querySelector('.back-to-main');


// event listeners go here 👇
window.addEventListener('load', generateRandomPoster);
randomButton.addEventListener('click', generateRandomPoster);
makeNewButton.addEventListener('click', showCustomForm );
savedButton.addEventListener('click', showSavedPosters);
takeBackButton.addEventListener('click', showMainPage);
backToMainButton.addEventListener('click', displayMainPage)

// functions and event handlers go here 👇
function generateRandomPoster() {
  var randomImage = getRandomIndex(images);
  var randomTitle = getRandomIndex(titles);
  var randomQuote = getRandomIndex(quotes);
  currentPoster = new Poster(randomImage, randomTitle, randomQuote);
  changePoster(currentPoster);
}

function changePoster(posterObject) {
  displayTitle.innerText = posterObject.title;
  displayQuote.innerText = posterObject.quote;
  displayImg.src = posterObject.imageURL;
}

function showSavedPosters() {
  mainPoster.classList.add('hidden');
  savedPostersSection.classList.remove('hidden');
}

function showCustomForm() {
  mainPoster.classList.add('hidden');
  posterForm.classList.remove('hidden');
}

function showMainPage() {
  mainPoster.classList.remove('hidden');
  savedPostersSection.classList.add('hidden');
}

function displayMainPage() {
  mainPoster.classList.remove('hidden');
  posterForm.classList.remove('hidden');
}


// (we've provided one for you to get you started)!
function getRandomIndex(array) {
  return array[Math.floor(Math.random() * array.length)];
}
