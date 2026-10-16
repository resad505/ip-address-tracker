async function fetchIpDetails(searchTerm = '') {
    submitBtn.disabled = true
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed')
    ipAddressEl.textContent = 'Loading...'
    locationEl.textContent = 'Loading...'
    timezoneEl.textContent = 'Loading...'
    ispEl.textContent = 'Loading...'
    let queryParam = ''
    if (searchTerm) {
        if (IPv4.test(searchTerm) || IPv6.test(searchTerm)) {
            queryParam = `?ipAddress=${searchTerm}`
        } else {
            queryParam = `?domain=${searchTerm}`
        }
    }
    const requestUrl = `/api/lookup${queryParam}`
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
        document.querySelector('#statusMsg').textContent = `Showing details for ${data.ip}, located in ${city}, ${region}.`
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