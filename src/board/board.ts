import { Container } from "pixi.js";
import { Cell } from "./cell";
import { boardConfig } from "./board-config";
import { cell_collor } from "./constants";
import { getRandomInRange } from "../utils";
import gsap from "gsap";
import { Circ } from "gsap/gsap-core";

export class Board extends Container {
  board: Cell;
  matrix: Cell[][];
  backCells: Cell[];
  bool: boolean;
  newCell: Cell;

  constructor() {
    super();
    this.matrix = [];
    this.backCells = [];
    this.bool = false;
    this.newCell = null;
  }

  build() {
    const { cell_width, cell_length, cell_gap } = boardConfig;
    this.board = new Cell();
    this.board.build((cell_width + cell_gap) * cell_length + cell_gap, 0);
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
      return this.newCell === null;
    });
    let i = Math.floor(getRandomInRange(0, emptyCells.length));
    if (num === null) {
      number = Math.ceil(getRandomInRange(-10, -1));
    }

    // if (cell) {
    //   cell.newCell = new Cell();
    //   cell.newCell.build(cell_width, number);
    //   cell.newCell.position.set(cell.width / 2, cell.height / 2);
    //   cell.addChild(cell.newCell);
    // } else {
    this.newCell = new Cell();
    this.newCell.build(cell_width, number);
    console.log(8);

    this.newCell.position.set(
      emptyCells[i].position.x,
      emptyCells[i].position.y
    );
    this.board.addChild(this.newCell);
    // }
  }

  transferCell(keyCode) {
    const { cell_length } = boardConfig;
    this.bool = false;

    for (let i = 0; i < cell_length; i++) {
      for (let j = 0; j < cell_length; j++) {
        if (keyCode === 37) {
          this.joinCell(1, 0, i, j);
        } else if (keyCode === 38) {
          this.joinCell(0, 1, j, i);
        }
      }
    }

    for (let i = cell_length - 1; i >= 0; i--) {
      for (let j = cell_length - 1; j >= 0; j--) {
        if (keyCode === 39) {
          this.joinCell(-1, 0, i, j);
        } else if (keyCode === 40) {
          this.joinCell(0, -1, j, i);
        }
      }
    }
  }

  joinCell(keyCodeX, keyCodeY, i, j) {
    const { cell_length } = boardConfig;

    if (keyCodeX === 1 && j === 0) {
      return;
    }
    if (keyCodeX === -1 && j === cell_length - 1) {
      return;
    }
    if (keyCodeY === 1 && i === 0) {
      return;
    }
    if (keyCodeY === -1 && i === cell_length - 1) {
      return;
    }

    if (this.newCell) {
      // console.log(this.position.x);
      // console.log(this.matrix[i - keyCodeY][j - keyCodeX].position.x);
      console.log(this);
      if (this.newCell) {
        this.bool = true;

        gsap.to(this.newCell, {
          x: 280,
          duration: 2,
          ease: Circ.easeOut,
        });

        // console.log(this.newCell);
        // console.log(this.matrix[i - keyCodeY][j - keyCodeX]);

        // this.buildNewCell(
        //   this.newCell.number.number,
        //   this.matrix[i - keyCodeY][j - keyCodeX]
        // );
        // this.newCell.destroy();
        // this.newCell = null;

        j = j - keyCodeX;
        i = i - keyCodeY;

        this.joinCell(keyCodeX, keyCodeY, i, j);
        // } else {
        //   if (this.newCell.number.number === this.newCell.number.number) {
        //     this.bool = true;
        //     // this.newCell.destroy();
        //     // this.newCell = null;
        //     console.log(7);
        //     this.buildNewCell(
        //       this.newCell.number.number * 2,
        //       this.matrix[i - keyCodeY][j - keyCodeX]
        //     );
        //     this.newCell.destroy();
        //     this.newCell = null;
        // }
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
