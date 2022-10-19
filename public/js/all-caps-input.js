const hiddenInput = document.querySelector("[data-hidden-all-caps]");
const artistInput = document.querySelector("[data-artist]");

artistInput.addEventListener("keyup", () => {
  hiddenInput.value = artistInput.value.toUpperCase();
});
