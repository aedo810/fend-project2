//document.body.onload(start());
/*
 * Create a list that holds all of your cards
 */

var cards = document.getElementsByClassName('card'); // Array of 16
var cardss = document.querySelectorAll('.card');
console.log(cardss);
console.log(cards);
// array of 8 symbols .class for the cards
var symbols = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
// double array for each 8 card pair
var symbols2 = [...symbols,...symbols];
//var cards = [...card];


// var counter = document.getElementsByClassName('moves'); //returns HTMLCollection
//var counter = document.querySelectorAll('.moves'); //returns NodeList, [0] returns span element


function start() {
    var shuffled = shuffle(symbols);
    var moves = 0;
    counter.innerHTML = moves;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// Shuffle the symbols and add them to each card
var shuffled = shuffle(symbols2);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) $
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) $
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


for (let i = 0; i < cards.length; i++) {
    // add shuffled symbol to each card
    cards[i].firstElementChild.classList.add(shuffled[i]);
    // add event listener for each card
    cards[i].addEventListener('click', displayCard); // how do i pass "this" with functions
    cards[i].addEventListener('click', openCard); 
}


function displayCard() {
    // disabled not working
    this.classList.add('open', 'show', 'disabled');
}

// add open cards to a list
var openedCards = []; // array of open cards
var matchedCards = []; // array of matched cards
function openCard() {
    openedCards.push(this);
    console.log("open cards: " + openedCards);
    if (openedCards.length === 2) {
        console.log("len = 2");
        updateScore(); //update timer and score
        if (openedCards[0].innerHTML == openedCards[1].innerHTML) {
            // add matched cards to matched list
            matched();
        } else {
            // remove unmatched cards from open cards list
            unmatched();
        }
    }
}

function matched() {
    // push matched cards to matched array
    openedCards.forEach(card => { //what is card pointing too?  [object HTMLLIElement]
        card.classList.add('match');
        matchedCards.push(card)
        console.log("matched cards: " + card);
    });
    // empty opened cards array
    openedCards = [];
}

function unmatched() {
    openedCards.forEach(card => card.classList.add('unmatched'));
    //disable();
    setTimeout(() => {
        openedCards.forEach(card => card.classList.remove('open', 'show', 'disabled', 'unmatched'));
        openedCards = [];
    },600);
}

// calls timer and updates score panel
var star = document.querySelector('.stars');
var counter = document.querySelector('.moves'); //returns span element
var moves = 0;
function updateScore() {
    moves++;
    console.log("update moves: " + moves);
    counter.innerHTML = moves;
    // start timer on first pair
    if (moves == 1) { // if moves is number
        // initialize timer
        startTimer();
    }
    // update star ratings
    if (moves > 20) {
        star.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    }
    if (moves < 20 && moves > 10) {
        star.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    }
}

// updates timer 
var second = 0;
var minute = 0;
var timer = document.querySelector('.timer');
function startTimer() {
    var interval = setInterval(() => {
        timer.innerHTML = `${minute} : ${second}`;
        second++;
        if (second === 60) {
            minute++;
            second = 0;
        }
    },1000);
}

function 