const venuesDashboard = document.querySelector(".dashboard-venues");
const bandsDashboard = document.querySelector(".dashboard-bands");
const bandsTabBtn = document.querySelector("[data-venues-tab]");
const venuesTabBtn = document.querySelector("[data-bands-tab]");

bandsTabBtn.addEventListener("click", () => {
  if (bandsDashboard.stlye.display === "table") {
    return;
  } else {
    bandsDashboard.style.display = "table";
    venuesDashboard.style.display = "none";
  }
});

venuesTabBtn.addEventListener("click", () => {
  if (venuesDashboard.style.display === "table") {
    return;
  } else {
    venuesDashboard.style.display = "none";
    bandsDashboard.style.display = "table";
  }
});
