// Get all necessary DOM nodes
const images = Array.from(document.querySelectorAll('.card-image'));
const message = document.querySelector('.message');
const scorePlayer = document.querySelector('.player-score');
const scoreComputer = document.querySelector('.computer-score');
const selectionPlayer = document.querySelector('.player-selection');
const selectionComputer = document.querySelector('.computer-selection');

let playerScore = 0;
let computerScore = 0;

// starting conditions

images.forEach((image) =>
  image.addEventListener('click', () => {
    if (playerScore >= 5 || computerScore >= 5) {
      return;
    }
    game(image.dataset.image);
  })
);

// Game

function getComputerSelection() {
  let computerNumber = random(3);
  let computerGuess = '';

  switch (computerNumber) {
    case 1:
      computerGuess = 'Rock';
      break;
    case 2:
      computerGuess = 'Paper';
      break;
    case 3:
      computerGuess = 'Scissors';
      break;
    default:
      break;
  }

  return computerGuess;
}

function playRound(playerSelection, computerSelection) {
  let log = '';

  if (playerSelection === 'Rock') {
    if (computerSelection === 'Paper') {
      log = 'You Lose! I wrapped your stone! It was very beautiful, where did you find it?';
    } else if (computerSelection === 'Scissors') {
      log = 'You Win! And broke my scissors! How am I gonna cut out a loser crown for you?';
    } else {
      log = "It's a tie. Cool, we built a tower, but we played a different game...";
    }
  } else if (playerSelection === 'Paper') {
    if (computerSelection === 'Scissors') {
      log = 'You Lose! Loooooser looooser nia nia nia! Great, now I’m gonna cut out your loser crown!';
    } else if (computerSelection === 'Rock') {
      log = 'You Win! Bravooo, you did it! Now give me back my rock';
    } else {
      log = "It's a tie... Why are you repeating after me?";
    }
  } else if (playerSelection === 'Scissors') {
    if (computerSelection === 'Rock') {
      log = 'You Lose! Loooooser looooser nia nia nia! Rock smashed the scissors.';
    } else if (computerSelection === 'Paper') {
      log = 'You Win! Bravoooo you made it! Scissors cut through paper and made it look like an ugly origami swan';
    } else {
      log = "It's a tie";
    }
  }

  return log;
}

function createParagWithText(text) {
  const p = document.createElement('p');
  p.textContent = text;

  return p;
}

function game(playerSelect) {
  let playerSelection = capitalize(playerSelect);
  let computerSelection = getComputerSelection();

  let roundResult = playRound(playerSelection, computerSelection);

  if (roundResult.search('You Win!') > -1) {
    playerScore++;
  } else if (roundResult.search('You Lose!') > -1) {
    computerScore++;
  }

  scorePlayer.textContent = playerScore;
  scoreComputer.textContent = computerScore;
  message.textContent = roundResult;
  selectionPlayer.appendChild(createParagWithText(playerSelection));
  selectionComputer.appendChild(createParagWithText(computerSelection));

  if (playerScore >= 5 && computerScore < 5) {
    message.textContent = 'Okay, you win, now you can have your bag of flies. But know I’m upset...';
  } else if (playerScore < 5 && computerScore >= 5) {
    message.textContent = 'Ha ha ha, I’ve beaten you!! Everyone now get away from me, I don’t want you to look at my flies!';
  }
}


function random(number) {
  return Math.floor(Math.random() * number + 1);
}

function capitalize(string) {
  return (
    string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
  );
}

