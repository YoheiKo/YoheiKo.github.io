//Challenge 1, Your Age in days
let ageInDays = () => {
    let birthYear = prompt("What year were you born good friend?");
    let ageInDayss = (2020 - birthYear)*365;

    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode(`Your are ${ageInDayss} days old.`)
    h1.setAttribute('id', 'ageinDays');
    h1.appendChild(textAnswer);
    document.getElementById('main__ch_1__result').appendChild(h1);
}

let reset = () => {
    document.getElementById('ageinDays').remove();
}

// CH 2

let generateCat = () => {
    let image = document.createElement('img');
    // image.setAttribute('src', 'http://thecatapi.com/api/images/get?format=src&type=gif&size=small');
    image.src= 'http://thecatapi.com/api/images/get?format=src&type=gif&size=small'
    document.querySelector('.main__ch_2_cats').appendChild(image);
}

// CH 3

// yourChoice has an access to the object
let rpsGame = (yourChoice) => {
    // console.log(yourChoice.id);
    let humanChoice, botChoice; // initialize
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt())

    // Decide the winner
    console.log("Human Choice: " + humanChoice);
    console.log("Bot Choice: " + botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    let message = finalMessage(results); // Return a dictionary { message: "You won", color: "green"}. We can color in the right way.
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);

} 

let randToRpsInt = () => {
    return Math.floor(Math.random()*3); // get a random number between 0, 1, and 2
}

let numberToChoice = (number) => {
    return ['rock', 'paper', 'scissors'][number];
}

let decideWinner = (yourChoice, comChoice) => {
    let rpsDatabase = {
        'rock': {'scissors':2, 'rock':1, 'paper':0},
        'paper': {'rock':2, 'paper':1, 'scissors':0},
        'scissors': {'paper':2, 'scissors':1, 'rock':0}
    };

    let yourScore = rpsDatabase[yourChoice][comChoice];
    let comScore = rpsDatabase[comChoice][yourChoice];

    return [yourScore,  comScore];
}

// 
let finalMessage = (results) => {
    let yourScore = results[0];
    
    if (yourScore === 0) {
        return {'message': 'You Lost', 'color': 'red'};
    } else if (yourScore === 1) {
        return {'message': 'You tied', 'color': 'black'};
    } else {
        return {'message': 'You won', 'color': 'green'}
    }
}

let rpsFrontEnd = (humanImageChoice, botImageChoice, finalMessage) => {
    let iamgesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    // create div
    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML = `<img src="${iamgesDatabase[humanImageChoice]}" class="main__ch_3__rps__each" style="box-shadow: 0px 10px 18px rgba(37,50,233,1)">`
    botDiv.innerHTML = `<img src="${iamgesDatabase[botImageChoice]}" class="main__ch_3__rps__each" style="box-shadow: 0px 10px 18px rgba(243, 38, 233, 1)">`
    messageDiv.innerHTML = `<h1 style="color:${finalMessage.color}; font-size:48px">${finalMessage.message}</h1>`
   
    document.getElementById('main__ch_3__rps_div').appendChild(humanDiv);
    document.getElementById('main__ch_3__rps_div').appendChild(messageDiv);
    document.getElementById('main__ch_3__rps_div').appendChild(botDiv);
    
    // style='color:${finalMessage.color}; font-size:60px; padding:30px'


}

let allButtons = document.getElementsByTagName('button');

let copyAllbuttons = [];

for (let i=0; i < allButtons.length; i++) {
    copyAllbuttons.push(allButtons[i].classList[1]);
}


let buttonColorChange = (buttonThingy) => {
    if (buttonThingy.value === 'red') {
        buttonRed();
    } else if (buttonThingy.value === 'green') {
        buttonGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

let buttonRed = () => {
    for (let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger')
    }
}


let buttonGreen = () => {
    for (let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

let buttonColorReset = () => {
    for (let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllbuttons[i]);
    }
}

let randomColors = () => {
    let choices = ["btn-primary", "btn-danger", "btn-warning", "btn-success"];
    for (let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }    
}

// Blackjack

let blackjackGame = {
    'you':{ 'scoreSpan': '#ch_5__field__your-box__result',
            'div': '#ch_5__field__your-box',
            'score': 0,
            'win':0,
            'cards_on_hand':[],
            'ace_flag':false,
            'ace_as_eleven':false},

    'bot':{ 'scoreSpan': '#ch_5__field__dealer-box__result',
            'div': '#ch_5__field__dealer-box',
            'score': 0,
            'win':0,
            'cards_on_hand':[],
            'ace_flag':false,
            'ace_as_eleven':false},

    'draw':{
            'win':0,
            },        

    'cards':['2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AS',
             '2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH','AH',
             '2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AD',
             '2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AC'],          
    
    'cardsMap':{'2S':2,'3S':3,'4S':4,'5S':5,'6S':6,'7S':7,'8S':8,'9S':9,'10S':10,'KS':10,'QS':10,'JS':10,'AS':[1,11],
             '2H':2,'3H':3,'4H':4,'5H':5,'6H':6,'7H':7,'8H':8,'9H':9,'10H':10,'KH':10,'QH':10,'JH':10,'AH':[1,11],
             '2D':2,'3D':3,'4D':4,'5D':5,'6D':6,'7D':7,'8D':8,'9D':9,'10D':10,'KD':10,'QD':10,'JD':10,'AD':[1,11],
             '2C':2,'3C':3,'4C':4,'5C':5,'6C':6,'7C':7,'8C':8,'9C':9,'10C':10,'KC':10,'QC':10,'JC':10,'AC':[1,11]},  
    
    'firstTime':true,
    'delivered':false,
    'stand':false,
    
    
    }                 

const YOU = blackjackGame.you;
const DEALER = blackjackGame.bot;   
const DRAW = blackjackGame.draw;
var CARDS = [...blackjackGame.cards];
const HitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lostSound = new Audio('static/sounds/aww.mp3');


let randomCard = (num) => {
    let randomIndex = Math.floor(Math.random()*num);
    return CARDS[randomIndex];
}


let removeItemOnce = (arr, value) => {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


let deliverCard_broken = () => {
    blackjackHit();
    blackjackHit();
    blackjackHit();
    blackjackHit();
}


let deliverCard = () => {
    if (blackjackGame['delivered'] === false){
    let card = randomCard(CARDS.length);
    showCard(card, YOU);
    updateScore(card,YOU);
    cardOnHand(card,YOU);
    showScore(YOU);
    removeItemOnce(CARDS, card);

    card = randomCard(CARDS.length);
    //showCard(card, DEALER);
    hideDownCard(DEALER);
    updateScore(card,DEALER);
    cardOnHand(card,DEALER);
    //showScore(DEALER);
    removeItemOnce(CARDS, card);

    card = randomCard(CARDS.length);
    showCard(card, YOU);
    updateScore(card,YOU);
    showScore(YOU);
    cardOnHand(card,YOU);
    removeItemOnce(CARDS, card);

    card = randomCard(CARDS.length);
    showCard(card, DEALER);
    updateScore(card,DEALER);
    cardOnHand(card,DEALER);
    //showScore(DEALER);
    removeItemOnce(CARDS, card);
    
    if (blackjackGame.firstTime === true){
    removeStart();
    blackjackGame.firstTime = false;    
    }

    blackjackGame['delivered'] = true;
    }

}

let removeStart = () => {
    document.querySelector('#blackjack-start-button').remove();
}

let deliverCard_nested = () => {
    setTimeout( () => {
        card = randomCard(CARDS.length);
        showCard(card, YOU);
        removeItemOnce(CARDS, card);
        setTimeout( () => {
            card = randomCard(CARDS.length);
            showCard(card, DEALER);
            removeItemOnce(CARDS, card);
            setTimeout( () => {
                card = randomCard(CARDS.length);
                showCard(card, YOU);
                removeItemOnce(CARDS, card);
                setTimeout( () => { 
                    card = randomCard(CARDS.length);
                    showCard(card, DEALER);
                    removeItemOnce(CARDS, card);
                },700);
            },700);
        },700);
    },50);
    }

let updateScore = (card, activePlayer) => {
    if ((card === 'AS') ||(card === 'AD') || (card === 'AH') || (card === 'AC')){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
            activePlayer['ace_as_eleven'] = true;
            //console.log(card);
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
            //console.log(card);
        }
    } else {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card] > 21){
            if ((activePlayer['cards_on_hand'].includes('AS') & activePlayer['ace_flag'] == false & activePlayer['ace_as_eleven'] == true)
                || (activePlayer['cards_on_hand'].includes('AD') & activePlayer['ace_flag'] == false & activePlayer['ace_as_eleven'] == true)
                || (activePlayer['cards_on_hand'].includes('AH') & activePlayer['ace_flag'] == false & activePlayer['ace_as_eleven'] == true)
                || (activePlayer['cards_on_hand'].includes('AC') & activePlayer['ace_flag'] == false & activePlayer['ace_as_eleven'] == true)
                ){
                    activePlayer['score'] += blackjackGame['cardsMap'][card] -10 ;
                    activePlayer['ace_flag'] = true;
                    } else {
                    activePlayer['score'] += blackjackGame['cardsMap'][card];
                    }
        } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    //console.log(card);
    }    
  }
}

let showButtons = () => {
    let buttonElement_1 = document.createElement('button');
    buttonElement_1.class = 'btn btn-primary mr-2';
    buttonElement_1.id = 'blackjack-hit-button';
    buttonElement_1.innerText = 'Hit';
    document.querySelector(".ch_5__field_2_buttons").appendChild(buttonElement_1);
    
    let buttonElement_2 = document.createElement('button');
    buttonElement_2.class = 'btn btn-info mr-2';
    buttonElement_2.id = 'blackjack-stand-button';
    buttonElement_2.innerText = 'Stand';
    document.querySelector(".ch_5__field_2_buttons").appendChild(buttonElement_2);
    
    let buttonElement_3 = document.createElement('button');
    buttonElement_3.class = 'btn btn-dark mr-2';
    buttonElement_3.id = 'blackjack-deal-button';
    buttonElement_3.innerText = 'Next';
    document.querySelector(".ch_5__field_2_buttons").appendChild(buttonElement_3);
}

let showScore = (activePlayer) => {
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer.score;

    }
}

let cardOnHand = (card,activePlayer) => {
    activePlayer['cards_on_hand'].push(card);
}

let blackjackHit = () => {
    if (blackjackGame.delivered === true) {
            if (YOU.score === 21) {
                alert("You marked 21! Do not hit anymore.");
            } else {
            card = randomCard(CARDS.length);
            showCard(card, YOU);
            removeItemOnce(CARDS, card);
            updateScore(card,YOU);
            cardOnHand(card,YOU);
            //console.log(YOU['cards_on_hand']);
            //console.log(YOU.score);
            showScore(YOU);
            } 
        } else {
            alert("Push start to begin");
        }
}

let showCard = (card, activePlayer) => {
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/52_images/cards_png_zip/PNG/${card}.png`;
        document.querySelector(activePlayer.div).appendChild(cardImage);
        HitSound.play();
    }
}

let hideDownCard = (activePlayer) => {
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = 'static/images/52_images/cards_png_zip/PNG/others/red_back.png';
        document.querySelector(activePlayer.div).appendChild(cardImage);
        HitSound.play();
    }

}

let showDealerDownCard = () => {
    if (blackjackGame.delivered === true && blackjackGame.stand === false){
    let dealerImages = document.querySelector('#ch_5__field__dealer-box').querySelectorAll('img');
    dealerImages[0].remove();

    let card = DEALER.cards_on_hand[0];
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/52_images/cards_png_zip/PNG/${card}.png`;
    let parent = document.querySelector(DEALER.div);
    parent.insertBefore(cardImage,parent.children[1]);
    HitSound.play();
    seventeen(DEALER);
    //document.querySelector(DEALER['scoreSpan']).textContent = DEALER.score;
    
    // update table
    let winner = computeWInner();
    winnerTable(winner);    
    showResult(winner);
    blackjackGame.stand = true;

    } else {
        alert("Press Start or Next to begin");
    }

}

let seventeen = (activePlayer) => {
    if (activePlayer.score <= 16){
        while (activePlayer.score <= 17) {
            card = randomCard(CARDS.length);
            showCard(card, activePlayer);
            updateScore(card,activePlayer);
            cardOnHand(card,activePlayer);
            showScore(activePlayer);
            removeItemOnce(CARDS, card);
        }
    } else {
            showScore(activePlayer);
    }
}

let showResult = (winner) => {
    let message, messageColor;

    if (winner === YOU) {
        message = 'You won !';
        messageColor = "black";
        winSound.play();
    } else if (winner === DEALER) {
        message = 'You lost';
        messageColor = 'black';
        //lostSound.play();
    } else {
        message = 'You drew';
        messageColor = 'black';
    }

    document.querySelector("#ch5_blackjack-result").textContent = message;
    document.querySelector("#ch5_blackjack-result").style.color = messageColor;

}

let computeWInner = () =>{
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            //console.log('You won!');
            winner = YOU;

        }  else if (YOU['score'] < DEALER['score']){
            // console.log('You lost');
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']){
            // console.log('You drew');
            winner = DRAW;
        }
    
    // You bust
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        //console.log('You lost');
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21){
        //console.log('You drew');
        winner = DRAW;
    }
    //console.log(`winner is ${winner}`);
    return winner;
}

let winnerTable = (winner) => {
    let t = document.querySelector('#ch_5__field__table');
    let d = t.getElementsByTagName('tr')[1];
    let d2 = t.getElementsByTagName('tr')[2];

    switch(winner) {
        case YOU:
            YOU.win += 1;
            d.getElementsByTagName('td')[1].innerText = YOU.win; 
            d2.getElementsByTagName('td')[1].innerText = Math.floor(YOU.win/(YOU.win + DEALER.win)*100) + '%'; 
            d2.getElementsByTagName('td')[2].innerText = Math.floor(DEALER.win/(YOU.win + DEALER.win)*100) + '%'; 
            break;
        case DEALER:
            DEALER.win += 1;
            d.getElementsByTagName('td')[2].innerText = DEALER.win; 
            d2.getElementsByTagName('td')[2].innerText = Math.floor(DEALER.win/(YOU.win + DEALER.win)*100) + '%'; 
            d2.getElementsByTagName('td')[1].innerText = Math.floor(YOU.win/(YOU.win + DEALER.win)*100) + '%'; 
            break;
        case DRAW:
            DRAW.win += 1;        
            d.getElementsByTagName('td')[3].innerText = DRAW.win; 
    }

}

let blackjackDeal = () => {
    if (blackjackGame.stand === true){
    let yourImages = document.querySelector('#ch_5__field__your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#ch_5__field__dealer-box').querySelectorAll('img');
    for (let i=0; i < yourImages.length; i++){
        yourImages[i].remove();
    }
    
    for (let i=0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
    CARDS = [];
    CARDS = [...blackjackGame.cards];


    //console.log(YOU['score']);

    // reset
    YOU['score'] = 0;
    YOU['cards_on_hand'] = [];
    YOU['ace_flag'] = false;
    YOU['ace_as_eleven'] = false;
    DEALER['score'] = 0;
    DEALER['cards_on_hand'] = [];
    DEALER['ace_flag'] = false;
    DEALER['ace_as_eleven'] = false;
    blackjackGame.delivered = false;
    blackjackGame.stand = false;

    showScore(YOU);
    document.querySelector(DEALER['scoreSpan']).textContent = "-";
    
    document.querySelector(YOU['scoreSpan']).style.color = 'white';
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';
    
    document.querySelector("#ch5_blackjack-result").textContent = "Let's play";
    document.querySelector("#ch5_blackjack-result").style.color = "black";
    
    // start
    deliverCard();
    } else {
        alert("Press stand before going to the next game")
    }
}

document.querySelector('#blackjack-start-button').addEventListener('click', deliverCard);
document.querySelector('#blackjack-stand-button').addEventListener('click', showDealerDownCard);
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
