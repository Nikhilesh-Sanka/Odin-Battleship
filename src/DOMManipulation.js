import {
  canShipBePlaced,
  extractCoordinates,
  getComputerChoice,
} from "./applicationLogic.js";

let form = document.querySelector("form");
let errorBox = document.querySelector("#error-box");

export function hideStartForm() {
  form.style.display = "none";
  errorBox.style.display = "none";
}

export function showBoardForSelection(chosenArray = [], playerName) {
  document.querySelector(
    "#game"
  ).innerHTML = `<p id="player-instructions">Place the cruiser ${playerName}</p>
                                            <div id="game-board"></div>
                                            <button id="player-board">Next</button>`;
  let gameBoard = document.querySelector("#game-board");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement("div");
      cell.className = `game-cell r${i} c${j}`;
      gameBoard.appendChild(cell);
    }
  }
  let ships = [
    { name: "cruiser", length: 5 },
    { name: "battleship", length: 4 },
    { name: "destroyer", length: 3 },
    { name: "submarine", length: 3 },
    { name: "patrol boat", length: 2 },
  ];
  let currentIndex = 0;
  function hoverFunctionality(event) {
    let coordinates = extractCoordinates(event.target.classList);
    if (canShipBePlaced(ships[currentIndex].length, coordinates, chosenArray)) {
      for (
        let i = coordinates[1];
        i < coordinates[1] + ships[currentIndex].length;
        i++
      ) {
        document
          .querySelector(`.r${coordinates[0]}.c${i}`)
          .classList.toggle("green");
      }
    } else {
      if (coordinates[1] + ships[currentIndex].length > 10) {
        for (let i = coordinates[1]; i < 10; i++) {
          document
            .querySelector(`.r${coordinates[0]}.c${i}`)
            .classList.toggle("red");
        }
      } else {
        for (
          let i = coordinates[1];
          i < coordinates[1] + ships[currentIndex].length;
          i++
        ) {
          document
            .querySelector(`.r${coordinates[0]}.c${i}`)
            .classList.toggle("red");
        }
      }
    }
  }
  function clickFunctionality(event) {
    let coordinates = extractCoordinates(event.target.classList);
    let shipCoordinates = [];
    if (canShipBePlaced(ships[currentIndex].length, coordinates, chosenArray)) {
      for (
        let i = coordinates[1];
        i < coordinates[1] + ships[currentIndex].length;
        i++
      ) {
        document
          .querySelector(`.r${coordinates[0]}.c${i}`)
          .classList.add("selected");
        shipCoordinates.push([coordinates[0], i]);
      }
      chosenArray.push(shipCoordinates);
      currentIndex++;
      if (currentIndex > 4) {
        document.querySelectorAll(".game-cell").forEach((cell) => {
          cell.removeEventListener("mouseover", hoverFunctionality);
          cell.removeEventListener("mouseleave", hoverFunctionality);
          cell.removeEventListener("click", clickFunctionality);
          document.querySelector(
            "#player-instructions"
          ).innerText = `${playerName} click "Next" button to proceed`;
        });
      } else {
        document.querySelector(
          "#player-instructions"
        ).innerText = `Place The ${ships[currentIndex].name} ${playerName}`;
      }
    }
  }
  document.querySelectorAll(".game-cell").forEach((cell) => {
    cell.addEventListener("mouseover", hoverFunctionality);
    cell.addEventListener("mouseleave", hoverFunctionality);
    cell.addEventListener("click", clickFunctionality);
  });
}

export function renderGameBoard(player, nextPlayer) {
  let game = document.querySelector("#game");
  let doesPlayerClick = false;
  game.innerHTML = `<p id="player-instructions"></p>
                  <div id="game-board"></div>
                  <button id="player-board">Next</button>`;
  document.querySelector(
    "#player-instructions"
  ).innerText = `It's your take ${nextPlayer.name} attack ${player.name}'s board`;
  updateBoard(player);
  function cellClickFunctionality(event) {
    let coordinates = extractCoordinates(event.target.classList);
    let attackVariable = player.gameBoard.receiveAttack(coordinates);
    let message;
    if (attackVariable[0] === "hit" || attackVariable[0] === "missed-hit") {
      message = `It's a ${attackVariable[0]} by ${nextPlayer.name}`;
    } else {
      message = `${nextPlayer.name} sank your ${attackVariable[1].name}`;
    }
    updateBoard(player);
    if (player.gameBoard.isGameOver()) {
      document.querySelector(
        "#player-instructions"
      ).innerText = `${nextPlayer.name}(${nextPlayer.type}) Wins`;
      gameOverFunctionality();
    } else {
      async function dummy() {
        document.querySelector("#player-instructions").innerText = message;
        let promise = await new Promise((resolve) => {
          setTimeout(() => {
            document.querySelector("#player-instructions").innerText =
              "Press next to continue";
            document
              .querySelector("#player-board")
              .addEventListener("click", () => {
                renderGameBoard(nextPlayer, player);
              });
          }, 2000);
        });
      }
      dummy();
    }
  }
  if (nextPlayer.type === "computer") {
    let coordinates = getComputerChoice(player.gameBoard);
    let attackVariable = player.gameBoard.receiveAttack(coordinates);
    let message;
    if (attackVariable[0] === "hit" || attackVariable[0] === "missed-hit") {
      message = `It's a ${attackVariable[0]} by ${nextPlayer.name}`;
    } else {
      message = `${nextPlayer.name} sank your ${attackVariable[1].name}`;
    }
    updateBoard(player);
    if (player.gameBoard.isGameOver()) {
      document.querySelector(
        "#player-instructions"
      ).innerText = `${nextPlayer.name}(${nextPlayer.type}) Wins`;
      gameOverFunctionality();
    } else {
      async function dummy() {
        document.querySelector("#player-instructions").innerText = message;
        let promise = await new Promise((resolve) => {
          setTimeout(() => {
            document.querySelector("#player-instructions").innerText =
              "Press next to continue";
            document
              .querySelector("#player-board")
              .addEventListener("click", () => {
                renderGameBoard(nextPlayer, player);
              });
          }, 2000);
        });
      }
      dummy();
    }
  } else {
    document.querySelectorAll(".game-cell").forEach((cell) => {
      if (
        !(
          cell.classList.contains("hit") ||
          cell.classList.contains("missed-hit")
        )
      ) {
        cell.addEventListener("click", cellClickFunctionality);
      }
    });
  }
}
function gameOverFunctionality() {
  async function dummy() {
    let promise = await new Promise((resolve) => {
      setTimeout(() => {
        document.querySelector("#player-instructions").innerText =
          "Game Over , Press Next To restart the game";
        document
          .querySelector("#player-board")
          .addEventListener("click", () => {
            document
              .querySelector("body")
              .dispatchEvent(new CustomEvent("restartGame"));
            resolve("promise completed");
          });
      }, 2000);
    });
  }
  dummy();
}
function updateBoard(player) {
  let gameBoard = document.querySelector("#game-board");
  gameBoard.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement("div");
      cell.className = `game-cell r${i} c${j}`;
      gameBoard.appendChild(cell);
    }
  }
  for (let sunkenShip of player.gameBoard.sunkenShips) {
    sunkenShip.coordinates.forEach((coord) => {
      document
        .querySelector(`.r${coord[0]}.c${coord[1]}`)
        .classList.add("sunk-ship");
    });
  }
  for (let hitCoordinate of player.gameBoard.hitCoordinates) {
    document
      .querySelector(`.r${hitCoordinate[0]}.c${hitCoordinate[1]}`)
      .classList.add("hit");
    document.querySelector(
      `.r${hitCoordinate[0]}.c${hitCoordinate[1]}`
    ).innerHTML = `<div></div>`;
  }
  for (let missedCoordinate of player.gameBoard.missedHits) {
    document
      .querySelector(`.r${missedCoordinate[0]}.c${missedCoordinate[1]}`)
      .classList.add("missed-hit");
    document.querySelector(
      `.r${missedCoordinate[0]}.c${missedCoordinate[1]}`
    ).innerHTML = `<div></div>`;
  }
}
