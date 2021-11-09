import * as PIXI from "pixi.js";
import { Board } from "./board/board";
import { cell_collor } from "./board/constants";

export class Game extends PIXI.Application {
  _board: Board;
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xdddddd,
    });

    document.body.appendChild(this.view);

    this.ticker.add(this._update, this);
    this.ticker.start();
    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.load();
  }

  _onLoadComplete() {
    this._buildBoard();
    this._board.buildNewCell(null, null);
    // this._board.buildNewCell(null, null);
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

  _buildBoard() {
    this._board = new Board();
    this._board.build();
    this._board.buildEmptyCell();
    this.stage.addChild(this._board);
  }

  _update() {}
}
