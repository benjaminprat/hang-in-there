
// query selector variables go here 👇
var displayTitle = document.querySelector('.poster-title');
var displayQuote = document.querySelector('.poster-quote');
var displayImg = document.querySelector('.poster-img');
var mainPoster = document.querySelector('.main-poster');
var posterForm = document.querySelector('.poster-form');
var savedPostersSection = document.querySelector('.saved-posters');
var savedPosterGrid = document.querySelector('.saved-posters-grid');


// we've provided you with some data to work with 👇\
var savedPosters = [];
var currentPoster;

//buttons
var randomButton = document.querySelector('.show-random');
var makeNewButton = document.querySelector('.show-form');
var savedButton = document.querySelector('.show-saved');
var takeBackButton = document.querySelector('.show-main');
var backToMainButton = document.querySelector('.back-to-main');
var customButton = document.querySelector('.make-poster');
var savePosterButton = document.querySelector('.save-poster');


// event listeners go here 👇
window.addEventListener('load', generateRandomPoster);
randomButton.addEventListener('click', generateRandomPoster);
makeNewButton.addEventListener('click', showCustomForm );
savedButton.addEventListener('click', showSavedPosters);
takeBackButton.addEventListener('click', showMainPage);
backToMainButton.addEventListener('click', showMainPage);
customButton.addEventListener('click', makeCustomPoster);
savePosterButton.addEventListener('click', saveToArray);

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
  savedPostersSection.classList.remove('hidden');
  mainPoster.classList.add('hidden');
  posterForm.classList.add('hidden');
  makeMiniPosters();
}

function showCustomForm() {
  posterForm.classList.remove('hidden');
  mainPoster.classList.add('hidden');
  savedPostersSection.classList.add('hidden')
}

function showMainPage() {
  mainPoster.classList.remove('hidden');
  savedPostersSection.classList.add('hidden');
  posterForm.classList.add('hidden');
}


function makeCustomPoster() {
  customButton.setAttribute('type', 'button');
  var customPosterUrl = document.getElementById('poster-image-url').value;
  var customPosterTitle = document.getElementById('poster-title').value;
  var customPosterQuote = document.getElementById('poster-quote').value;
  var customPoster = new Poster(customPosterUrl, customPosterTitle, customPosterQuote);
  showMainPage();
  saveData(customPoster);
  return changePoster(customPoster);
}

function saveData(posterObject) {
  images.push(posterObject.imageURL);
  titles.push(posterObject.title);
  quotes.push(posterObject.quote);
}

function saveToArray() {
  if (!savedPosters.includes(currentPoster)) {
    savedPosters.unshift(currentPoster);
  }
}

function makeMiniPosters() {
  savedPosterGrid.innerHTML = '';
  for (var i = 0; i < savedPosters.length; i++) {
    var miniPoster = `<article class="mini-poster" id="${savedPosters[i].id}">
                        <img src=${savedPosters[i].imageURL}>
                        <h2>${savedPosters[i].title}</h2>
                        <h4>${savedPosters[i].quote}</h4>
                      </article>`;
    savedPosterGrid.insertAdjacentHTML('beforeend', miniPoster);
  }
};

// (we've provided one for you to get you started)!
function getRandomIndex(array) {
  return array[Math.floor(Math.random() * array.length)];
}
