let playerOne = document.querySelector("#player-one-selection");
let playerOneName = document.querySelector("#player-one-name");
let playerTwo = document.querySelector("#player-two-selection");
let playerTwoName = document.querySelector("#player-two-name");
let errorBox = document.querySelector("#error-box");

async function printMessage(string) {
  errorBox.innerHTML = "";
  let currentChar = 0;
  while (currentChar < string.length) {
    let promise = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(string.split("")[currentChar]);
      }, 50);
    });
    errorBox.innerHTML += `<span>${promise}</span>`;
    currentChar++;
  }
}
function checkPlayerSelection() {
  if (playerOne.value === "computer" && playerTwo.value === "computer") {
    return false;
  }
  return true;
}
function checkPlayerName() {
  if (playerOneName.value === playerTwoName.value) {
    return false;
  }
  if (playerOneName.validity.valueMissing || playerTwo.validity.valueMissing) {
    return false;
  }
  return true;
}
export function getInputs() {
  if (!checkPlayerSelection()) {
    printMessage("It will be pretty boring to watch computers play");
    return;
  }
  if (!checkPlayerName()) {
    printMessage("Please enter correct names");
    return;
  }
  printMessage("Registration successful");
  return {
    playerOneName: playerOneName.value,
    playerOne: playerOne.value,
    playerTwoName: playerTwoName.value,
    playerTwo: playerTwo.value,
  };
}
