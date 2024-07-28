import { getInputs } from "./formValidation";
import { hideStartForm } from "./DOMManipulation";
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
  }
});
