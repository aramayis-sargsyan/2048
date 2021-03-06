import { Container } from "pixi.js";
import { Cell } from "./cell";
import { NumberCell } from "./number-cell";
import { boardConfig } from "./board-config";
import { getEmptyCells, getRandomNumber, rotateMatrix } from "../utils";
import gsap from "gsap";
import { Circ } from "gsap/gsap-core";

export class Board extends Container {
  board: Cell;
  backCells: Cell[][];
  bool: boolean;
  newCells: NumberCell[][];

  constructor() {
    super();
    this.backCells = [];
    this.newCells = [];
  }

  build() {
    const { cell_width, cell_length, cell_gap } = boardConfig;
    this.board = new Cell(
      (cell_width + cell_gap) * cell_length + cell_gap,
      0.5
    );
    this.board.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.addChild(this.board);
  }

  setKeyListeners() {
    document.addEventListener("keydown", (e) => this.onKeyDown(e), {
      once: true,
    });
    document.addEventListener("keyup", (e) => this.onKeyUp(e), { once: true });
  }

  buildBackCell() {
    const { cell_width, cell_length, cell_gap } = boardConfig;
    for (let j = 0; j < cell_length; j++) {
      let arrCell = [];
      let arrBackell = [];
      for (let i = 0; i < cell_length; i++) {
        const backCell = new Cell(cell_width, 1);
        backCell.position.set(
          cell_gap + cell_width / 2 + (cell_gap + cell_width) * i,
          cell_gap + cell_width / 2 + (cell_gap + cell_width) * j
        );
        this.board.addChild(backCell);
        arrBackell.push(backCell);
        arrCell.push(null);
      }
      this.backCells.push(arrBackell);
      this.newCells.push(arrCell);
    }
  }

  buildNewCell(num, index) {
    const { cell_width } = boardConfig;

    const emptyIndex = getEmptyCells(this.newCells, index);
    if (num === null) {
      num = getRandomNumber();
    }

    const newCell = new NumberCell(cell_width, num);
    newCell.position.set(
      this.backCells[emptyIndex[0]][emptyIndex[1]].position.x,
      this.backCells[emptyIndex[0]][emptyIndex[1]].position.y
    );
    newCell.index = emptyIndex;
    this.newCells[emptyIndex[0]][emptyIndex[1]] = newCell;
    this.board.addChild(newCell);
  }

  getTransferCell(key) {
    const { cell_length } = boardConfig;
    if (key.keyCode > 37 && key.keyCode <= 40) {
      this.backCells = rotateMatrix(key.keyCode - 37, this.backCells);
      this.newCells = rotateMatrix(key.keyCode - 37, this.newCells);
    }

    const promises = [];
    for (let i = 0; i < cell_length; i++) {
      let x = 0;
      for (let j = 0; j < cell_length; j++) {
        if (this.newCells[i][j] && x === 0) {
          x += this.firstCellTransfer(x, i, j, promises);
        } else if (this.newCells[i][j]) {
          if (this.newCells[i][x - 1].text === this.newCells[i][j].text) {
            x += this.cellJoin(x, i, j, promises);
          } else {
            x += this.cellTransfer(x, i, j, promises);
          }
        }
      }
    }

    Promise.all(promises).then(() => {
      console.log(7);

      this.backCells = rotateMatrix(41 - key.keyCode, this.backCells);
      this.newCells = rotateMatrix(41 - key.keyCode, this.newCells);

      this.buildNewCell(null, null);
      this.setKeyListeners();
      console.log(this.newCells);
    });
  }

  firstCellTransfer(x, i, j, promises) {
    console.log(1);

    const { cell_length } = boardConfig;

    let prom = new Promise((resolve) => {
      console.log(x);
      gsap.to(this.newCells[i][j], {
        x: this.backCells[i][x].position.x,
        y: this.backCells[i][x].position.y,
        duration: 0.2,
        ease: Circ.easeOut,
        onComplete: () => {
          if (j !== x && this.newCells[i][j] === this.newCells[i][x]) {
            this.newCells[i][j] = null;
          }
          resolve(0);
        },
      });
      this.newCells[i][x] = this.newCells[i][j];
    });
    promises.push(prom);
    return 1;
  }

  cellTransfer(x, i, j, promises) {
    let prom = new Promise((resolve) => {
      gsap.to(this.newCells[i][j], {
        x: this.backCells[i][x].position.x,
        y: this.backCells[i][x].position.y,
        duration: 0.2,
        ease: Circ.easeOut,
        onComplete: () => {
          this.newCells[i][x] = this.newCells[i][j];
          if (j !== x) {
            this.newCells[i][j] = null;
          }
          resolve(0);
        },
      });
      console.log(x);

      console.log(this.newCells[i][x - 1].text);
    });
    promises.push(prom);
    return 1;
  }

  cellJoin(x, i, j, promises) {
    let prom = new Promise((resolve) => {
      gsap.to(this.newCells[i][j], {
        x: this.backCells[i][x - 1].position.x,
        y: this.backCells[i][x - 1].position.y,
        duration: 0.2,
        ease: Circ.easeOut,
        onComplete: () => {
          this.newCells[i][x - 1].destroy();
          console.warn(x);
          console.warn(this.newCells[i][x - 1].text);
          this.buildNewCell(this.newCells[i][x - 1].text, [i, x - 1]);

          this.newCells[i][j].destroy();
          this.newCells[i][j] = null;
          resolve(0);
        },
      });

      this.newCells[i][x - 1].text *= 2;
      console.log(x);
      console.log(this.newCells[i][x - 1].text);
    });
    promises.push(prom);

    return 0;
  }

  onKeyDown(key) {
    this.getTransferCell(key);
  }

  onKeyUp(key) {}
}
