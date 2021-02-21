import { Application, Sprite, Texture } from "pixi.js";
import { BaseSprite } from "./baseSprite";

const WIDTH = window.innerWidth / 3;
const HEIGHT = window.innerHeight;

let app = new Application({
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: 0xf00,
});

document.body.querySelector("#app")!.appendChild(app.view);

let bird = new Sprite(Texture.from("/assets/sprites/yellowbird_01.png"));
let pipe = new Sprite(Texture.from("/assets/sprites/pipe-green.png"));

const gravity = () => {
  bird.y += 4;
};

const runningLoop = () => {
  gravity();
  // Gravity - Push the Bird sprite downwards
  // Move the pipes to the left, move pipe on the left once it goes out of the viewport to the right of the screen and keep cycling pipes
  // Increment score when bird goes in between pipes
  // Stop loop when bird collides with pipe
};

app.ticker.add(runningLoop);

bird.x = WIDTH / 2;
bird.y = HEIGHT / 2;
bird.anchor.set(0.5, 0.5);

app.stage.addChild(bird);

document.body.addEventListener("keydown", () => {
  bird.y -= 15;
  for (let i = 0; i < 5; i++) {
    setTimeout(() => (bird.y -= 7), 50);
  }
});
