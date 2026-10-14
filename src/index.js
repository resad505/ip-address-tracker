const ipAddressEl = document.getElementById('ipAddress');
const locationEl = document.getElementById('location');
const timezoneEl = document.getElementById('timezone');
const ispEl = document.getElementById('isp');
const map = L.map('map', { zoomControl: false }).setView([52.52, 13.405], 13)
let lat = 52.52;
let lng = 13.405
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
const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
function updateMap(newLat, newLng) {
    map.flyTo([newLat, newLng], 13)
    marker.setLatLng([newLat, newLng])
}
const apiKey = 'at_MpGM6IdjkYn5DTOBCIDBnJm6dwRjV'
const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
async function fetchIpDetails() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('API request was failed')
        }
        const data = await response.json();
        ipAddressEl.textContent = data.ip
        const { city, region, postalCode } = data.location;
        locationEl.textContent = [city, region, postalCode].filter(Boolean).join(', ');
        timezoneEl.textContent = `UTC ${data.location.timezone}`
        ispEl.textContent = data.isp
        lat = data.location.lat
        lng = data.location.lng
        updateMap(lat, lng)

    } catch (error) {
        console.error("Error fetching IP details", error)
    }
}

fetchIpDetails()