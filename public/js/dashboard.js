const venuesDashboard = document.querySelector(".dashboard-venues");
const bandsDashboard = document.querySelector(".dashboard-bands");
const bandsTabBtn = document.querySelector("[data-bands-tab]");
const venuesTabBtn = document.querySelector("[data-venues-tab]");
const bandsFilter = document.querySelector(".bands-filter");
const venuesFilter = document.querySelector(".venues-filter");

/* Swtiching between venues and bands display on the dashboard */
bandsTabBtn.addEventListener("click", () => {
  if (bandsDashboard.style.display === "table") {
    return;
  } else {
    bandsDashboard.style.display = "table";
    venuesDashboard.style.display = "none";
    venuesFilter.style.display = "none";
    bandsFilter.style.display = "block";
    venuesTabBtn.classList.remove("darken-2");
    venuesTabBtn.classList.add("darken-3");
    bandsTabBtn.classList.add("darken-2");
    bandsTabBtn.classList.remove("darken-3");
  }
});

venuesTabBtn.addEventListener("click", () => {
  if (venuesDashboard.style.display === "table") {
    return;
  } else {
    venuesDashboard.style.display = "table";
    bandsDashboard.style.display = "none";
    venuesFilter.style.display = "block";
    bandsFilter.style.display = "none";
    bandsTabBtn.classList.remove("darken-2");
    bandsTabBtn.classList.add("darken-3");
    venuesTabBtn.classList.add("darken-2");
    venuesTabBtn.classList.remove("darken-3");
  }
});

/* Switching between bands filtering and venues filtering options */
