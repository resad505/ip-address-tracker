const map = L.map('map', { zoomControl: false }).setView([52.52, 13.405], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);
L.control.zoom({ position: 'bottomright' }).addTo(map)
const customIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 56]
})
const marker = L.marker([52.52, 13.405], { icon: customIcon, interactive: false }).addTo(map);
function updateMap(newLat, newLng) {
    map.flyTo([newLat, newLng], 13)
    marker.setLatLng([newLat, newLng])
}