const searchBox = document.querySelector("#search");
const setStatus = document.getElementById("set-status");
const searchBy = document.getElementById("status");

let currentFilterBy = searchBy.value;
let currentStatus = setStatus.value;

searchBy.addEventListener("change", () => {
  currentFilterBy = searchBy.value;
  filterIndexList();
});

searchBox.addEventListener("keyup", (e) => {
  filterIndexList();
  updateCurrentStatus();
});

setStatus.addEventListener("change", () => {
  updateCurrentStatus();
  filterIndexList();
});

function updateCurrentStatus() {
  currentStatus = setStatus.value;
  console.log(currentStatus);
}

function filterIndexList() {
  let filter, table, tr, td, i, txtValue;
  filter = searchBox.value.toUpperCase();
  table = document.querySelector(".index-table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query

  for (i = 0; i < tr.length; i++) {
    if (currentFilterBy === "by-name") td = tr[i].getElementsByTagName("td")[0];
    if (currentFilterBy === "by-artist")
      td = tr[i].getElementsByTagName("td")[0];
    if (currentFilterBy === "by-state")
      td = tr[i].getElementsByTagName("td")[1];
    if (currentFilterBy === "by-city") td = tr[i].getElementsByTagName("td")[2];
    if (currentFilterBy === "by-genre")
      td = tr[i].getElementsByTagName("td")[3];
    let isStatusAny;
    let itemStatus = tr[i].getElementsByTagName("td")[4];

    if (td) {
      statusTxtValue = itemStatus.textContent || itemStatus.innerText;
      console.log(statusTxtValue);
      if (currentStatus === "any") {
        isStatusAny = true;
      }
      txtValue = td.textContent || td.innerText;
      if (isStatusAny) {
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } else {
        if (
          txtValue.toUpperCase().indexOf(filter) > -1 &&
          currentStatus === statusTxtValue
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}
