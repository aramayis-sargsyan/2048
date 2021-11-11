import { boardConfig } from "./board/board-config";

export const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getEmptyCells = (newCell, index) => {
  const { cell_width, cell_length } = boardConfig;
  const emptyCells = [];
  for (let i = 0; i < cell_length; i++) {
    for (let j = 0; j < cell_length; j++) {
      if (newCell[i][j] === null) {
        emptyCells.push([i, j]);
      }
    }
  }
  const emptyCellsIndex = getRandomInRange(0, emptyCells.length);
  let backCellsIndex = emptyCells[emptyCellsIndex];
  if (index !== null) {
    backCellsIndex = index;
  }
  return backCellsIndex;
};

export const getRandomNumber = () => {
  const num = Math.random();
  if (num < 0.1) {
    return 4;
  } else {
    return 2;
  }
};

export const rotateMatrix = (key, matrix) => {
  const { cell_length } = boardConfig;

  const newMatrix = [];
  for (let i = cell_length - 1; i >= 0; i--) {
    let arr = [];

    for (let j = 0; j < cell_length; j++) {
      arr.push(matrix[j][i]);
    }

    newMatrix.push(arr);
  }
  key -= 1;

  if (key === 0) {
    return newMatrix;
  } else {
    return rotateMatrix(key, newMatrix);
  }
};
