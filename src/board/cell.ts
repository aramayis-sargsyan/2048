import { Graphics } from "pixi.js";
import { cell_collor } from "./constants";

export class Cell extends Graphics {
  constructor(cellWidth, num) {
    super();
    this._build(cellWidth, num);
  }

  _build(cellWidth, num) {
    let colorIndex = Math.log(num) / Math.log(2) + 1;
    this.beginFill(cell_collor[colorIndex]);
    this.drawRect(0, 0, cellWidth, cellWidth);
    this.endFill();
    this.pivot.set(this.width / 2, this.height / 2);
  }
}
