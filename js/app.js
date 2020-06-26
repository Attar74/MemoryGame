/*******************************************  Requirments  **********************************************/

/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


let icons = ["fa fa-paper-plane-o", "fa fa-paper-plane-o",           // Collect All Cards in an array
               "fa fa-bicycle", "fa fa-bicycle", 
               "fa fa-cube", "fa fa-cube", 
               "fa fa-diamond", "fa fa-diamond", 
               "fa fa-bolt", "fa fa-bolt",
               "fa fa-bomb", "fa fa-bomb",
               "fa fa-leaf","fa fa-leaf",
               "fa fa-anchor", "fa fa-anchor"],
    container = document.querySelector('.deck'),                   //  obtain th ul to use it for inserting <li>s
    ShuffleCards = shuffle(icons),                                  //  obtain cards after shuflling
    openedcards = [],                                               // Array for collecting the opened cards
    matchedCards = [],                                              // Array for collecting the matched cards
    i;                                                              // Counter to loop at all icons 

// Create the cards
function init() {
    for(i in ShuffleCards) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = "<i class='" +ShuffleCards[i] +"'> </i>" ;
        container.append(card);
        click(card);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {                                         // Shuffle function 
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

// what hapeened when card clicked
function click(card) {
        
        card.addEventListener('click',function() {  // card click Event
        changeState();                          //start timer
        const currentCard = this,               //obtain the clicked card
        previousCard = openedcards[0];
            
        if(openedcards.length === 1) {                     //if we have an exiciting opened car
            card.classList.add('open','show','disabled');  //make the clicked card opened and disable to click it again
            openedcards.push(this);                        //add it to opencards array
            compare(currentCard,previousCard);             //compare between the 2 opened cards using compare func
        } else {
        currentCard.classList.add('open','show','disabled'); //if we don't have any opened card
        openedcards.push(this);
        }
    });
}

function isOver() {                                          //Check if all card r opened or not 

    if(matchedCards.length === icons.length) {
        active = false;                                      //stop counter
        swal({                                               //Pop Up Msg After finishing Using sweet alert
            title:"AWESOME U DID IT",
            text: "With " + (move+1) + " moves, " +my_timer.textContent+" Seconds & "+ nStars,
            type: "success",
            confirmButtonText: "improve your rank",
            confirmButtonColor: "#0ad3c1"
        }).then(function(cof) {                             //action on pop up msg
            if (cof) {
                improve();                                  //reset the game
            }
        })
    }
}

function improve() {                                         //function of the improve button which appear when game over
    resetTimer();
    container.innerHTML ="";
    matchedCards = [];
    init();
    move = 0;
    mov.textContent = move;
    stars.innerHTML = `<li><i class="fa fa-star" id="first"></i></li>
        <li><i class="fa fa-star" id="second"></i></li> <li><i class="fa fa-star" id="second"></i></li>`;
};

function compare (currentCard,previousCard) {                        //Comparison func
    if(currentCard.innerHTML === previousCard.innerHTML) {           //matched condition
        currentCard.classList.add('match');
        previousCard.classList.add('match');
        openedcards = [];                                            //reset the opened card array to receive next 2 cards
        matchedCards.push(currentCard);                              //Adding the two matched cards to matchedCards array to check isOver
        matchedCards.push(previousCard);
        isOver();
    } else {
        setTimeout(function() {                                     //Unmatched condition
            currentCard.classList.remove('open','show','disabled'); //flap it and make it avaliable to click again
            previousCard.classList.remove('open','show','disabled');
        },150);
        openedcards = [];
    }
    moves();                                                        //increase a move
}

const btn =document.querySelector('.restart');
btn.addEventListener('click',reset);                              //Restart Func
function reset() {
    active = false;                                      //stop counter
    //resetTimer();
   // container.innerHTML ="";                                     //remove all Lis
   // matchedCards = [];                                           //reset matched array
  //  init();                                                      //play func
   // move = 0;                                                    //reset moves
  //  mov.textContent = move;                                     //add move to it's div
  //  stars.innerHTML = `<li><i class="fa fa-star" id="first"></i></li> <li><i class="fa fa-star" id="second"></i></li> <li><i class="fa fa-star" id="second"></i></li>`;
        swal({                                        //Pop Up Msg After restartin button clicking Using sweet alert
          showCancelButton: true,
          title: "Are you sure?",
          text: "warning, You will end your progress!",
          type: "warning",
          confirmButtonText: "Yes, Restart Game",
          confirmButtonColor: "#07dac7",
          cancelButtonColor: "#f94f2e"
        }).then(function(cof) {
          if (cof) {
            improve();                              //reset the game
        }
        })
};

let move = 0;
const mov = document.querySelector('.moves');
mov.textContent = 0;
function moves() {                                     //track moves
    move++;
    mov.textContent = move;
    starRate();
}
let stars= document.querySelector('.stars'),           //Creating the empty star to exchange it whith the full ones
    nStars = 'three Stars';
const Estar = document.createElement('li');
      Estar_E = document.createElement('i');
      Estar_E.classList.add('fa');
      Estar_E.classList.add('fa-star-o');
      Estar.style.marginRight = '1px';
      Estar.style.marginLrft = '1px';
      Estar.append(Estar_E);
      Fstar = `<li><i class="fa fa-star" id="first"></i></li>`;

function starRate() {                                              //change star rate 
    
   /* if( move < 15 && move > 10) {                               //usin if condition
        stars.innerHTML = `<li><i class="fa fa-star" id="first"></i></li> <li><i class="fa fa-star" id="second"></i></li> <li><i class="fa fa-star-o" style="font-size:15px"></i></li>`;
    } else if(move > 15 && move < 20) {
        stars.innerHTML = `<li><i class="fa fa-star" id="first"></i></li> <li><i class="fa fa-star-o" style="font-size:15px"></i></li> <li><i class="fa fa-star-o" style="font-size:15px"></i></li>`;
    } else if(move > 20) {
        stars.innerHTML = `<li><i class="fa fa-star-o" style="font-size:15px"></i></li> <li><i class="fa fa-star-o" style="font-size:15px"></i></li> <li><i class="fa fa-star-o" style="font-size:15px"></i></li>`;
    } */

    switch(move) {                                                //using switch to exchange empty stars with full ones
        case 10:
                stars.firstElementChild.remove();
                stars.append(Estar);
                nStars = 'two Stars';
            break;
        case 15:
                stars.firstElementChild.remove();
                stars.append(Estar.cloneNode(true));
                nStars = "one Star";
            break;
        case 20:
                stars.firstElementChild.remove();
                stars.append(Estar.cloneNode(true));
                nStars = "No Stars";
            break;
    }
}

var active = false;                         // we need a boolean var to track our timer state

function changeState() {                    //we need func to change state of time
    if(active == false) {
        active = true;
        start_timer();
    }
}

function resetTimer(){   // and finally our reset function 
    document.getElementById('my_timer').innerHTML = 0;
}
//now our main func 
function start_timer() {
    //so this function will go if active is true
    if(active){
       var timer = document.getElementById('my_timer').innerHTML;
        var time = timer;
        if(time >= 0) {
            time++
        }
        // update html
        document.getElementById('my_timer').innerHTML = time;
        setTimeout(start_timer, 1000); //kep rpeating with speed of 1 sec        
        }
}

init();





