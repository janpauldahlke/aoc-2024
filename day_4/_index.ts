import fs from 'fs';

/**
 * 
 * aims to solve problem 1
 */

const readInputIntoMatrice = (): string[][] => {

  const rawData = fs.readFileSync('input.txt', 'utf-8')
  const matrix = rawData.trim().split('\n').map(line => line.split(''));

  return matrix
}

enum Direction {
  HorizontalRight = "0,1",
  HorizontalLeft = "0,-1",
  VerticalDown = "1,0",
  VerticalUp = "-1,0",
  DiagonalDownRight = "1,1",
  DiagonalUpLeft = "-1,-1",
  DiagonalDownLeft = "1,-1",
  DiagonalUpRight = "-1,1",
}

const parseDirection = (direction: Direction): [number, number] => {
  return direction.split(',').map(Number) as [number, number];
};

const getAllDirections = (): [number, number][] => {
  return Object.values(Direction).map(parseDirection);
};

const findWordOccurrences = (matrix: string[][]): number => {
  //what we are looking for
  const word = 'XMAS'
  const directions = getAllDirections();
  const wordLength = word.length;
  const rows = matrix.length;
  const cols = matrix[0].length;
  let count = 0;


  const isInBounds = (row: number, col: number): boolean => {
    return row >= 0 && row < rows && col >= 0 && col < cols;
  };

  const doesWordFit = (startRow: number, startCol: number, rowStep: number, colStep: number): boolean => {
    for (let index = 0; index < wordLength; index++) {
      const currentRow = startRow + rowStep * index;
      const currentCol = startCol + colStep * index;

      if (!isInBounds(currentRow, currentCol)) {
        return false;
      }

      if (matrix[currentRow][currentCol] !== word[index]) {
        return false;
      }
    }

    return true;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [dr, dc] of directions) {
        if (doesWordFit(row, col, dr, dc)) {
          count++;
        }
      }
    }
  }

  return count;
};

const main = () => {

  const matrix = readInputIntoMatrice();
  //const directions = getAllDirections()
  const wordCount = findWordOccurrences(matrix)


  //console.log('run main', matrix)
  console.log('xmas count', wordCount)
}

main()