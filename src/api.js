const apiKey = 'at_MpGM6IdjkYn5DTOBCIDBnJm6dwRjV'

async function fetchIpDetails(searchTerm = '') {
    submitBtn.disabled = true
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed')
    ipAddressEl.textContent = 'Loading...'
    locationEl.textContent = 'Loading...'
    timezoneEl.textContent = 'Loading...'
    ispEl.textContent = 'Loading...'
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
            throw new Error(`API request failed with status: ${response.status}`)
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
        showError(errorMsgEl, "Could not find location for this IP/domain.");
        ipAddressEl.textContent = '-'
        locationEl.textContent = '-'
        timezoneEl.textContent = '-'
        ispEl.textContent = '-'
    } finally {
        submitBtn.disabled = false
        submitBtn.classList.remove('opacity-50', "cursor-not-allowed")
    }
}

fetchIpDetails()