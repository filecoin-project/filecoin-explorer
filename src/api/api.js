function getApiUrl (path) {
  // Setting the API_URL to '/' results in a 'http://api' call because all paths start with '/'.
  // If our API_URL is '/' we want to be making requests at our root, so we drop the extra
  const api_url = process.env.REACT_APP_API_URL == '/' ? '' : process.env.REACT_APP_API_URL
  const url = `${api_url}${path}`
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
