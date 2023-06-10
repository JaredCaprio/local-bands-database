const form = document.querySelector(".band-edit-form");
let formDataObj = new FormData(form);

form.addEventListener("change", () => {
  formDataObj = new FormData(form);
});

const url = window.location.pathname.replace("edit/", "");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(url, {
    method: "PUT",
    body: formDataObj,
  })
    .then((res) => {
      if (res) {
        window.location = "http://localhost:3000/dashboard";
      }
    })
    .catch((err) => console.log(err));
});
