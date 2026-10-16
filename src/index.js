const ipAddressEl = document.querySelector('#ipAddress')
const locationEl = document.querySelector('#location')
const timezoneEl = document.querySelector('#timezone')
const ispEl = document.querySelector('#isp')
const searchForm = document.querySelector('#searchForm')
const formInput = document.querySelector("#formInput")
const errorMsgEl = document.querySelector("#errorMsg")
const submitBtn = document.querySelector('#submitBtn')
const IPv4 = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/
const IPv6 = /^((([0-9A-Fa-f]{1,4}:){1,6}:)|(([0-9A-Fa-f]{1,4}:){7}))([0-9A-Fa-f]{1,4})$/
const domainRegex = /^(?=.{1,253}$)(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)+[a-z]{2,}$/i
let errorTimeoutId = null
function showError(errorEl, message) {
    errorEl.textContent = message
    errorEl.classList.remove('hidden')
}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = formInput.value.trim()
    if (query === "") {
        showError(errorMsgEl, "Please enter an IP address or domain")
    }
    else if (!IPv4.test(query) && !IPv6.test(query) && !domainRegex.test(query)) {
        showError(errorMsgEl, "Please enter a valid IP address or domain")
    }
    else {
        errorMsgEl.classList.add("hidden")
        fetchIpDetails(query)
    }
})
formInput.addEventListener('input', () => {
    errorMsgEl.classList.add('hidden')
})

