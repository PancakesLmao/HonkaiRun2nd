import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  document.querySelectorAll("[data-object]").forEach(object => {
    object.remove()
  })
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-object]").forEach(object => {
    incrementCustomProperty(object, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(object, "--left") <= -100) {
      object.remove()
    }
  })

  if (nextCactusTime <= 0) {
    createCactus()
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

export function getCactusRects() {
  return [...document.querySelectorAll("[data-object]")].map(object => {
    return object.getBoundingClientRect()
  })
}

function createCactus() {
  const object = document.createElement("img")
  object.dataset.object = true
  object.src = "./src/assets/herta.webp"
  object.classList.add("object")
  setCustomProperty(object, "--left", 100)
  worldElem.append(object)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
