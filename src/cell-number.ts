import { Container, Text, TextStyle } from "pixi.js";
import { boardConfig } from "./board/board-config";

export class Number extends Container {
  style: TextStyle;
  number: number;
  constructor() {
    super();

    this.number = 0;
    this.style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 50,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: ["#ffffff"],
    });
  }

  cellNumber(number) {
    this.number = number;
    const { cell_width } = boardConfig;
    let text = new Text(`${this.number}`, this.style);
    text.pivot.x = text.width / 2;
    text.pivot.y = text.height / 2;
    text.position.set(cell_width / 2, cell_width / 2);
    this.addChild(text);
  }
}
