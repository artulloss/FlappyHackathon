import {
  Loader,
  Application,
  Sprite,
  AnimatedSprite,
  Spritesheet,
} from "pixi.js";
import { BaseSprite } from "./baseSprite";

const WIDTH = window.innerWidth / 3;
const HEIGHT = window.innerHeight;

let app: Application;
let bird: AnimatedSprite;
let pipes: Sprite[];
let sheet: Spritesheet;
let pipeColor: string;

const onInteract = () => {
  bird.y -= 10;
  for (let i = 0; i < 15; i++) {
    setTimeout(() => (bird.y -= 7), 50);
  }
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

  pipeColor = Math.random() - 0.5 > 0 ? "green" : "red";

  // Load Textures

  sheet = Loader.shared.resources["assets/spritesheet.json"]
    .spritesheet as Spritesheet; // Possibility that this is undefined

  console.log(sheet.animations.yellowbird);
  bird = new AnimatedSprite(sheet.animations["yellowbird"]);
  bird.animationSpeed = 0.2;
  bird.play();

  app.ticker.add(runningLoop);

  bird.x = WIDTH / 2;
  bird.y = HEIGHT / 2;
  bird.anchor.set(0.5, 0.5);

  app.stage.addChild(bird);

  document.body.addEventListener("keydown", onInteract);
  document.body.addEventListener("mousedown", onInteract);

  startGame();
};

const startGame = () => {
  // TODO - Things that should happen once the game is over and needs to be reset, or at the beginning of the game - not sure
};

Loader.shared.add("assets/spritesheet.json").load(setup);

const gravity = () => {
  bird.y += 3;
};

const runningLoop = () => {
  // Gravity - Push the Bird sprite downwards
  gravity();
  // Move the pipes to the left, move pipe on the left once it goes out of the viewport to the right of the screen and keep cycling pipes
  // Increment score when bird goes in between pipes
  // Stop loop when bird collides with pipe
};

const generatePipes = () => {
  pipes[0] = new Sprite(sheet.textures["pipe-green"]);
};
