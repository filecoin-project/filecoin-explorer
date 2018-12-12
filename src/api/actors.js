import api from './api'

export default function fetchActors () {
  return api.getNdJson(`/api/actor/ls`)
}
