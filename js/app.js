//document.body.onload(start());
/*
 * Create a list that holds all of your cards
 */

//var card = document.getElementsByClassName('card'); // Array of 16
var card = document.querySelectorAll('.card');
var cards = [...card];
//var deck = document.getElementsByClassName('deck');
var deck = document.querySelector('.deck');
console.log(deck);
// array of 8 symbols .class for the cards
//var symbols = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
// double array for each 8 card pair
//var symbols2 = [...symbols,...symbols];


// Shuffle the symbols and add them to each card
//var shuffled;
//var restart = document.querySelector('.restart');
var openedCards; // array of open cards
var matchedCards; // array of matched cards

// variables for timer
var timer = document.querySelector('.timer');
var second = 0;
var minute = 0;
var interval;

// variables for score panel
var star = document.querySelector('.stars');
var counter = document.querySelector('.moves'); //returns span element
var moves = 0;

//restart.addEventListener('click', start);

window.addEventListener('load', start);
// window.onload = start();

//var starts = document.getElementsByClassName('restart')[0];
//var counter = document.getElementsByClassName('moves'); //returns HTMLCollection
//var counter = document.querySelectorAll('.moves'); //returns NodeList, [0] returns span element

function start() {
    // initialize score panel
    moves = 0;
    openedCards = [];
    matchedCards = [];
    cards = shuffle(cards);
    deck.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
        // add shuffled symbol to each card
        deck.appendChild(cards[i]);
        cards[i].classList.remove('open', 'show', 'match', 'unmatched', 'disabled');
    }
    counter.innerHTML = moves;
    star.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    second = 0;
    minute = 0;
    timer.innerHTML = `${minute} : ${second}`;
    clearInterval(interval); // clears interval
    //modal.style.visibility = "hidden";
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
    // add event listener for each card
    cards[i].addEventListener('click', displayCard); // how do i pass "this" with functions
    cards[i].addEventListener('click', openCard); 
}


function displayCard() {
    // disabled not working
    this.classList.add('open', 'show', 'disabled');
}

// add open cards to a list
function openCard() {
    openedCards.push(this);
    if (openedCards.length === 2) {
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
    });
    // empty opened cards array
    openedCards = [];

    if (matchedCards.length === 16) {
        congratulations();
    }
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
function updateScore() {
    moves++;
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
function startTimer() {
    interval = setInterval(() => {
        timer.innerHTML = `${minute} : ${second}`;
        second++;
        if (second === 60) {
            minute++;
            second = 0;
        }
    },1000);
}

var modal = document.querySelector('.modal');
//var modal = document.getElementById('modal'); //id returns element
//var modal = document.getElementsByClassName('modal');
var playAgainButton = document.querySelector('.playAgainBtn');
var restartButton = document.querySelector('.restart');
playAgainButton.addEventListener('click', playAgain);
restartButton.addEventListener('click',playAgain);
var finalTime;
function congratulations() {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // CSS in JS, should I use add classlist?
    //modal.style.display = "block";
    modal.style.visibility = "visible";
    var finalStars = document.querySelector('.stars').children.length; //get final number of stars 
    document.querySelector(".finalMoves").innerHTML = moves;
    document.querySelector(".finalStar").innerHTML = finalStars;
}

function playAgain() {
    modal.style.visibility = "hidden";
    start();
}

//restart not working -> shuffling, matching, and one is clicked