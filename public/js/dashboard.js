const venuesDashboard = document.querySelector(".dashboard-venues");
const bandsDashboard = document.querySelector(".dashboard-bands");
const bandsTabBtn = document.querySelector("[data-bands-tab]");
const venuesTabBtn = document.querySelector("[data-venues-tab]");
const bandsFilter = document.querySelector(".bands-filter");
const venuesFilter = document.querySelector(".venues-filter");

/* Swtiching between venues and bands display on the dashboard */

function switchToActive(activate, deactivate, displayVal) {
  activate.style.display = displayVal;
  deactivate.style.display = "none";
}

function activateBtn(activate, deactivate, activeClass, inactiveClass) {
  activate.classList.add(activeClass);
  activate.classList.remove(inactiveClass);
  deactivate.classList.add(inactiveClass);
  deactivate.classList.remove(activeClass);
}

bandsTabBtn.addEventListener("click", () => {
  if (bandsDashboard.style.display === "table") {
    return;
  } else {
    switchToActive(bandsDashboard, venuesDashboard, "table");
    switchToActive(bandsFilter, venuesFilter, "block");
    activateBtn(bandsTabBtn, venuesTabBtn, "darken-2", "darken-3");
  }
});

venuesTabBtn.addEventListener("click", () => {
  if (venuesDashboard.style.display === "table") {
    return;
  } else {
    switchToActive(venuesDashboard, bandsDashboard, "table");
    switchToActive(venuesFilter, bandsFilter, "block");
    activateBtn(venuesTabBtn, bandsTabBtn, "darken-2", "darken-3");
  }
});

/* Switching between bands filtering and venues filtering options */
