import api from './api'
import actors from './actors.json'

export default function fetchActors () {
  return Promise.resolve(actors)
  return api.getNdJson(`/api/actor/ls`)
}
