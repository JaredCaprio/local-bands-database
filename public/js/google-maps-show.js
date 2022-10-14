const mapShowEl = document.getElementById("map-show");
const showLat = document.querySelector(".show-lat");
const showLng = document.querySelector(".show-lng");

function initMap() {
  const locationShow = { lat: 39.8097, lng: -98.5556 };
  const showOptions = {
    zoom: 15,
    center: locationShow,
  };

  locationShow.lat = parseFloat(showLat.value);
  locationShow.lng = parseFloat(showLng.value);

  const map = new google.maps.Map(mapShowEl, showOptions);
  const userMarker = new google.maps.Marker({
    position: locationShow,
    map: map,
  });
}

initMap();
