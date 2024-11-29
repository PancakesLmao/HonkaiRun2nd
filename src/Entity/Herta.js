import {
  HERTA_SPEED,
  HERTA_INTERVAL_MAX,
  HERTA_INTERVAL_MIN,
} from "../function/config.js";
import hertaImg from "../assets/herta.webp";
import { setCustomProperty } from "../function/updateCustomProperty.js";
import { Obstacles } from "./Obstacles.js";

export default class Herta extends Obstacles { 
    constructor(worldElem) {
        super(worldElem, HERTA_SPEED, HERTA_INTERVAL_MIN, HERTA_INTERVAL_MAX);
    }

    createObstacle() {
        const obstacle = document.createElement("img");
        obstacle.dataset.object = true;
        obstacle.src = hertaImg;
        obstacle.classList.add("object");
        setCustomProperty(obstacle, "--left", 100);
        this.worldElem.append(obstacle);
        this.obstacles.push(obstacle);
    }
}
