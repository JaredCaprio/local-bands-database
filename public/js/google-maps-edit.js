const mapEditEl = document.getElementById("map-edit");
const editLat = document.querySelector(".edit-lat");
const editLng = document.querySelector(".edit-lng");
const editVenueName = document.querySelector(".edit-venue-name");
function initMap() {
  const locationEdit = { lat: 39.8097, lng: -98.5556 };
  const editOptions = {
    zoom: 15,
    center: locationEdit,
  };
  locationEdit.lat = parseFloat(editLat.value);
  locationEdit.lng = parseFloat(editLng.value);
  const mapEdit = new google.maps.Map(mapEditEl, editOptions);
  const userMarker = new google.maps.Marker({
    position: locationEdit,
    title: editVenueName.value,
    map: mapEdit,
  });
}

initMap();
