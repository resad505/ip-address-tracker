const ipAddressEl = document.querySelector('#ipAddress')
const locationEl = document.querySelector('#location')
const timezoneEl = document.querySelector('#timezone')
const ispEl = document.querySelector('#isp')
const searchForm = document.querySelector('#searchForm')
const formInput = document.querySelector("#formInput")
const ErrorMsg = document.querySelector("#errorMsg")
const submitBtn = document.querySelector('#submitBtn')
const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/
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
const marker = L.marker([52.52, 13.405], { icon: customIcon }).addTo(map);
function updateMap(newLat, newLng) {
    map.flyTo([newLat, newLng], 13)
    marker.setLatLng([newLat, newLng])
}
function showError(errorEl, message) {
    errorEl.textContent = message
    errorEl.classList.remove('hidden')
    setTimeout(() => {
        errorEl.classList.add('hidden')
    }, 5000)
}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = formInput.value.trim()
    if (query === "") {
        showError(ErrorMsg, "Please enter an IP address or domain")
    }
    else if (!ipRegex.test(query) && !domainRegex.test(query)) {
        showError(ErrorMsg, "Please enter a valid IP address or domain")
    }
    else {
        ErrorMsg.classList.add("hidden")
        fetchIpDetails(query)
    }
})
const apiKey = 'at_MpGM6IdjkYn5DTOBCIDBnJm6dwRjV'
async function fetchIpDetails(searchTerm = '') {
    submitBtn.disabled = true
    submitBtn.classList.add('opacity-50')
    let queryParam = ''
    if (searchTerm) {
        if (ipRegex.test(searchTerm)) {
            queryParam = `&ipAddress=${searchTerm}`
        } else {
            queryParam = `&domain=${searchTerm}`
        }
    }
    const requestUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${queryParam}`
    try {
        const response = await fetch(requestUrl);
        if (!response.ok) {
            throw new Error('API request was failed')
        }
        const data = await response.json();
        ipAddressEl.textContent = data.ip
        const { city, region, postalCode } = data.location;
        locationEl.textContent = [city, region, postalCode].filter(Boolean).join(', ');
        timezoneEl.textContent = `UTC ${data.location.timezone}`
        ispEl.textContent = data.isp
        updateMap(data.location.lat, data.location.lng);
    } catch (error) {
        console.error("Error fetching IP details", error)
        showError(ErrorMsg, "Could not find location for this IP/domain.");
    } finally {
        submitBtn.disabled = false
        submitBtn.classList.remove('opacity-50', "cursor-not-allowed")
    }
}

fetchIpDetails()