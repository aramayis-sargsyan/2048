import { Graphics } from "pixi.js";
import { Number } from "../cell-number";
import { boardConfig } from "./board-config";
import { cell_collor } from "./constants";

export class Cell extends Graphics {
  number: Number;
  collor: number;
  constructor() {
    super();
  }

  build(cellWidth, num) {
    let i = Math.log(num) / Math.log(2) - 1;

    if (num === -1) {
      i = 1;
    } else if (num < 0) {
      i = 0;
    }

    if (num === 0) {
      this.collor = 0x999999;
    } else if (num === null) {
      this.collor = 0x777777;
    } else {
      this.collor = cell_collor[i];
    }

    this.beginFill(this.collor);
    this.drawRect(0, 0, cellWidth, cellWidth);
    this.endFill();

    this.pivot.x = this.width / 2;
    this.pivot.y = this.height / 2;

    if (num) {
      if (num === -1) {
        this.writeNumber(4);
      } else if (num < 0) {
        this.writeNumber(2);
      } else {
        this.writeNumber(num);
      }
    }
  }

  writeNumber(num) {
    this.number = new Number();
    this.number.cellNumber(num);
    this.addChild(this.number);
  }
}
