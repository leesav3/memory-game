/*
 * Create a list that holds all of your cards
 */

// array of cards for game
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

// variables to keep track of moves
let moves = 0;
let movesHTML = document.getElementById("moves");
let firstClick = false;

// variables for stars
let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");
console.log(star3.innerHTML);

// variables for game timer
let minutesHTML = document.getElementById("minutes");
let secondsHTML = document.getElementById("seconds");
let totalSeconds = 0;
let timer;

// variable to keep track of matches
let matches = 0;

// modal variables
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var modalText = document.getElementById('modalText');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 movesHTML.innerHTML = moves;

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

// listen for clicks on the deck (game board)
deck.addEventListener('click', displayCard);

// function to flip and display a card
function displayCard(evt) {
  // only click and display if it is a card
  if (evt.target.nodeName === 'LI') {
    // check to see if it is the first click of the game
    // if it is, start the timer and update flag to true
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
    //if (evt.target.classList.contains('open') === false) {
      evt.target.classList.add('open', 'show');
      openCards.push(evt.target);
    //}

  } else {
    // second card clicked... add card to array
    if (evt.target.classList.contains('open') === false) {
      // temporarily turn off clicks
      deck.removeEventListener('click', displayCard);

      evt.target.classList.add('open', 'show');
      openCards.push(evt.target);

      //add one to moves
      countMoves();

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
    // add back event addEventListener
    deck.addEventListener('click', displayCard);
  }, 1000);
}

// function to change color of matched card and disable further clicking
function yesMatch() {
  openCards[0].classList.add('match', 'disable');
  openCards[1].classList.add('match', 'disable');
  // clear array for the next match
  openCards = [];
  matches += 1;

  // add back event addEventListener
  deck.addEventListener('click', displayCard);
  if (matches === 8) {
    // stop timer and display game over message
    endTimer();
    gameOver();
  }
}

// function to keep track of moves and star rating
function countMoves() {
  moves += 1;
  movesHTML.innerHTML = moves;

  if (moves === 10) {
    star3.innerHTML = "<i class='fa fa-star-o'></i>";
  } else if (moves === 15) {
    star2.innerHTML = "<i class='fa fa-star-o'></i>";
  }
}

function restartGame() {
  location.reload();
}

function gameOver() {
  modal.style.display = "block";
  if (minutesHTML.innerHTML == "00") {
    modalText.innerHTML = "YOU WON!<br><br>You finished in " + secondsHTML.innerHTML + " seconds and<br>" + moves +
      " moves<br>with a star rating of " + star1.innerHTML + star2.innerHTML + star3.innerHTML;
  } else {
    modalText.innerHTML = "YOU WON!<br><br>You finished in " + minutesHTML.innerHTML + " minutes and " +
      secondsHTML.innerHTML + " seconds and<br>" + moves + " moves<br>with a star rating of " + star1.innerHTML +
      star2.innerHTML + star3.innerHTML;
  }

}

// Modal functionality from https://www.w3schools.com/howto/howto_css_modals.asp
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
