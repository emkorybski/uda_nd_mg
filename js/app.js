/*
 * Create a list that holds all of your cards
 */
var card_symbols =['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bomb','fa-bicycle','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bomb','fa-bicycle'];

/*
 * Auxiliary variables using provided DOM structure

*/

var cards = document.getElementsByClassName("card");

var card_deck = document.getElementById("deck");

var card_holders = card_deck.getElementsByClassName('fa');

var refresh_btn = document.getElementById("refresh");

var close_btn = document.getElementById("close");

var end_card = document.getElementById('card-bg');

var play_again = document.getElementById('play-again');

var main_timer = document.getElementById('seconds');

// timer setup
var timer = new Timer('1 second');

var moves = 0;
var moves_elem = document.getElementById('moves');

var rating = 100; // based on approx amount of maximum clicks in a situation when players doesn't remember anything he previously saw

//console.log(timer.ticks());
/*
timer.every('5 seconds', function () {
    console.log(timer.ticks());
});
*/
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

var opened = [];

// Card flip function
function flip(elem){
   elem.classList.add('show');
   elem.classList.add('open');
   elem.removeEventListener('click', { capture: false });
}

function flipback(el){
    el.classList.remove('show');
    el.classList.remove('open');
    el.classList.remove('match');
}

//Card match function
function match(element){
    opened.push(element);

    for(var a=0; a<opened.length-1; a++){
        if(element.lastElementChild.classList.contains(opened[a].lastElementChild.classList[1]) && opened.length>1){
            element.classList.remove('open');
            element.classList.add('match');
            opened[a].classList.remove('open');
            opened[a].classList.add('match');
            opened.length = 0;
           // break;
        } else {
            //flipback(element);
            element.classList.add('fail');

            moves_elem.textContent = moves++;


            /*
             * checking: if(rating < 70) : take one start away (change color to light grey), if(rating < 35) : take away 2 stars (change color to light grey)
             */

            setTimeout(function(){
                element.classList.remove('open');
                element.classList.remove('show');
                element.classList.remove('fail');
            }, 600);
            opened.pop(element);
        }     
    }
}

function firstLoad(ev){
    var random_cards = shuffle(card_symbols);

    for(var i=0; i<card_holders.length; i++){

        //console.log(card_holders[i].classList);

        if(card_holders[i].classList.length > 1){
            card_holders[i].classList.remove(card_holders[i].classList[1]);

        }
        card_holders[i].classList.add(random_cards[i]);
    }

    for(var c=0; c<cards.length; c++){
        cards[c].addEventListener("click", function(event) {
            flip(event.target);
            match(event.target);

            /*
             check the entire card array, if they all have class 'match' to display 'Game over' screen
             */
            //console.log(document.getElementsByClassName("match").length);

            if(document.getElementsByClassName("match").length === 16){
                // display 'game over' screen
                end_card.classList.add('flipped');
                document.getElementById("timer-text").textContent = timer.ticks();
                document.getElementById("final-moves").textContent = moves;
                timer.stop();
            }
        });
    }

    setTimeout(function(){
        timer.start();
        timer.every('1 seconds', function () {
            main_timer.textContent = timer.ticks();
        });
    }, 500);
}

function playAgain(evt){
    var random_cards = shuffle(card_symbols);

    opened = [];

    moves = 0;
    moves_elem.textContent = moves;

    for(var j=0; j<cards.length; j++){
        flipback(cards[j]);
    }

    for(var i=0; i<card_holders.length; i++){

        if(card_holders[i].classList.length > 1){
            card_holders[i].classList.remove(card_holders[i].classList[1]);

        }
        card_holders[i].classList.add(random_cards[i]);
    }

    setTimeout(function(){
        timer.reset();
        timer.start();
    }, 500);
    //end_card.classList.add('flipped');
}


document.addEventListener("DOMContentLoaded", firstLoad(event));

refresh_btn.addEventListener("click", function(event){
    playAgain(event);
});

close_btn.addEventListener("click", function() {
    end_card.classList.remove('flipped');
});

play_again.addEventListener("click", function(event) {
    playAgain(event);
    end_card.classList.remove('flipped');
});



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
