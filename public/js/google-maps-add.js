//Selectors
const mapAddEl = document.getElementById("map-add");

const autocompleteEl = document.getElementById("autocomplete");
const latInput = document.getElementById("lat");
const lngInput = document.getElementById("lng");
const stateInput = document.getElementById("state");
const cityInput = document.getElementById("city");
const addressInput = document.getElementById("address");
const nameInput = document.querySelector("[data-name]");

//Google maps Set up
function initMap() {
  const location = { lat: 39.8097, lng: -98.5556 };
  const options = {
    zoom: 3,
    center: location,
  };
  const optionsZoom = {
    zoom: 10,
    center: location,
  };

  const optionZoomed = {
    zoom: 15,
    center: location,
  };

  let mapAdd = new google.maps.Map(mapAddEl, options);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        location.lat = loc.coords.latitude;
        location.lng = loc.coords.longitude;

        //write the map
        mapAdd = new google.maps.Map(mapAddEl, optionsZoom);
      },
      (err) => {
        mapAdd = new google.maps.Map(mapAddEl, optionsZoom);
      }
    );
  } else {
    mapAdd = new google.maps.Map(mapAddEl, optionsZoom);
  }

  const autocomplete = new google.maps.places.Autocomplete(autocompleteEl, {
    types: ["establishment"],
    componentRestrictions: { country: ["US"] },
    fields: ["geometry", "name", "address_components"],
  });

  let userMarker;
  //Autocomplete input
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    const placeAddress = place.address_components;
    let placeLat = place.geometry.location.lat();
    location.lat = placeLat;
    let placeLng = place.geometry.location.lng();
    location.lng = placeLng;
    mapAdd = new google.maps.Map(mapAddEl, optionZoomed);
    userMarker = new google.maps.Marker({
      position: place.geometry.location,
      title: "Drag me!",
      map: mapAdd,
      draggable: true,
    });
    //Marker listener to update coordinate input fields
    userMarker.addListener("dragend", function () {
      let markerLat = userMarker.getPosition().lat();
      let markerLng = userMarker.getPosition().lng();
      latInput.value = markerLat;
      lngInput.value = markerLng;
    });

    //Setting the value of the input fields to address components
    for (let i = 0; i < placeAddress.length; i++) {
      if (placeAddress[i].types.includes("administrative_area_level_1")) {
        stateInput.value = placeAddress[i].long_name;
      } else if (placeAddress[i].types.includes("locality")) {
        cityInput.value = placeAddress[i].long_name;
      } else if (placeAddress[i].types.includes("street_number")) {
        addressInput.value = placeAddress[i].long_name;
      } else if (placeAddress[i].types.includes("route")) {
        addressInput.value += " " + placeAddress[i].long_name;
      }
    }
    nameInput.value = place.name;
    latInput.value = placeLat;
    lngInput.value = placeLng;
  });

  /* const locationShow = { lat: null, lng: null };
  const showOptions = {
    zoom: 15,
    center: locationShow,
  };
  locationShow.lat = showLat.value;
  locationShow.lng = showLng.value;
  const mapShow = new google.maps.Map(mapShowEl, showOptions); */
}

initMap();
