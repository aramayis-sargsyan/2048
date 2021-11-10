import { Container } from "pixi.js";
import { Cell } from "./cell";
import { NumberCell } from "./number-cell";
import { boardConfig } from "./board-config";
import { cell_collor } from "./constants";
import { getRandomInRange } from "../utils";
import gsap from "gsap";
import { Circ } from "gsap/gsap-core";

export class Board extends Container {
  board: Cell;
  backCells: Cell[];
  bool: boolean;
  newCells: NumberCell[];
  // matrix: number[][];

  constructor() {
    super();
    this.backCells = [];
    this.newCells = [];
    // this.matrix = [];
  }

  build() {
    const { cell_width, cell_length, cell_gap } = boardConfig;
    this.board = new Cell(
      (cell_width + cell_gap) * cell_length + cell_gap,
      0.5
    );
    this.board.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.addChild(this.board);
    document.addEventListener("keydown", (e) => this.onKeyDown(e));
    document.addEventListener("keyup", () => this.onKeyUp());
  }

  buildBackCell() {
    const { cell_width, cell_length, cell_gap } = boardConfig;
    for (let j = 0; j < cell_length; j++) {
      let arr = [];
      for (let i = 0; i < cell_length; i++) {
        arr.push(0);
        const backCell = new Cell(cell_width, 1);
        backCell.position.set(
          cell_gap + cell_width / 2 + (cell_gap + cell_width) * i,
          cell_gap + cell_width / 2 + (cell_gap + cell_width) * j
        );
        this.backCells.push(backCell);
        this.newCells.push(null);
        this.board.addChild(backCell);
      }
      // this.matrix.push(arr);
    }
  }

  buildNewCell(num, index) {
    const { cell_width, cell_length } = boardConfig;

    const emptyCells = [];
    for (let i = 0; i < this.newCells.length; i++) {
      if (this.newCells[i] === null) {
        emptyCells.push(i);
      }
    }

    const emptyCellsIndex = getRandomInRange(0, emptyCells.length);
    let backCellsIndex = emptyCells[emptyCellsIndex];
    if (index) {
      backCellsIndex = index;
    }

    const newCell = new NumberCell(cell_width, num);
    newCell.position.set(
      this.backCells[backCellsIndex].position.x,
      this.backCells[backCellsIndex].position.y
    );

    newCell.index = backCellsIndex;
    this.newCells[backCellsIndex] = newCell;
    this.board.addChild(newCell);

    // this.matrix[Math.floor(backCellsIndex / cell_length)][
    //   backCellsIndex % cell_length
    // ] = num;
  }

  transferNewCell(key) {
    const { cell_length } = boardConfig;

    for (let i = 0; i < cell_length; i++) {
      let x = 0;
      for (let j = 0; j < cell_length; j++) {
        if (this.newCells[cell_length * i + j]) {
          if (x > 0) {
            this.joinCell(x, i, j);
          } else {
            gsap.to(this.newCells[cell_length * i + j], {
              x: this.backCells[i * cell_length + x].position.x,
              duration: 0.5,
              ease: Circ.easeOut,
            });
            this.newCells[i * cell_length + x] =
              this.newCells[cell_length * i + j];
            if (j != x) {
              this.newCells[cell_length * i + j] = null;
            }
            x++;

            // console.log(this.newCells);
          }
        }
      }
    }
    this.buildNewCell(2, null);
  }

  joinCell(x, i, j) {
    const { cell_length } = boardConfig;

    if (
      this.newCells[cell_length * i + j].text ===
      this.newCells[cell_length * i + x - 1].text
    ) {
      gsap.to(this.newCells[cell_length * i + j], {
        x: this.backCells[i * cell_length + x - 1].position.x,
        duration: 0.5,
        ease: Circ.easeOut,
      });

      this.newCells[cell_length * i + j].destroy();

      // this.newCells[i * cell_length + x].destroy();
      if (j != x) {
        this.newCells[cell_length * i + j] = null;
      }
      x++;
      console.log(j);
      console.log(i);

      console.log(this.newCells[cell_length * i + j]);

      this.buildNewCell(
        this.newCells[cell_length * i + j].text * 2,
        i * cell_length + x - 1
      );
      console.log(6);
    }
  }

  onKeyDown(key) {
    this.transferNewCell(key);
  }

  onKeyUp() {}
}
