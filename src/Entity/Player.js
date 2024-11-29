import { incrementCustomProperty, setCustomProperty, getCustomProperty } from "../function/updateCustomProperty";
import { JUMP_SPEED, GRAVITY, DINO_FRAME_COUNT, FRAME_TIME } from "../function/config";
import loseFrame from "../assets/bronya-frames/out-1.png";
import jumpFrame from "../assets/bronya-frames/out-5.png";
const runFrames = [];
for (let i = 0; i < 11; i++) {
  runFrames.push(
    new URL(`../assets/bronya-frames/out-${i}.png`, import.meta.url).href
  );
}

export default class Player {
  constructor(element) {
    // Player DOM element
    this.element = element;
    // state
    this.isJumping = false;
    this.dinoFrame = 0;
    this.currentFrameTime = 0;
    this.yVelocity = 0;
    this.onJump = this.onJump.bind(this);
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
      this.element.src = jumpFrame;
      return;
    }

    if (this.currentFrameTime >= FRAME_TIME) {
      this.dinoFrame = (this.dinoFrame + 1) % DINO_FRAME_COUNT;
      this.element.src = runFrames[this.dinoFrame];
      this.currentFrameTime -= FRAME_TIME;
    }
    this.currentFrameTime += delta * speedScale;
  }

  getRect() {
    return this.element.getBoundingClientRect();
  }

  setLoseImage() {
    this.element.src = loseFrame;
  }
}