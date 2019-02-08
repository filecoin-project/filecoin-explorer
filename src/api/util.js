import mapObj from 'map-obj'

export const KeysForBigInts = ['height', 'nonce', 'parentWeight']

export function mapAllBigInts (obj, keys = KeysForBigInts) {
  if (!obj) return obj
  return mapObj(obj, (key, value) => {
    if (keys.includes(key)) {
      value = decodeBigInt(value)
    }
    return [key, value]
  }, { deep: true })
}

export function decodeBigInt (raw) {
  const buf = Buffer.from(raw, 'base64')
  // Decode leb128 integer
  let result = 0
  let shift = 0
  for (let i = 0, b = 0x80; b & 0x80; i++) {
    b = buf[i]
    result |= (0x7F & b) << shift
    shift += 7
  }
  return result
}
