import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import prettyBytes from "pretty-bytes"
import setupEditors from "./setupEditor"

const form = document.querySelector("[data-form]")
const queryParamsContainer = document.querySelector("[data-query-params]")
const requestHeadersContainer = document.querySelector("[data-request-headers]")
const keyValueTemplate = document.querySelector("[data-key-value-template]")
const responseHeadersContainer = document.querySelector("[data-response-headers]")
const authTypeSelect = document.querySelector("[data-auth-type]")
const bearerAuthSection = document.querySelector("#bearer-auth")
const basicAuthSection = document.querySelector("#basic-auth")
const bearerTokenInput = document.querySelector("[data-bearer-token]")
const usernameInput = document.querySelector("[data-username]")
const passwordInput = document.querySelector("[data-password]")
const errorMessage = document.querySelector("#error-message")

document
  .querySelector("[data-add-query-param-btn]")
  .addEventListener("click", () => {
    queryParamsContainer.append(createKeyValuePair())
  })

document
  .querySelector("[data-add-request-header-btn]")
  .addEventListener("click", () => {
    requestHeadersContainer.append(createKeyValuePair())
  })

queryParamsContainer.append(createKeyValuePair())
requestHeadersContainer.append(createKeyValuePair())

// Handle auth type selection
authTypeSelect.addEventListener("change", () => {
  const authType = authTypeSelect.value
  bearerAuthSection.classList.add("d-none")
  basicAuthSection.classList.add("d-none")
  if (authType === "bearer") {
    bearerAuthSection.classList.remove("d-none")
  } else if (authType === "basic") {
    basicAuthSection.classList.remove("d-none")
  }
})

axios.interceptors.request.use(request => {
  request.customData = request.customData || {}
  request.customData.startTime = new Date().getTime()
  console.log("Request config:", {
    url: request.url,
    method: request.method,
    headers: request.headers,
    params: request.params,
    data: request.data
  })
  return request
})

function updateEndTime(response) {
  if (!response) {
    return { customData: { time: "N/A" } }
  }
  response.customData = response.customData || {}
  response.customData.time =
    new Date().getTime() - response.config.customData.startTime
  return response
}

axios.interceptors.response.use(updateEndTime, e => {
  const response = e.response || null
  return Promise.reject(updateEndTime(response))
})

const { requestEditor, updateResponseEditor } = setupEditors()
form.addEventListener("submit", e => {
  e.preventDefault()
  errorMessage.classList.add("d-none")

  // Validate URL
  const urlInput = document.querySelector("[data-url]").value.trim()
  if (!urlInput.match(/^https?:\/\//)) {
    errorMessage.textContent = "Invalid URL: Must include http:// or https://"
    errorMessage.classList.remove("d-none")
    return
  }

  let data
  try {
    data = JSON.parse(requestEditor.state.doc.toString() || null)
  } catch (e) {
    errorMessage.textContent = "JSON data is malformed"
    errorMessage.classList.remove("d-none")
    return
  }

  // Construct Authorization header
  let headers = {
    ...keyValuePairsToObjects(requestHeadersContainer),
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
  const authType = authTypeSelect.value
  if (authType === "bearer") {
    if (!bearerTokenInput.value.trim()) {
      errorMessage.textContent = "Please enter a Bearer token"
      errorMessage.classList.remove("d-none")
      return
    }
    headers = { ...headers, Authorization: `Bearer ${bearerTokenInput.value.trim()}` }
  } else if (authType === "basic") {
    if (!usernameInput.value.trim() || !passwordInput.value.trim()) {
      errorMessage.textContent = "Please enter both username and password"
      errorMessage.classList.remove("d-none")
      return
    }
    const encodedCredentials = btoa(`${usernameInput.value.trim()}:${passwordInput.value.trim()}`)
    headers = { ...headers, Authorization: `Basic ${encodedCredentials}` }
  }

  axios({
    url: urlInput,
    method: document.querySelector("[data-method]").value,
    params: keyValuePairsToObjects(queryParamsContainer),
    headers,
    data,
    timeout: 10000 // 10-second timeout
  })
    .then(response => {
      document
        .querySelector("[data-response-section]")
        .classList.remove("d-none")
      updateResponseDetails(response)
      updateResponseEditor(response.data)
      updateResponseHeaders(response.headers)
      console.log("Request successful:", response)
    })
    .catch(e => {
      let errorText = "Request failed: "
      if (e.code === "ERR_NETWORK") {
        errorText += "Network error or CORS issue. Check the API URL and server CORS settings."
      } else if (e.response) {
        errorText += `${e.response.status} ${e.response.statusText}`
      } else {
        errorText += e.message
      }
      errorMessage.textContent = errorText
      errorMessage.classList.remove("d-none")
      console.error("Request failed:", e)
      document
        .querySelector("[data-response-section]")
        .classList.remove("d-none")
      updateResponseDetails(e.response || { status: "N/A", customData: { time: "N/A" }, headers: {}, data: { error: errorText } })
      updateResponseEditor(e.response?.data || { error: errorText })
      updateResponseHeaders(e.response?.headers || {})
    })
})

function updateResponseDetails(response) {
  document.querySelector("[data-status]").textContent = response.status || "N/A"
  document.querySelector("[data-time]").textContent = response.customData?.time || "N/A"
  document.querySelector("[data-size]").textContent = response.data
    ? prettyBytes(
        JSON.stringify(response.data).length +
          JSON.stringify(response.headers || {}).length
      )
    : "N/A"
}

function updateResponseHeaders(headers) {
  responseHeadersContainer.innerHTML = ""
  Object.entries(headers || {}).forEach(([key, value]) => {
    const keyElement = document.createElement("div")
    keyElement.textContent = key
    responseHeadersContainer.append(keyElement)
    const valueElement = document.createElement("div")
    valueElement.textContent = value
    responseHeadersContainer.append(valueElement)
  })
}

function createKeyValuePair(key = "", value = "") {
  const element = keyValueTemplate.content.cloneNode(true)
  const keyInput = element.querySelector("[data-key]")
  const valueInput = element.querySelector("[data-value]")
  keyInput.value = key
  valueInput.value = value
  valueInput.placeholder = "Value"
  element.querySelector("[data-remove-btn]").addEventListener("click", e => {
    e.target.closest("[data-key-value-pair]").remove()
  })
  return element
}

function keyValuePairsToObjects(container) {
  const pairs = container.querySelectorAll("[data-key-value-pair]")
  return [...pairs].reduce((data, pair) => {
    const key = pair.querySelector("[data-key]").value
    const value = pair.querySelector("[data-value]").value

    if (key === "") return data
    return { ...data, [key]: value }
  }, {}) 
}