'use strict';
// ===== Elements ==============================================
const elementPlayer0 = document.querySelector('.player--0');
const elementPlayer1 = document.querySelector('.player--1');
const elementScore0 = document.querySelector('#score--0');
const elementScore1 = document.querySelector('#score--1');
const elementCurrentScore0 = document.querySelector('#current--0');
const elementCurrentScore1 = document.querySelector('#current--1');
const elementDice = document.querySelector('.dice');

// === Buttons
const elementButtonNew = document.querySelector('.btn--new');
const elementButtonRoll = document.querySelector('.btn--roll');
const elementButtonHold = document.querySelector('.btn--hold');

// ===== Initial ===============================================
let arrayPlayerScores, stateCurrentScore, stateActivePlayer, stateIsPlaying;

const setInitialState = () => {
  arrayPlayerScores = [0, 0];
  stateCurrentScore = 0;
  stateActivePlayer = 0;
  stateIsPlaying = true;

  elementScore0.textContent = 0;
  elementScore1.textContent = 0;
  elementDice.classList.add('hidden');
  elementPlayer0.classList.remove('player--winner');
  elementPlayer1.classList.remove('player--winner');
  elementPlayer0.classList.add('player--active');
  elementPlayer1.classList.remove('player--active');
};

const switchPlayer = () => {
  document.querySelector(`#current--${stateActivePlayer}`).textContent = 0;
  stateActivePlayer = stateActivePlayer === 0 ? 1 : 0;
  stateCurrentScore = 0;
  elementPlayer0.classList.toggle('player--active');
  elementPlayer1.classList.toggle('player--active');
};

setInitialState();

// === Rolling dice functionality
elementButtonRoll.addEventListener('click', function () {
  if (stateIsPlaying) {
    // 1. Generating random dice roll
    const numberDice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    elementDice.classList.remove('hidden');
    elementDice.src = `dice-${numberDice}.png`;

    // 3. Check for rolled 1
    if (numberDice !== 1) {
      // Add
      stateCurrentScore += numberDice;
      document.querySelector(`#current--${stateActivePlayer}`).textContent =
        stateCurrentScore;
    } else {
      // Switch
      switchPlayer();
    }
  }
});

// === Holding dice functionality
elementButtonHold.addEventListener('click', function () {
  if (stateIsPlaying) {
    // 1. Add Current Score to Active Player's Score
    arrayPlayerScores[stateActivePlayer] += stateCurrentScore;
    document.querySelector(`#score--${stateActivePlayer}`).textContent =
      arrayPlayerScores[stateActivePlayer];

    // 2. Check if Active Player's Score is >= 100
    if (arrayPlayerScores[stateActivePlayer] >= 100) {
      stateIsPlaying = false;
      elementDice.classList.add('hidden');
      document
        .querySelector(`.player--${stateActivePlayer}`)
        .classList.remove('player-active');
      document
        .querySelector(`.player--${stateActivePlayer}`)
        .classList.add('player--winner');
    }
    switchPlayer();
  }
});

elementButtonNew.addEventListener('click', setInitialState);
