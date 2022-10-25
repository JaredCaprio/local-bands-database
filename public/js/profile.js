const bandsBtn = document.querySelector("[data-bands-tab]");
const venuesBtn = document.querySelector("[data-venues-tab]");
const bandsTable = document.querySelector("[data-bands-table]");
const venuesTable = document.querySelector("[data-venues-table]");

bandsBtn.addEventListener("click", () => {
  if (!bandsTable.classList.contains("hide")) {
    return;
  } else {
    bandsTable.classList.toggle("hide");
    venuesTable.classList.toggle("hide");
  }
  if (bandsBtn.classList.contains("darken-2")) {
    return;
  } else {
    bandsBtn.classList.remove("darken-3");
    bandsBtn.classList.add("darken-2");
    venuesBtn.classList.remove("darken-2");
    venuesBtn.classList.add("darken-3");
  }
});
venuesBtn.addEventListener("click", () => {
  if (!venuesTable.classList.contains("hide")) {
    return;
  } else {
    bandsTable.classList.toggle("hide");
    venuesTable.classList.toggle("hide");
  }
  if (venuesBtn.classList.contains("darken-2")) {
    return;
  } else {
    venuesBtn.classList.remove("darken-3");
    venuesBtn.classList.add("darken-2");
    bandsBtn.classList.remove("darken-2");
    bandsBtn.classList.add("darken-3");
  }
});
