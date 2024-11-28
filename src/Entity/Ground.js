import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";
import { GROUND_SPEED } from "../function/config.js";

export class Ground {
    constructor(elements) {
        this.elements = elements;
        this.speed = GROUND_SPEED;
    }

    setupGround() {
        setCustomProperty(this.elements[0], "--left", 0);
        setCustomProperty(this.elements[1], "--left", 100);
    }

    updateGround(delta, speedScale) {
        this.elements.forEach((ground) => {
            incrementCustomProperty(
                ground,
                "--left",
                delta * speedScale * this.speed * -1
            );

            if (getCustomProperty(ground, "--left") <= -100) {
                incrementCustomProperty(ground, "--left", 200);
            }
        });
    }
}