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
  "fa-star"
]
*/


const openCards = [];


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

// remove and change classes
//document.getElementById("MyElement").classList.add('MyClass');
//document.getElementById("MyElement").classList.remove('MyClass');

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

function displayCard(evt) {
  evt.target.classList.add('open', 'show');
  addOpenCard(evt);
}

function addOpenCard(evt) {
  openCards.push(evt.target);
  //check to see if there has been another card clicked
  if (openCards.length == 2) {
    console.log(openCards[0]);
    console.log(openCards[1]);
    if (openCards[0].innerHTML == openCards[1].innerHTML) {
      console.log("There's a match! Do stuff in a new function!");
    } else {
      console.log("No match!");
      noMatch();

    }
  }
}

function noMatch() {
  // change the background color to show error
  openCards[0].classList.add('nomatch');
  openCards[1].classList.add('nomatch');
  setTimeout(function() {
    openCards[0].classList.remove('open', 'show', 'nomatch');
    openCards[1].classList.remove('open', 'show', 'nomatch');
  }, 1500);
}
