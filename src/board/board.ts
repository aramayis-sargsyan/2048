import { Container } from "pixi.js";
import { Cell } from "./cell";
import { boardConfig } from "./board-config";
import { cell_collor } from "./constants";
import { getRandomInRange } from "../utils";

export class Board extends Container {
  board: Cell;
  matrix: Cell[][];
  backCells: Cell[];
  bool: boolean;
  constructor() {
    super();
    this.matrix = [];
    this.backCells = [];
    this.bool = false;
  }

  build() {
    const { board_width } = boardConfig;
    this.board = new Cell();
    this.board.build(board_width, 0);
    this.board.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.addChild(this.board);
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  buildEmptyCell() {
    const { cell_width, cell_length, cell_gap } = boardConfig;
    for (let j = 0; j < cell_length; j++) {
      let arr = [];
      for (let i = 0; i < cell_length; i++) {
        const cell = new Cell();
        cell.build(cell_width, null);
        cell.position.set(
          cell_gap + cell_width / 2 + (cell_gap + cell_width) * i,
          cell_gap + cell_width / 2 + (cell_gap + cell_width) * j
        );
        arr.push(cell);
        this.backCells.push(cell);
        this.board.addChild(cell);
      }
      this.matrix.push(arr);
    }
  }

  buildNewCell(num, cell) {
    const { cell_width } = boardConfig;
    let number = num;

    const emptyCells = this.backCells.filter((cell) => {
      return cell.newCell === null;
    });
    let i = Math.floor(getRandomInRange(0, emptyCells.length));
    if (num === null) {
      number = Math.ceil(getRandomInRange(-10, -1));
    }

    if (cell) {
      cell.newCell = new Cell();
      console.log(number);
      cell.newCell.build(cell_width, number);
      cell.newCell.position.set(cell.width / 2, cell.height / 2);
      cell.addChild(cell.newCell);
    } else {
      emptyCells[i].newCell = new Cell();
      console.log(number);
      emptyCells[i].newCell.build(cell_width, number);
      emptyCells[i].newCell.position.set(
        emptyCells[i].width / 2,
        emptyCells[i].height / 2
      );
      emptyCells[i].addChild(emptyCells[i].newCell);
    }
  }

  transferCell(keyCode) {
    this.bool = false;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (keyCode === 37) {
          this.joinCell(1, 0, i, j);
        } else if (keyCode === 38) {
          this.joinCell(0, 1, j, i);
        }
      }
    }

    for (let i = 3; i >= 0; i--) {
      for (let j = 3; j >= 0; j--) {
        if (keyCode === 39) {
          this.joinCell(-1, 0, i, j);
        } else if (keyCode === 40) {
          this.joinCell(0, -1, j, i);
        }
      }
    }
  }

  joinCell(keyCodeX, keyCodeY, i, j) {
    if (keyCodeX === 1 && j === 0) {
      return;
    }
    if (keyCodeX === -1 && j === 3) {
      return;
    }
    if (keyCodeY === 1 && i === 0) {
      return;
    }
    if (keyCodeY === -1 && i === 3) {
      return;
    }

    if (this.matrix[i][j].newCell) {
      if (!this.matrix[i - keyCodeY][j - keyCodeX].newCell) {
        this.bool = true;
        console.log(this.matrix[i][j].newCell.number.number);

        this.buildNewCell(
          this.matrix[i][j].newCell.number.number,
          this.matrix[i - keyCodeY][j - keyCodeX]
        );
        this.matrix[i][j].newCell.destroy();
        this.matrix[i][j].newCell = null;
        j = j - keyCodeX;
        i = i - keyCodeY;
        this.joinCell(keyCodeX, keyCodeY, i, j);
      } else {
        if (
          this.matrix[i - keyCodeY][j - keyCodeX].newCell.number.number ===
          this.matrix[i][j].newCell.number.number
        ) {
          this.bool = true;
          this.matrix[i - keyCodeY][j - keyCodeX].newCell.destroy();
          this.matrix[i - keyCodeY][j - keyCodeX].newCell = null;
          this.buildNewCell(
            this.matrix[i][j].newCell.number.number * 2,
            this.matrix[i - keyCodeY][j - keyCodeX]
          );
          this.matrix[i][j].newCell.destroy();
          this.matrix[i][j].newCell = null;
        }
      }
    }
  }

  onKeyDown(key) {
    this.transferCell(key.keyCode);
    if (this.bool) {
      this.buildNewCell(null, null);
    }
  }

  onKeyUp() {}
}
