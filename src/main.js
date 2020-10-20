var displayTitle = document.querySelector('.poster-title');
var displayQuote = document.querySelector('.poster-quote');
var displayImg = document.querySelector('.poster-img');

var sectionHome = document.querySelector('.main-poster');
var sectionForm = document.querySelector('.poster-form');
var sectionSaved = document.querySelector('.saved-posters');

var savedPosterGrid = document.querySelector('.saved-posters-grid');



var savedPosters = [];
var currentPoster;


var randomButton = document.querySelector('.show-random');
var customButton = document.querySelector('.make-poster');
var showFormButton = document.querySelector('.show-form');
var showSavedButton = document.querySelector('.show-saved');
var nevermindButton = document.querySelector('.show-main');
var backToMainButton = document.querySelector('.back-to-main');
var savePosterButton = document.querySelector('.save-poster');



window.addEventListener('load', generateRandomPoster);
randomButton.addEventListener('click', generateRandomPoster);
showFormButton.addEventListener('click', showCustomForm);
showSavedButton.addEventListener('click', showSavedPosters);
customButton.addEventListener('click', makeCustomPoster);
nevermindButton.addEventListener('click', showMainPage);
backToMainButton.addEventListener('click', showMainPage);
savePosterButton.addEventListener('click', addToSavedPosters);
displayTitle.addEventListener('click', updateAPosterValue);
displayImg.addEventListener('click', updateAPosterValue);
displayQuote.addEventListener('click', updateAPosterValue);

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

function displayOff() {
  sectionHome.classList.add("hidden");
  sectionSaved.classList.add("hidden");
  sectionForm.classList.add("hidden");
};


function showSavedPosters() {
  displayOff();
  sectionSaved.classList.toggle('hidden');
  makeMiniPosters();
  enableDblClick();
}

function showCustomForm() {
  displayOff();
  sectionForm.classList.toggle('hidden');

}

function showMainPage() {
  displayOff();
  sectionHome.classList.toggle('hidden');

}

function makeCustomPoster() {
  // customButton.setAttribute('type', 'button');
  event.preventDefault();
  var customPosterUrl = document.getElementById('poster-image-url').value;
  var customPosterTitle = document.getElementById('poster-title').value;
  var customPosterQuote = document.getElementById('poster-quote').value;
  if (verifyForm(customPosterUrl, customPosterTitle, customPosterQuote) === false) {
    return alert('Input field cannot be empty.')
  }
  currentPoster = new Poster(customPosterUrl, customPosterTitle, customPosterQuote);
  showMainPage();
  saveData(currentPoster);
  return changePoster(currentPoster);
}

function saveData(posterObject) {
  images.push(posterObject.imageURL);
  titles.push(posterObject.title);
  quotes.push(posterObject.quote);
}

function addToSavedPosters() {
  if (!savedPosters.includes(currentPoster)) {
    savedPosters.unshift(currentPoster);
  }
}

function makeMiniPosters() {
  savedPosterGrid.innerHTML = '';
  for (var i = 0; i < savedPosters.length; i++) {
    var miniPoster = `<section class="mini-poster" id="${i}">
                        <img src=${savedPosters[i].imageURL}>
                        <h2>${savedPosters[i].title}</h2>
                        <h4>${savedPosters[i].quote}</h4>
                      </section>`;
    savedPosterGrid.insertAdjacentHTML('beforeend', miniPoster);
  }
};

function enableDblClick() {
  var allImages = document.querySelectorAll('section.mini-poster');
  for (var i = 0; i < allImages.length; i++) {
    allImages[i].addEventListener('dblclick', removePoster);
  }
}

function removePoster() {
   savedPosters.splice(this.id, 1);
   showSavedPosters();
}

function getRandomIndex(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function verifyForm(url, title, quote) {
  if (url === "" || title === '' || quote === '') {
    return false;
  }
}

function updateAPosterValue() {
  if (this.classList.value === 'poster-title') {
    var newTitle = getRandomIndex(titles);
    currentPoster = new Poster(currentPoster.imageURL, newTitle, currentPoster.quote)
  } else if (this.classList.value === 'poster-quote'){
    var newQuote = getRandomIndex(quotes);
    currentPoster = new Poster(currentPoster.imageURL, currentPoster.title, newQuote)
  } else if (this.classList.value === 'poster-img') {
    var newURL = getRandomIndex(images);
    currentPoster = new Poster(newURL, currentPoster.title, currentPoster.quote)
  }
  changePoster(currentPoster)
}
