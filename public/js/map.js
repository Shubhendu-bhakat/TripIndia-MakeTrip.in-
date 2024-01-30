mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center : listing.geometry.coordinates,// starting position [lng, lat]
  zoom: 10, // starting zoom
});

console.log(listing.geometry.coordinates);
const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat( listing.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h5>${listing.location}</h5>
    <p>Exact location peovided after booking </p>`))
  .addTo(map);
