/*
 * Create a list that holds all of your cards
 */
var card_symbols =['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bomb','fa-bicycle','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bomb','fa-bicycle'];

/*
 * Auxiliary variable using provided DOM structure   

*/

var cards = document.getElementsByClassName("card");

var card_deck = document.getElementById("deck");

var card_holders = card_deck.getElementsByClassName('fa');

var refresh_btn = document.getElementById("refresh");

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

// Card flip function
function flip(elem){
   elem.classList.add('show');
   elem.classList.add('open');
}
//Card match function
function match(elem){
    var matched = document.getElementsByClassName('card');

    for(var a=0; a<matched.length; a++){
        console.log(matched[a].children[0].classList.item[1]);
        console.log(elem.children[0].classList);
        if(matched[a].children[0].classList.contains(elem.children[0].classList.item[1])){
            
            elem.classList.add('match');
            elem.classList.remove('open');
            matched[a].classList.add('match');
            matched[a].classList.remove('open');
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    var random_cards = shuffle(card_symbols);

    for(var i=0; i<card_holders.length; i++){

        console.log(card_holders[i].classList);

        if(card_holders[i].classList.length > 1){
           card_holders[i].classList.remove(card_holders.classList.item[1]);
        }

        card_holders[i].classList.add(random_cards[i]);
    }

    for(var c=0; c<cards.length; c++){
        cards[c].addEventListener("click", function(event) {
            console.log("card flipped!");
            flip(this);
            match(this);

        });
    }

});

refresh_btn.addEventListener("click", function(event) {
    var random_cards = shuffle(card_symbols);

    for(var h=0; h<card_holders.length; h++){
        if(card_holders[h].classList.length > 1){
            card_holders[h].classList.remove(card_holders.classList.item[1]);
        }

        card_holders[h].classList.add(random_cards[h]);
    }
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
