import { Application } from "pixi.js";

let app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xf00,
});

document.body.querySelector("#app")!.appendChild(app.view);

const runningLoop = () => {
  // Gravity - Push the Bird sprite downwards
  // Move the pipes to the left, move pipe on the left once it goes out of the viewport to the right of the screen and keep cycling pipes
  // Increment score when bird goes in between pipes
  // Stop loop when bird collides with pipe
};

app.ticker.add(runningLoop);
