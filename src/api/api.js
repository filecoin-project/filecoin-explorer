const API_BASE_URL = 'http://127.0.0.1'

function getApiUrl (path) {
  const {hash} = window.location
  // hash is a string with the leading :, so match it here.
  const port = hash ? hash.substr(1) : ':3453'
  const url = `${API_BASE_URL}${port}${path}`
  return url
}

async function getJson (path) {
  const r = await window.fetch(getApiUrl(path), { 'method': 'GET' })
  if (!r.ok) { throw Error(`Received error response: ${r.status}: ${r.statusText}`) }
  const json = await r.json()
  // console.log(path, JSON.stringify(json, null, 2))
  return json
}

// Newline-delimited JSON
async function getNdJson (path) {
  const r = await window.fetch(getApiUrl(path), { 'method': 'GET' })
  if (!r.ok) { throw Error(`Received error response: ${r.status}: ${r.statusText}`) }
  return r.text().then((str) => {
    const arr = toNdJson(str)
    // console.log('nd', path, JSON.stringify(arr, null, 2))
    return arr
  })
}

function toNdJson (str) {
  const lines = str.split('\n').filter(line => line !== '')
  return lines.map(line => {
    return (line === '') ? null : JSON.parse(line)
  })
}

// Note: This makes it easier to mock in serice.test.js, but may not be necessary.
export default {
  getJson,
  getNdJson
}
