let form = document.querySelector("form");
let errorBox = document.querySelector("#error-box");

export function hideStartForm() {
  form.style.display = "none";
  errorBox.style.display = "none";
}
