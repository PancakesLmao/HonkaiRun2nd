import {
  HERTA_SPEED,
  HERTA_INTERVAL_MAX,
  HERTA_INTERVAL_MIN,
} from "../function/config.js";
import { setCustomProperty } from "../function/updateCustomProperty.js";
import { Obstacles } from "./Obstacles.js";

export class Herta extends Obstacles { 
    constructor(worldElem) {
        super(worldElem, HERTA_SPEED, HERTA_INTERVAL_MIN, HERTA_INTERVAL_MAX);
    }

    createObstacle() {
        const obstacle = document.createElement("img");
        obstacle.dataset.object = true;
        obstacle.src = "./src/assets/herta.webp";
        obstacle.classList.add("object");
        setCustomProperty(obstacle, "--left", 100);
        this.worldElement.append(obstacle);
        this.obstacles.push(obstacle);
    }
}
