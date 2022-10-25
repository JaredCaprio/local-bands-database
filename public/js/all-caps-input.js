const hiddenInput = document.querySelector("[data-hidden-all-caps]");
const artistInput = document.querySelector("[data-name]");

artistInput.addEventListener("keyup", () => {
  hiddenInput.value = artistInput.value.toUpperCase();
});
