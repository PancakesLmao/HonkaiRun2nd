import {
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

export class Obstacles {
  constructor(worldElem, speed, intervalMin, intervalMax) {
    if (new.target === Obstacles) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.worldElem = worldElem;
    this.speed = speed;
    this.intervalMax = intervalMax;
    this.intervalMin = intervalMin;
    this.obstacles = [];
    this.nextSpawnTime = intervalMin;
  }

  setupObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.remove());
    this.obstacles = [];
    this.nextSpawnTime = this.intervalMin;
  }

  updateObstacles(delta, speedScale) {
    this.obstacles.forEach((obstacle) => {
      incrementCustomProperty(
        obstacle,
        "--left",
        delta * speedScale * this.speed * -1
      );
      if (getCustomProperty(obstacle, "--left") <= -100) {
        obstacle.remove();
      }
    });

    this.obstacles = this.obstacles.filter((obstacle) => obstacle.isConnected);

    if (this.nextSpawnTime <= 0) {
      this.createObstacle();
      this.nextSpawnTime =
        this.randomNumberBetween(this.intervalMin, this.intervalMax) /
        speedScale;
    }
    this.nextSpawnTime -= delta;
  }

  getRects() {
    return this.obstacles.map((obstacle) => obstacle.getBoundingClientRect());
  }

  createObstacle() {
    throw new Error(
      "Method 'createObstacle()' must be implemented in a subclass"
    );
  }

  randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

