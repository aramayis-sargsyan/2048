import { Cell } from "./cell";
import { NumberCellComponent } from "../number-cell-component";

export class NumberCell extends Cell {
  cellNumber: NumberCellComponent;
  index: number[];
  public text: number;
  constructor(w, num) {
    super(w, num);
    this.index = null;
    this.text = num;
    this.writeNumber(num);
  }

  writeNumber(num) {
    this.cellNumber = new NumberCellComponent();
    this.cellNumber.cellNumber(num);
    this.addChild(this.cellNumber);
  }
}
