import { Sprite } from "pixi.js";

const boxesIntersect = (a: Sprite, b: Sprite): boolean => {
  var ab = a.getBounds();
  var bb = b.getBounds();
  return (
    ab.x + ab.width > bb.x &&
    ab.x < bb.x + bb.width &&
    ab.y + ab.height > bb.y &&
    ab.y < bb.y + bb.height
  );
};

const pickColors = (...colors: string[]) => {
  return colors[~~(Math.random() * colors.length)];
};

export { boxesIntersect, pickColors };
