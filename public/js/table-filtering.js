/* Filtering bands table */
(function filteringBands() {
  //Decalre variables
  const input = document.getElementById("bnd-search");
  const searchFields = document.querySelector("[data-bands-filter-by]");
  const status = document.querySelector("[data-bands-status]");
  let currentSearchField = searchFields.value;
  let currentStatus = status.value;
  //Event listeners to run function on keyup and update filtering option variables
  input.addEventListener("keyup", () => {
    bandsfilterTable();
  });
  status.addEventListener("change", () => {
    currentStatus = status.value;
    bandsfilterTable();
  });
  searchFields.addEventListener("change", () => {
    currentSearchField = searchFields.value;
    bandsfilterTable();
  });

  function bandsfilterTable() {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    filter = input.value.toUpperCase();
    table = document.querySelector(".bnd-index-table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      if (currentSearchField === "by-artist")
        td = tr[i].getElementsByTagName("td")[0];
      if (currentSearchField === "by-state")
        td = tr[i].getElementsByTagName("td")[1];
      if (currentSearchField === "by-city")
        td = tr[i].getElementsByTagName("td")[2];
      if (currentSearchField === "by-genre")
        td = tr[i].getElementsByTagName("td")[3];
      let itemStatus = tr[i].getElementsByTagName("td")[4];

      console.log(itemStatus);
      if (td && currentStatus === "any") {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } else if (td && currentStatus != "any") {
        txtValue = td.textContent || td.innerText;
        let statusTxtValue = itemStatus.textContent || itemStatus.innerText;
        if (
          txtValue.toUpperCase().indexOf(filter) > -1 &&
          statusTxtValue === currentStatus
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
})();

/* Filtering Venues table */
(function filteringVenues() {
  //Decalre variables
  const input = document.getElementById("ven-search");
  const searchFields = document.querySelector("[data-venues-filter-by]");
  const status = document.querySelector("[data-venues-status]");
  let currentSearchField = searchFields.value;
  let currentStatus = status.value;
  //Event listeners to run function on keyup and update filtering option variables
  input.addEventListener("keyup", () => {
    venuesfilterTable();
  });
  status.addEventListener("change", () => {
    currentStatus = status.value;
    venuesfilterTable();
  });
  searchFields.addEventListener("change", () => {
    currentSearchField = searchFields.value;
    venuesfilterTable();
  });

  function venuesfilterTable() {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    filter = input.value.toUpperCase();
    table = document.querySelector(".ven-index-table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      if (currentSearchField === "by-name")
        td = tr[i].getElementsByTagName("td")[0];
      if (currentSearchField === "by-state")
        td = tr[i].getElementsByTagName("td")[1];
      if (currentSearchField === "by-city")
        td = tr[i].getElementsByTagName("td")[2];
      let itemStatus = tr[i].getElementsByTagName("td")[4];

      console.log(itemStatus);
      if (td && currentStatus === "any") {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } else if (td && currentStatus != "any") {
        txtValue = td.textContent || td.innerText;
        let statusTxtValue = itemStatus.textContent || itemStatus.innerText;
        if (
          txtValue.toUpperCase().indexOf(filter) > -1 &&
          statusTxtValue === currentStatus
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
})();
