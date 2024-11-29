import Ground from "../Entity/Ground.js";
import Player from "../Entity/Player.js";
import Herta from "../Entity/Herta.js";

import {WORLD_HEIGHT, WORLD_WIDTH, SPEED_SCALE_INCREASE} from "./config.js"

export default class Game {
  constructor({
    playerElem,
    groundElems,
    worldElem,
    scoreElem,
    startScreenElem,
    audio1,
    audio2,
  }) {
    if (
      !playerElem ||
      !groundElems ||
      !worldElem ||
      !scoreElem ||
      !startScreenElem
    ) {
      throw new Error("Missing required game elements for initialization.");
    }

    // Initialize DOM elements
    this.playerElem = playerElem;
    this.groundElems = groundElems;
    this.worldElem = worldElem;
    this.scoreElem = scoreElem;
    this.startScreenElem = startScreenElem;
    this.audio1 = audio1;
    this.audio2 = audio2;

    this.lastTime = null;
    this.speedScale = 1;
    this.score = 0;

    // Game objects
    this.ground = new Ground(groundElems);
    this.player = new Player(playerElem);
    this.obstacle = new Herta(worldElem);

    // Bind methods for event listeners
    this.update = this.update.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleLose = this.handleLose.bind(this);

    console.log("Game initialized", {
      ground: this.ground,
      player: this.player,
      obstacle: this.obstacle,
    });
  }

  initialize() {
    this.setPixelToWorldScale();
    window.addEventListener("resize", this.setPixelToWorldScale.bind(this));
    document.addEventListener("keydown", this.handleStart, { once: true });
  }

  setupGame() {
    this.ground.setUpGround();
    this.player.setUpPlayer();
    this.obstacle.setUpObstacles();
  }

  update(time) {
    if (this.lastTime == null) {
      this.lastTime = time;
      window.requestAnimationFrame(this.update);
      return;
    }
    const delta = time - this.lastTime;

    // Call bound methods
    this.ground.updateGround(delta, this.speedScale);
    this.player.updatePlayer(delta, this.speedScale);
    this.obstacle.updateObstacles(delta, this.speedScale);

    this.updateSpeedScale(delta);
    this.updateScore(delta); // This should now work without errors

    if (this.checkLose()) return this.handleLose();

    this.lastTime = time;
    window.requestAnimationFrame(this.update);
  }

  checkLose() {
    const playerRect = this.player.getRect();
    return this.obstacle
      .getRects()
      .some((rect) => this.isCollision(rect, playerRect));
  }

  isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    );
  }

  updateSpeedScale(delta) {
    this.speedScale += delta * SPEED_SCALE_INCREASE;
  }

  handleStart() {
    console.log("Key pressed. Starting game...");
    this.lastTime = null;
    this.speedScale = 1;
    this.score = 0;

    this.setupGame();

    this.startScreenElem.classList.add("hide");
    if (this.audio1) this.audio1.pause();
    if (this.audio2) {
      this.audio2.currentTime = 0;
      this.audio2.play();
    }

    window.requestAnimationFrame(this.update);
  }

  handleLose() {
    this.player.setLoseImage();
    if (this.audio2) this.audio2.pause();

    setTimeout(() => {
      document.addEventListener("keydown", this.handleStart, { once: true });
      this.startScreenElem.classList.remove("hide");
    }, 100);
  }

  updateScore(delta) {
    // console.log("Updating score", { delta, score: this.score });
    this.score += delta * 0.01;
    if (this.scoreElem) {
      this.scoreElem.textContent = Math.floor(this.score);
    }
  }

  setPixelToWorldScale() {
    let worldToPixelScale;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
      worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
      worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    this.worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    this.worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
  }
}
