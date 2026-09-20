import "./style.css";
import rockIcon from "./icons/rock.svg";
import paperIcon from "./icons/paper.svg";
import scissorsIcon from "./icons/scissors.svg";

const response = await fetch("https://jsonplaceholder.typicode.com/users");
const data = await response.json();

const resultText = document.querySelector("#result-text");
const choices = document.querySelectorAll(".choice");
const playerChoice = document.querySelector("#player-choice");
const computerChoiceElement = document.querySelector("#computer-choice");
const resetButton = document.querySelector("#reset-game");
const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");

const options = ["rock", "paper", "scissors"];

const icons = {
  rock: rockIcon,
  paper: paperIcon,
  scissors: scissorsIcon,
};

let playerScore = 0;
let computerScore = 0;
let isPlaying = false;

resetButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;

  playerChoice.innerHTML = "❔";
  computerChoiceElement.innerHTML = "❔";
  resultText.textContent = "Make your move";

  resultText.classList.remove("result-pop");

  choices.forEach((button) => {
    button.classList.remove("scale-105", "ring-2", "ring-cyan-400");
  });
});

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (isPlaying) return;

    isPlaying = true;

    const playerChoiceValue = choice.dataset.choice;

    choices.forEach((button) => {
      button.classList.remove("scale-105", "ring-2", "ring-cyan-400");
    });

    choice.classList.add("scale-105", "ring-2", "ring-cyan-400");

    playerChoice.innerHTML = `
      <img
        src="${icons[playerChoiceValue]}"
        alt="${playerChoiceValue}"
        class="mx-auto h-12 w-12 object-contain sm:h-20 sm:w-20"
      />
    `;

    computerChoiceElement.innerHTML = `
      <span class="quick-pulse">❔</span>
    `;

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      const computerChoice = options[randomIndex];

      computerChoiceElement.innerHTML = `
        <img
          src="${icons[computerChoice]}"
          alt="${computerChoice}"
          class="mx-auto h-12 w-12 object-contain sm:h-20 sm:w-20"
        />
      `;

      resultText.classList.remove("result-pop");
      void resultText.offsetWidth;
      resultText.classList.add("result-pop");

      if (playerChoiceValue === computerChoice) {
        resultText.textContent = "Draw";
      } else if (
        (playerChoiceValue === "rock" && computerChoice === "scissors") ||
        (playerChoiceValue === "paper" && computerChoice === "rock") ||
        (playerChoiceValue === "scissors" && computerChoice === "paper")
      ) {
        resultText.textContent = "Player wins";
        playerScore++;
        playerScoreElement.textContent = playerScore;
      } else {
        resultText.textContent = "Computer wins";
        computerScore++;
        computerScoreElement.textContent = computerScore;
      }

      isPlaying = false;
    }, 1000);
  });
});
