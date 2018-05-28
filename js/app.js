/*
 * Create a list that holds all of your cards
 */

 const cards = [
  "fa-star",
  "fa-star",
  "fa-leaf",
  "fa-leaf",
  "fa-pagelines",
  "fa-pagelines",
  "fa-sun-o",
  "fa-sun-o",
  "fa-twitter",
  "fa-twitter",
  "fa-bug",
  "fa-bug",
  "fa-moon-o",
  "fa-moon-o",
  "fa-paw",
  "fa-paw"];


// to test matches
/*
const cards = [
  "fa-star",
  "fa-star",
  "fa-star",
  "fa-star"
];
*/

// array to store two cards for comparison
let openCards = [];

let moves = 0;
let movesHTML = document.getElementById("moves");
let minutesHTML = document.getElementById("minutes");
let totalSeconds = 0;
let secondsHTML = document.getElementById("seconds");
let firstClick = false;

let matches = 0;
movesHTML.innerHTML = moves;

let timer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// get array of shuffled cards
 const sortedCards = shuffle(cards);

// deck container
 const deck = document.getElementById('deck');

// loop through shuffled cards and add them to the deck
 for (var x=0; x< sortedCards.length; x++) {
   const li=document.createElement('li');
   deck.appendChild(li);
   li.classList.add('card');
   li.innerHTML = "<i class= 'fa " + sortedCards[x] + "'>";
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startTimer() {
  timer = setInterval(setTime, 1000);
}

// setTime function from https://stackoverflow.com/a/5517836
function setTime() {
  ++totalSeconds;
  secondsHTML.innerHTML = pad(totalSeconds % 60);
  minutesHTML.innerHTML = pad(parseInt(totalSeconds / 60));
}

// pad function from https://stackoverflow.com/a/5517836
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function endTimer() {
  clearInterval(timer);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


deck.addEventListener('click', displayCard);

// function to flip and display a card
function displayCard(evt) {
  //console.log(evt.target.hasClass("open show"));
  if (evt.target.classList.contains('open') === false) {
    evt.target.classList.add('open', 'show');
    //deck.removeEventListener('click', displayCard);
    if (firstClick === false) {
      //start that timer!
      startTimer();
      firstClick = true;
    }
    addOpenCard(evt);
  }

}

// function to add flipped card to an array for comparison
function addOpenCard(evt) {
  // if first card clicked, just add card to array
  if (openCards.length === 0) {
    openCards.push(evt.target);
  } else {
    // second card clicked... add card to array
    openCards.push(evt.target);

    //add one to moves
    moves += 1;
    movesHTML.innerHTML = moves;
    //compare cards
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      console.log("match!");
      yesMatch();
    } else {
      console.log("no match");
      noMatch();
    }
  }
}

// function to change color of unmatched card and then flip back over
function noMatch() {
  // change the background color to show error
  openCards[0].classList.add('nomatch');
  openCards[1].classList.add('nomatch');
  setTimeout(function() {
    // flip cards back over
    openCards[0].classList.remove('open', 'show', 'nomatch');
    openCards[1].classList.remove('open', 'show', 'nomatch');
    // clear array for the next match
    openCards = [];
  }, 1000);
}

// function to change color of matched card and disable further clicking
function yesMatch() {
  openCards[0].classList.add('match', 'disable');
  openCards[1].classList.add('match', 'disable');
  // clear array for the next match
  openCards = [];
  matches += 1;
  if (matches === 8) {
    // stop timer
    endTimer();

    gameOver();
  }
}

function gameOver() {
  // TODO: add modal
  console.log("winner winner chicken dinner!");
}
