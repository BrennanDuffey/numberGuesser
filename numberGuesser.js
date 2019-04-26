var min = document.querySelector('.min');
var max = document.querySelector('.max');
var minInput = document.querySelector('.min-input');
var maxInput = document.querySelector('.max-input');
var challengerNameOneInput = document.querySelector('.challenger-1-name-input');
var challengerNameTwoInput = document.querySelector('.challenger-2-name-input');
var challengerOneGuessInput = document.querySelector('#challenger-1-guess-input');
var challengerTwoGuessInput = document.querySelector('#challenger-2-guess-input');
var cardContainer = document.querySelector('.column-2');
var guessBox = document.querySelector('.guess-box')
var updateButton = document.querySelector('.update');
var submitButton = document.querySelector('.submit-button');
var clearButton = document.querySelector('.clear-button');
var resetButton = document.querySelector('.reset-button');
var numGuesses = 0;
var randomNumber;


updateButton.addEventListener('click', updateRange, disableReset);
submitButton.addEventListener('click', submitInfo);
clearButton.addEventListener('click', clearInput);
resetButton.addEventListener('click', resetGame);
guessBox.addEventListener('keyup', disableClear, disableReset);
cardContainer.addEventListener('click', deleteCard)

disableClear()
disableReset()

function disableReset() {
  if (randomNumber !== undefined) {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
    generateRandomNumber()
  }
}

function disableClear() {
  if (challengerNameOneInput.value === '' && challengerNameTwoInput.value === '' && challengerOneGuessInput.value === '' && challengerTwoGuessInput.value === '') {
    clearButton.disabled = true;
  } else {
    clearButton.disabled = false;
  }
}

function updateRange() {
  generateRandomNumber ();
  console.log(randomNumber);
  inputErrorMessages ();
  disableReset()
};


function submitInfo() {
  numGuesses++;
  latestScoreText();
  playerFeedback();
  submitErrorMessages();
};

challengerNameOneInput.addEventListener('keydown', nonAlphaNumericInput);
challengerNameTwoInput.addEventListener('keydown', nonAlphaNumericInput);


function nonAlphaNumericInput(event) {
  var regEx = /\W/;
  if (regEx.test(event.key)) {
    event.preventDefault();
  }
}

function generateRandomNumber () {
  min.innerText = minInput.value || '1';
  max.innerText = maxInput.value || '100';
  var minInteger = Math.ceil(parseInt(minInput.value,10));
  var maxInteger = Math.floor(parseInt(maxInput.value,10));
  randomNumber = Math.floor(Math.random() * (maxInteger - minInteger + 1)) + minInteger;
};

function inputErrorMessages () {
  var minMoreMax = document.querySelector('#min-more-max')
  var noRange = document.querySelector('#no-range');

  if (minInput.value === '' || maxInput.value === '') {
    noRange.classList.remove('error-message');
  } else {
    noRange.classList.add('error-message');
  }

  if (parseInt(maxInput.value) < parseInt(minInput.value)) {
    minMoreMax.classList.remove('error-message');
  } else {
    minMoreMax.classList.add('error-message');
  }

//DOES NOT WORK CORRECTLY
  var inputRangeError = document.querySelector('#input-range-error');
  if (parseInt(minInput.value) === false) {
    inputRangeError.classList.remove('error-message');
  } else {
    inputRangeError.classList.add('error-message');
  }

  if (parseInt(maxInput.value) === false) {
    inputRangeError.classList.remove('error-message');
  } else {
    inputRangeError.classList.add('error-message');
  }
};

function latestScoreText() {
  var challengerNameOne = document.querySelector('.challenger-1-name');
  var challengerNameTwo = document.querySelector('.challenger-2-name');
  var challengerOneGuess = document.querySelector('.challenger-1-guess');
  var challengerTwoGuess = document.querySelector('.challenger-2-guess');
  challengerNameOne.innerText = challengerNameOneInput.value;
  challengerNameTwo.innerText = challengerNameTwoInput.value;
  challengerOneGuess.innerText = challengerOneGuessInput.value;
  challengerTwoGuess.innerText = challengerTwoGuessInput.value;
};

function playerFeedback(){
  var challengerOneConditional = document.querySelector('.challenger-1-conditional');
  var challengerTwoConditional = document.querySelector('.challenger-2-conditional');

  if (parseInt(challengerOneGuessInput.value) > randomNumber) {
    challengerOneConditional.innerText = 'That\'s Too High'
  } else if (parseInt(challengerOneGuessInput.value) == randomNumber) {
    challengerOneConditional.innerText = 'BOOM!'
    changeRangeOnWin();
    pOneWinCard();
  } else {
    challengerOneConditional.innerText = 'That\'s Too Low'
  };

  if (parseInt(challengerTwoGuessInput.value) > randomNumber) {
    challengerTwoConditional.innerText = 'That\'s Too High';
  } else if (parseInt(challengerTwoGuessInput.value) == randomNumber) {
    challengerTwoConditional.innerText = 'BOOM!';
    changeRangeOnWin();
    pTwoWinCard();
  } else {
    challengerTwoConditional.innerText = 'That\'s Too Low'
  }
};


function submitErrorMessages() {
  var errorMessageGuessOne = document.querySelector('.error-message-guess-one');
  var errorMessageGuessTwo = document.querySelector('.error-message-guess-two');
  var noSubmit = document.querySelectorAll('.no-submit');
  console.log(noSubmit);

  if (parseInt(challengerOneGuessInput.value) < parseInt(minInput.value) || parseInt(challengerOneGuessInput.value) > parseInt(maxInput.value)) {
    errorMessageGuessOne.classList.remove('error-message-guess-one')
  } else {
    errorMessageGuessOne.classList.add('error-message-guess-one')
  }

  if (parseInt(challengerTwoGuessInput.value) < parseInt(minInput.value) || parseInt(challengerTwoGuessInput.value) > parseInt(maxInput.value)) {
    errorMessageGuessTwo.classList.remove('error-message-guess-two')
  } else {
    errorMessageGuessTwo.classList.add('error-message-guess-two')
  }


  for (var i = 0; i < noSubmit.length; i++){
    if (noSubmit[i].value === ''){
      console.log(noSubmit[i].parentElement.nextElementSibling);
      noSubmit[i].parentElement.nextElementSibling.classList.remove('error-message');
    } else {
      noSubmit[i].parentElement.nextElementSibling.classList.add('error-message')
    }
  }
}

function clearInput() {
  challengerNameOneInput.value = '';
  challengerNameTwoInput.value = '';
  challengerOneGuessInput.value = '';
  challengerTwoGuessInput.value = '';
  disableClear();
}

function resetGame() {
  numGuesses = 0;
  challengerNameOneInput.value = '';
  challengerNameTwoInput.value = '';
  challengerOneGuessInput.value = '';
  challengerTwoGuessInput.value = '';
  generateRandomNumber();
}

function changeRangeOnWin(){
  var newMin;
  if (min.innerText <= 10) {
    newMin = 1;
  } else {
    newMin = parseInt(min.innerText) - 10;
  }
  var newMax = parseInt(max.innerText) + 10;
  min.innerText = newMin;
  max.innerText = newMax;
  randomNumber = Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
}

function pOneWinCard() {
  cardContainer.innerHTML += `
  <article>
    <div class='card'>
      <h4>${challengerNameOneInput.value}</h4>
      <p>vs</p>
      <h4>${challengerNameTwoInput.value}</h4>
    </div>
    <hr />
    <div class='middle-row'>
      <h2 class='winner'><strong>${challengerNameOneInput.value}</strong></h2>
      <br />
      <p class='winner2'>WINNER</p>
    </div>
    <hr />
    <div class='card'>
      <p><strong>#</strong> ${numGuesses}</p>
      <p><strong>00</strong>MINUTES}</p>
      <button class='exit'>X</button>
    </div>
  </article>`
  numGuesses = 0;
};

function pTwoWinCard() {
  cardContainer.innerHTML += `
  <article>
    <div class='card'>
      <h4>${challengerNameOneInput.value}</h4>
      <p>vs</p>
      <h4>${challengerNameTwoInput.value}</h4>
    </div>
    <hr />
    <div class='middle-row'>
      <h2 class='winner'><strong>${challengerNameTwoInput.value}</strong></h2>
      <br />
      <p class='winner2'>WINNER</p>
    </div>
    <hr />
    <div class='card'>
      <p><strong>#</strong> ${numGuesses}</p>
      <p><strong>00</strong>MINUTES}</p>
      <button class='exit'>X</button>
    </div>
  </article>`
  numGuesses = 0;
};

function deleteCard(e) {
  if (e.target.className === 'exit') {
    e.target.parentElement.parentElement.remove()
  }
}
