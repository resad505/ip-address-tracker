const ipAddressEl = document.querySelector('#ipAddress')
const locationEl = document.querySelector('#location')
const timezoneEl = document.querySelector('#timezone')
const ispEl = document.querySelector('#isp')
const searchForm = document.querySelector('#searchForm')
const formInput = document.querySelector("#formInput")
const errorMsgEl = document.querySelector("#errorMsg")
const submitBtn = document.querySelector('#submitBtn')
const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/
let errorTimeoutId = null
function showError(errorEl, message) {
    clearTimeout(errorTimeoutId)
    errorEl.textContent = message
    errorEl.classList.remove('hidden')
    errorTimeoutId = setTimeout(() => {
        errorEl.classList.add('hidden')
    }, 5000)
}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = formInput.value.trim()
    if (query === "") {
        showError(errorMsgEl, "Please enter an IP address or domain")
    }
    else if (!ipRegex.test(query) && !domainRegex.test(query)) {
        showError(errorMsgEl, "Please enter a valid IP address or domain")
    }
    else {
        errorMsgEl.classList.add("hidden")
        fetchIpDetails(query)
    }
})
const apiKey = 'at_MpGM6IdjkYn5DTOBCIDBnJm6dwRjV'
