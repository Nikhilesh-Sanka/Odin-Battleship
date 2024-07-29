import { getInputs } from "./formValidation";
import {
  hideStartForm,
  showBoardForSelection,
  renderGameBoard,
} from "./DOMManipulation";
import { Player } from "./objects.js";
import { getComputerBoardSelection } from "./applicationLogic.js";
import "./styles.css";

let startBtn = document.querySelector("form button");

startBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  let playerDetails = getInputs();
  if (playerDetails) {
    await new Promise((resolve) => {
      setTimeout(() => {
        hideStartForm();
        resolve();
      }, 2000);
    });
    function game() {
      if (playerDetails.playerTwo === "computer") {
        let chosenArray = [];
        showBoardForSelection(chosenArray, playerDetails.playerOneName);
        document
          .querySelector("#player-board")
          .addEventListener("click", () => {
            if (chosenArray.length === 5) {
              let playerOne = new Player(
                playerDetails.playerOneName,
                "human",
                ...chosenArray
              );
              let playerTwo = new Player(
                playerDetails.playerTwoName,
                "computer",
                ...getComputerBoardSelection()
              );
              renderGameBoard(playerTwo, playerOne);
              document
                .querySelector("body")
                .addEventListener("restartGame", game);
            }
          });
      } else {
        let chosenArrayOne = [];
        showBoardForSelection(chosenArrayOne, playerDetails.playerOneName);
        document
          .querySelector("#player-board")
          .addEventListener("click", () => {
            if (chosenArrayOne.length === 5) {
              let playerOne = new Player(
                playerDetails.playerOneName,
                "human",
                ...chosenArrayOne
              );
              console.log(playerOne);
              let chosenArrayTwo = [];
              showBoardForSelection(
                chosenArrayTwo,
                playerDetails.playerTwoName
              );
              document
                .querySelector("#player-board")
                .addEventListener("click", () => {
                  if (chosenArrayTwo.length === 5) {
                    let playerTwo = new Player(
                      playerDetails.playerTwoName,
                      "human",
                      ...chosenArrayTwo
                    );
                    renderGameBoard(playerTwo, playerOne);
                    document
                      .querySelector("body")
                      .addEventListener("restartGame", game);
                  }
                });
            }
          });
      }
    }
    game();
  }
});
