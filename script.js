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
const curlInput = document.querySelector("#curl-input")
const parseCurlBtn = document.querySelector("#parse-curl-btn")
const downloadResponseBtn = document.querySelector("#download-response-btn")

// Check selectors
if (!form) console.error("Form element [data-form] not found")
if (!curlInput) console.error("cURL input #curl-input not found")
if (!parseCurlBtn) console.error("Parse cURL button #parse-curl-btn not found")
if (!errorMessage) console.error("Error message #error-message not found")
if (!downloadResponseBtn) console.error("Download response button #download-response-btn not found")

document
  .querySelector("[data-add-query-param-btn]")
  ?.addEventListener("click", () => {
    queryParamsContainer.append(createKeyValuePair())
  })

document
  .querySelector("[data-add-request-header-btn]")
  ?.addEventListener("click", () => {
    requestHeadersContainer.append(createKeyValuePair())
  })

if (queryParamsContainer) queryParamsContainer.append(createKeyValuePair())
if (requestHeadersContainer) requestHeadersContainer.append(createKeyValuePair())

// Handle auth type selection
authTypeSelect?.addEventListener("change", () => {
  const authType = authTypeSelect.value
  bearerAuthSection.classList.add("d-none")
  basicAuthSection.classList.add("d-none")
  if (authType === "bearer") {
    bearerAuthSection.classList.remove("d-none")
  } else if (authType === "basic") {
    basicAuthSection.classList.remove("d-none")
  }
})

// Parse cURL command
parseCurlBtn?.addEventListener("click", () => {
  console.log("Parse cURL button clicked")
  const curlCommand = curlInput?.value.trim()
  if (!curlCommand) {
    errorMessage.textContent = "Please enter a cURL command"
    errorMessage.classList.remove("d-none")
    console.warn("Empty cURL command")
    return
  }

  try {
    const parsed = parseCurlCommand(curlCommand)
    console.log("Parsed cURL:", parsed)
    if (!parsed.url) {
      errorMessage.textContent = "No valid URL found in cURL command"
      errorMessage.classList.remove("d-none")
      console.warn("Parsed cURL has no URL")
      return
    }
    // Populate UI fields
    const urlInput = document.querySelector("[data-url]")
    const methodSelect = document.querySelector("[data-method]")
    if (urlInput) {
      urlInput.value = parsed.url
      console.log("Updated URL input:", parsed.url)
    } else {
      console.error("URL input [data-url] not found")
    }
    if (methodSelect) {
      methodSelect.value = parsed.method
      console.log("Updated method select:", parsed.method)
    } else {
      console.error("Method select [data-method] not found")
    }
    // Clear existing headers
    requestHeadersContainer.innerHTML = ""
    // Add parsed headers (excluding Authorization)
    Object.entries(parsed.headers).forEach(([key, value]) => {
      if (key.toLowerCase() !== "authorization") {
        requestHeadersContainer.append(createKeyValuePair(key, value))
        console.log(`Added header: ${key}=${value}`)
      }
    })
    // Handle Authorization
    const authHeader = parsed.headers.Authorization || parsed.headers.authorization
    if (authHeader) {
      if (authHeader.startsWith("Bearer ")) {
        authTypeSelect.value = "bearer"
        bearerTokenInput.value = authHeader.replace("Bearer ", "").trim()
        bearerAuthSection.classList.remove("d-none")
        basicAuthSection.classList.add("d-none")
        console.log("Set Bearer token:", bearerTokenInput.value)
      } else if (authHeader.startsWith("Basic ")) {
        authTypeSelect.value = "basic"
        const decoded = atob(authHeader.replace("Basic ", "").trim())
        const [username, password] = decoded.split(":")
        usernameInput.value = username || ""
        passwordInput.value = password || ""
        basicAuthSection.classList.remove("d-none")
        bearerAuthSection.classList.add("d-none")
        console.log("Set Basic Auth:", { username, password })
      } else {
        authTypeSelect.value = "none"
        requestHeadersContainer.append(createKeyValuePair("Authorization", authHeader))
        console.log("Added Authorization header:", authHeader)
      }
    } else {
      authTypeSelect.value = "none"
      console.log("No Authorization header found")
    }
    // Update JSON editor
    if (parsed.data) {
      try {
        // Validate JSON
        JSON.parse(parsed.data)
        requestEditor.dispatch({
          changes: { from: 0, to: requestEditor.state.doc.length, insert: parsed.data }
        })
        console.log("Updated JSON editor with:", parsed.data)
      } catch (e) {
        errorMessage.textContent = "Invalid JSON data in cURL command"
        errorMessage.classList.remove("d-none")
        console.error("Invalid JSON data:", e.message)
      }
    } else {
      // Clear JSON editor if no data
      requestEditor.dispatch({
        changes: { from: 0, to: requestEditor.state.doc.length, insert: "" }
      })
      console.log("No JSON data in cURL, cleared JSON editor")
    }
    errorMessage.classList.add("d-none")
  } catch (e) {
    errorMessage.textContent = "Invalid cURL command format: " + e.message
    errorMessage.classList.remove("d-none")
    console.error("cURL parsing error:", e)
  }
})

function parseCurlCommand(curlCommand) {
  const result = { method: "GET", url: "", headers: {}, data: "" }
  // Split by spaces, preserving quoted strings
  const parts = curlCommand.match(/(?:[^\s'"]+|'[^']*'|"[^"]*")+/g) || []
  console.log("cURL parts:", parts)
  if (!parts[0]?.startsWith("curl")) {
    console.warn("cURL command does not start with 'curl'")
    return result
  }

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    if (part === "-X" && parts[i + 1]) {
      result.method = parts[i + 1].toUpperCase()
      i++
    } else if (part === "-H" && parts[i + 1]) {
      const header = parts[i + 1].replace(/^['"]|['"]$/g, "")
      const match = header.match(/([^:]+):\s*(.+)/)
      if (match) {
        const [, key, value] = match
        result.headers[key] = value
      }
      i++
    } else if (part === "-d" && parts[i + 1]) {
      result.data = parts[i + 1].replace(/^['"]|['"]$/g, "")
      i++
    } else if (part.match(/^https?:\/\//) || (part.match(/^['"].*https?:\/\//))) {
      result.url = part.replace(/^['"]|['"]$/g, "")
    }
  }
  return result
}

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
let lastResponseData = null // Store last response data for download

form?.addEventListener("submit", e => {
  e.preventDefault()
  console.log("Form submitted")
  errorMessage.classList.add("d-none")

  const urlInput = document.querySelector("[data-url]")?.value.trim()
  if (!urlInput?.match(/^https?:\/\//)) {
    errorMessage.textContent = "Invalid URL: Must include http:// or https://"
    errorMessage.classList.remove("d-none")
    console.warn("Invalid URL:", urlInput)
    return
  }

  let data
  try {
    data = JSON.parse(requestEditor.state.doc.toString() || null)
  } catch (e) {
    errorMessage.textContent = "JSON data is malformed"
    errorMessage.classList.remove("d-none")
    console.error("JSON parse error:", e)
    return
  }

  let headers = {
    ...keyValuePairsToObjects(requestHeadersContainer),
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
  const authType = authTypeSelect?.value
  if (authType === "bearer") {
    if (!bearerTokenInput?.value.trim()) {
      errorMessage.textContent = "Please enter a Bearer token"
      errorMessage.classList.remove("d-none")
      console.warn("Missing Bearer token")
      return
    }
    headers = { ...headers, Authorization: `Bearer ${bearerTokenInput.value.trim()}` }
  } else if (authType === "basic") {
    if (!usernameInput?.value.trim() || !passwordInput?.value.trim()) {
      errorMessage.textContent = "Please enter both username and password"
      errorMessage.classList.remove("d-none")
      console.warn("Missing Basic Auth credentials")
      return
    }
    const encodedCredentials = btoa(`${usernameInput.value.trim()}:${passwordInput.value.trim()}`)
    headers = { ...headers, Authorization: `Basic ${encodedCredentials}` }
  }

  axios({
    url: urlInput,
    method: document.querySelector("[data-method]")?.value,
    params: keyValuePairsToObjects(queryParamsContainer),
    headers,
    data,
    timeout: 10000
  })
    .then(response => {
      document
        .querySelector("[data-response-section]")
        .classList.remove("d-none")
      updateResponseDetails(response)
      updateResponseEditor(response.data)
      updateResponseHeaders(response.headers)
      lastResponseData = response.data // Store response for download
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
      lastResponseData = e.response?.data || { error: errorText } // Store error response for download
    })
})

// Handle SAVE Response button
downloadResponseBtn?.addEventListener("click", () => {
  console.log("SAVE Response button clicked")
  if (!lastResponseData) {
    errorMessage.textContent = "No response data available to save"
    errorMessage.classList.remove("d-none")
    console.warn("No response data to save")
    return
  }

  try {
    const jsonString = JSON.stringify(lastResponseData, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `api_response_${new Date().toISOString()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    console.log("Response saved as JSON file")
    errorMessage.classList.add("d-none")
  } catch (e) {
    errorMessage.textContent = "Failed to save response: " + e.message
    errorMessage.classList.remove("d-none")
    console.error("Save response error:", e)
  }
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