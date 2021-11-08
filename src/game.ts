import * as PIXI from "pixi.js";

export class Game extends PIXI.Application {
  x: number[];
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x444444,
    });

    document.body.appendChild(this.view);

    this.ticker.add(this._update, this);
    this.ticker.start();
    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.load();
  }

  _onLoadComplete() {
    console.log(7);
  }

  _resize(width?, height?) {
    width = width || window.innerWidth;
    height = height || window.innerHeight;

    this._resizeCanvas(width, height);
    this._resizeRenderer(width, height);
  }

  _resizeCanvas(width, height) {
    const { style } = this.renderer.view;

    style.width = width + "px";
    style.height = height + "px";
  }

  _resizeRenderer(width, height) {
    this.renderer.resize(width, height);
  }

  _update() {}
}
