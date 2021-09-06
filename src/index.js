module.exports = function solveSudoku(matrix) {
  const findZero = (matrix) => {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (matrix[x][y] === 0) {
          return [x, y];
        }
      }
    }
    return false;
  };

  const checkNumber = (num, position, matrix) => {
    let [x, y] = position;
    for (let i = 0; i < 9; i++) {
      if(matrix[x][i] === num && i !== y) return false;
      if(matrix[i][y] === num && i !== x) return false;
    }
    return true;
  };

  const checkBox = (num, position, matrix) => {
    let [x, y] = position;
    const box = [0 , 0];
    for( let i = 0; i < 2; i++) {
      if (position[i] >= 0 && position[i] <= 2) box[i] = 0;
      if (position[i] >= 3 && position[i] <= 5) box[i] = 3;
      if (position[i] >= 6 && position[i] <= 8) box[i] = 6;
    }
    for(let i = box[0]; i < 3; i++) {
      for(let j = box[1]; j < 3; j++) {
        if(matrix[i][j] === num && i !== x && j !== y) return false;
      }
    }
    return true;
  }

  const solver = () => {
    const position = findZero(matrix);
    if (position === false) return matrix;
    for (let i = 1; i < 10; i++) {
      const num = i;
      const checkedNum = checkNumber(num, position, matrix) && checkBox(num, position, matrix);
      if (checkedNum) {
        let [x, y] = position;
        matrix[x][y] = num;
        if(solver()) {
          return true;
        }
        matrix[x][y] = 0;
      }
    }
  };
  solver();
  return matrix;
};
