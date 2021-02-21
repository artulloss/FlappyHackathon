import {
  Loader,
  Application,
  Sprite,
  AnimatedSprite,
  Spritesheet,
} from "pixi.js";
import state from "./gameState";
import { boxesIntersect, pickColors } from "./utilities";

const WIDTH = window.innerWidth / 3;
const HEIGHT = window.innerHeight;
const PIPE_GAP = 400;

let app: Application;
let bird: AnimatedSprite;
let pipes: Sprite[] = [];
let base: Sprite;
let startScreen: Sprite;
let sheet: Spritesheet;
let backgroundScene: string;
let pipeColor: string;
let gameState: state = state.START_SCREEN;

const onInteract = () => {
  if (gameState === state.START_SCREEN) {
    startGame();
  }
  if (gameState === state.END_SCREEN) return;
  bird.y -= 10;
  for (let i = 0; i < 15; i++) {
    setTimeout(() => (bird.y -= 7), 50);
  }
};

const gravity = () => {
  bird.y += 3;
};

const endGame = () => {
  gameState = state.END_SCREEN;
  app.ticker.remove(runningLoop);
  // Show game over :P
  let gameOver = new Sprite(sheet.textures["gameover"]);
  gameOver.anchor.set(0.5);
  gameOver.x = app.view.width / 2;
  gameOver.y = app.view.height / 3;
  app.stage.addChild(gameOver);
  bird.stop();
  setTimeout(() => {
    app.stage.removeChild(gameOver, ...pipes);
    pipes = [];
    startScreen.visible = true;
    bird.visible = false;
    gameState = state.START_SCREEN;
  }, 1000);
};

const movePipes = () => {
  const SPEED = 5;
  if (boxesIntersect(bird, base)) endGame();
  for (let pipe of pipes) {
    console.log({ base });
    if (boxesIntersect(bird, pipe)) {
      endGame();
    }
    pipe.x -= SPEED;
    if (pipe.x + pipe.width <= 0) {
      pipe.x = app.view.width;
    }
    if (base.x + base.width <= 0) {
      base.x = app.view.width;
    }
  }
};

const runningLoop = () => {
  console.log(new Date().getSeconds());
  // Gravity - Push the Bird sprite downwards
  gravity();
  // Move the pipes to the left, move pipe on the left once it goes out of the viewport to the right of the screen and keep cycling pipes
  movePipes();
  // Increment score when bird goes in between pipes
  // Stop loop when bird collides with pipe
};

const generatePipes = () => {
  const VERTICAL_OFFSET = 0;
  const RANDOM_RANGE = 175;
  pipes[0] = new Sprite(sheet.textures[`pipe-${pipeColor}`]);
  pipes[0].angle = 180;
  pipes[1] = new Sprite(sheet.textures[`pipe-${pipeColor}`]);
  pipes[1].y += pipes[0].y + pipes[1].height + PIPE_GAP;
  pipes[2] = new Sprite(sheet.textures[`pipe-${pipeColor}`]);
  pipes[2].x += app.view.width / 2 + pipes[0].width / 2;
  pipes[3] = new Sprite(sheet.textures[`pipe-${pipeColor}`]);
  pipes[2].angle = 180;
  pipes[3].x += app.view.width / 2 + pipes[0].width / 2;
  pipes[3].y += pipes[2].y + pipes[3].height + PIPE_GAP;
  const offsetFirst = Math.random() * RANDOM_RANGE - 100;
  const offsetSecond = Math.random() * RANDOM_RANGE - 100;
  pipes[0].y += offsetFirst;
  pipes[1].y += offsetFirst;
  pipes[2].y += offsetSecond;
  pipes[3].y += offsetSecond;

  for (let pipe of pipes) {
    pipe.x += app.view.width;
    pipe.y += VERTICAL_OFFSET;
    pipe.width *= 1.22;
    pipe.height *= 1.5;
    pipe.anchor.set(0.5);
    app.stage.addChildAt(pipe, 1);
  }
};

const startGame = () => {
  startScreen.visible = false;
  bird.visible = true;
  gameState = state.RUNNING;
  bird.play();
  setTimeout(generatePipes, 3000);
  app.ticker.add(runningLoop);
};

const setup = () => {
  // Canvas Setup

  app = new Application({
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 0xf00,
  });

  document.body.querySelector("#app")!.appendChild(app.view);

  // Randomize colors

  let birdColor = pickColors("yellow", "red", "blue");
  pipeColor = pickColors("green", "red");
  backgroundScene = pickColors("day", "night");

  // Load Textures

  sheet = Loader.shared.resources["assets/spritesheet.json"]
    .spritesheet as Spritesheet; // Possibility that this is undefined

  let background = new Sprite(sheet.textures[`background-${backgroundScene}`]);
  background.width = app.view.width;
  background.height = app.view.height;
  app.stage.addChild(background);

  base = new Sprite(sheet.textures["base"]);
  base.anchor.set(0, 1);
  base.y = app.view.height;
  base.width = app.view.width;
  base.height *= 1.2;
  app.stage.addChild(base);

  console.log(sheet.animations.yellowbird);
  bird = new AnimatedSprite(sheet.animations[`${birdColor}bird`]);
  bird.animationSpeed = 0.2;

  bird.x = WIDTH / 2;
  bird.y = HEIGHT / 2;
  bird.anchor.set(0.5);
  bird.visible = false;

  startScreen = new Sprite(sheet.textures["message"]);
  startScreen.anchor.set(0.5);
  startScreen.x = app.view.width / 2;
  startScreen.y = app.view.height / 3;

  app.stage.addChild(bird);
  app.stage.addChild(startScreen);

  document.body.addEventListener("keydown", (e) => {
    if (e.key === " ") onInteract();
  });
  document.body.addEventListener("mousedown", onInteract);
};

Loader.shared.add("assets/spritesheet.json").load(setup);
