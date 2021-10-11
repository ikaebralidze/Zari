'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const firstPlayerScore = document.querySelector('#current--0');
const secondPlayerScore = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const overlay = document.querySelector('.overlay');
// buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnInst = document.querySelector('.instruction');
const btnX = document.querySelector('.btnx');
const instPop = document.querySelector('.inst-popup');

score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
//functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const rollingDice = function () {
  if (playing) {
    // 1. random dice
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      //add dice to curent score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //swich player
      switchPlayer();
    }
  }
};

const holdbutton = function () {
  if (playing) {
    // 1. Add curent score to actvie player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(scores[activePlayer]);
    // 2. check player if it >=100
    if (scores[activePlayer] >= 100) {
      //finish the game

      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // 3. change player
      switchPlayer();
    }
  }
};

btnRoll.addEventListener('click', rollingDice);

btnHold.addEventListener('click', holdbutton);

btnNew.addEventListener('click', function () {
  playing = true;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  firstPlayerScore.textContent = 0;
  secondPlayerScore.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});

document.addEventListener('keydown', function (e) {
  if (e.key === ' ') {
    rollingDice();
  } else if (e.key === 'Enter') {
    holdbutton();
  }
});

btnInst.addEventListener('click', function () {
  instPop.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

btnX.addEventListener('click', function () {
  instPop.classList.add('hidden');
  overlay.classList.add('hidden');
});

overlay.addEventListener('click', function () {
  instPop.classList.add('hidden');
  overlay.classList.add('hidden');
});
