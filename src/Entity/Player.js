import { incrementCustomProperty, setCustomProperty, getCustomProperty } from "../updateCustomProperty";
import { JUMP_SPEED, GRAVITY, DINO_FRAME_COUNT, FRAME_TIME } from "../function/config";

export class Player {
  constructor(element) {
    // Player DOM element
    this.element = element;
    // state
    this.isJumping = false;
    this.dinoFrame = 0;
    this.currentFrameTime = 0;
    this.yVelocity = 0;

    this.setUpPlayer();
  }

  setUpPlayer() {
    this.isJumping = false;
    this.dinoFrame = 0;
    this.currentFrameTime = 0;
    this.yVelocity = 0;
    setCustomProperty(this.element, "--bottom", 0);
    document.removeEventListener("keydown", this.onJump);
    document.addEventListener("keydown", this.onJump);
  }

  updatePlayer(delta, speedScale) {
    this.handleRun(delta, speedScale);
    this.handleJump(delta);
  }

  getPlayerRect() {
    return this.element.getBoundingClientRect();
  }

  setPlayerLose() {
    this.element.src = "./src/assets/bronya-frames-png/out-1.png";
  }

  handleJump(delta) {
    if (!this.isJumping) return;

    incrementCustomProperty(this.element, "--bottom", this.yVelocity * delta);

    if (getCustomProperty(this.element, "--bottom") <= 0) {
      setCustomProperty(this.element, "--bottom", 0);
      this.isJumping = false;
    }

    this.yVelocity -= GRAVITY * delta;
  }

  onJump(e) {
    if (e.code !== "Space" || this.isJumping) return;

    this.yVelocity = JUMP_SPEED;
    this.isJumping = true;
  }

  handleRun(delta, speedScale) {
    if (this.isJumping) {
      this.element.src = `./src/assets/bronya-frames-png/out-5.png`;
      return;
    }

    if (this.currentFrameTime >= FRAME_TIME) {
      this.dinoFrame = (this.dinoFrame + 1) % DINO_FRAME_COUNT;
      this.element.src = `./src/assets/bronya-frames-png/out-${this.dinoFrame}.png`;
      this.currentFrameTime -= FRAME_TIME;
    }
    this.currentFrameTime += delta * speedScale;
  }

  getRect() {
    return this.element.getBoundingClientRect();
  }

  setLoseImage(imagePath) {
    this.element.src = imagePath;
  }
}