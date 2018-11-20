const API_BASE_URL = '127.0.0.1'

function getApiUrl (path) {
  const {hash} = window.location
  const api_url = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : API_BASE_URL
  // hash is a string with the leading :, so match it here.
  const port = process.env.REACT_APP_API_PORT ? `:${process.env.REACT_APP_API_PORT}` : (hash ? hash.substr(1) : ':3453')
  const url = `http://${api_url}${port}${path}`
  return url
}

async function getJson (path) {
  const r = await window.fetch(getApiUrl(path), { 'method': 'GET', 'mode': 'cors', 'credentials': "same-origin" })
  if (!r.ok) { throw Error(`Received error response: ${r.status}: ${r.statusText}`) }
  const json = await r.json()
  // console.log(path, JSON.stringify(json, null, 2))
  return json
}

// Newline-delimited JSON
async function getNdJson (path) {
  const r = await window.fetch(getApiUrl(path), { 'method': 'GET', 'mode': 'cors', 'credentials': "same-origin" })
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
