import { Sprite, Texture } from "pixi.js";
export default class BaseSprite {
  private sprite: Sprite;

  constructor(public x: number, public y: number, texturePath: string) {
    this.sprite = new Sprite(Texture.from(texturePath));
  }

  getSprite(): Sprite {
    return this.sprite;
  }

  getTexture(): Texture {
    return this.sprite.texture;
  }
}
