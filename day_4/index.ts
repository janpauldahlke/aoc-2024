import fs from 'fs';

/**
 * 
 * aims to solve problem 2
 */

const readInputIntoMatrice = (): string[][] => {

  const rawData = fs.readFileSync('input.txt', 'utf-8')
  const matrix = rawData.trim().split('\n').map(line => line.split(''));

  return matrix
}

const findXMasStarInMatrix = (matrix: string[][]) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let count = 0;

  const validCorners = [
    "MSMS", "MMSS", "SSMM", "SMSM",
    "SMSM", "SSMM", "MMSS", "MSMS"
  ];

  const isInBounds = (row: any, col: any) => row >= 0 && row < rows && col >= 0 && col < cols;

  const isValidXMas = (centerRow: any, centerCol: any) => {
    const topLeft = isInBounds(centerRow - 1, centerCol - 1) ? matrix[centerRow - 1][centerCol - 1] : '.';
    const topRight = isInBounds(centerRow - 1, centerCol + 1) ? matrix[centerRow - 1][centerCol + 1] : '.';
    const bottomLeft = isInBounds(centerRow + 1, centerCol - 1) ? matrix[centerRow + 1][centerCol - 1] : '.';
    const bottomRight = isInBounds(centerRow + 1, centerCol + 1) ? matrix[centerRow + 1][centerCol + 1] : '.';

    const center = isInBounds(centerRow, centerCol) ? matrix[centerRow][centerCol] : '.';

    const corners = topLeft + topRight + bottomLeft + bottomRight;
    return center === 'A' && validCorners.includes(corners);
  };

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (isValidXMas(row, col)) {
        count++;
      }
    }
  }

  return count;
};


const main = () => {

  const matrix = readInputIntoMatrice();
  const wordCount = findXMasStarInMatrix(matrix)
  console.log('xmas count', wordCount)
}

main()


// -- Region Test

const debugFindXMasStarInMatrix = (matrix: string[][]): number => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let count = 0;

  const xMasOffsets = [
    [-1, -1], // Top-left
    [-1, 1],  // Top-right
    [0, 0],   // Center
    [1, -1],  // Bottom-left
    [1, 1],   // Bottom-right
  ];

  const isInBounds = (row: number, col: number): boolean => {
    return row >= 0 && row < rows && col >= 0 && col < cols;
  };

  const isValidXMas = (centerRow: number, centerCol: number): boolean => {
    const positions = xMasOffsets.map(([dr, dc]) => [
      centerRow + dr,
      centerCol + dc,
    ]);

    if (positions.some(([r, c]) => !isInBounds(r, c))) {
      return false;
    }

    const chars = positions.map(([r, c]) => matrix[r][c]);

    const isValid = (
      chars[2] === 'A' && // Center must be 'A'
      (
        (chars[0] === 'M' && chars[1] === 'S' && chars[3] === 'M' && chars[4] === 'S') || // Forward X-MAS
        (chars[0] === 'S' && chars[1] === 'M' && chars[3] === 'S' && chars[4] === 'M')    // Backward X-MAS
      )
    );

    if (!isValid) {
      console.log(`Failed at center (${centerRow}, ${centerCol}):`, chars);
    }

    return isValid;
  };

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (isValidXMas(row, col)) {
        console.log(`Valid X-MAS at center (${row}, ${col})`);
        count++;
      }
    }
  }

  return count;
};

const testFindXMasStarOccurrences = () => {
  const testMatrix = [
    [".", "M", ".", "S", ".", ".", ".", ".", ".", "."],
    [".", ".", "A", ".", ".", "M", "S", "M", "S", "."],
    [".", "M", ".", "S", ".", "M", "A", "A", ".", "."],
    [".", ".", "A", ".", "A", ".", "S", "M", "S", "M"],
    [".", "M", ".", "S", ".", "M", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ["S", ".", "S", ".", "S", ".", "S", ".", "S", "."],
    [".", "A", ".", "A", ".", "A", ".", "A", ".", "A"],
    ["M", ".", "M", ".", "M", ".", "M", ".", "M", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ];

  const expectedCount = 9;
  const actualCount = findXMasStarInMatrix(testMatrix);

  console.log(`Test Result: ${actualCount === expectedCount ? "Passed" : "Failed"}`);
  console.log(`Expected: ${expectedCount}, Actual: ${actualCount}`);
};

testFindXMasStarOccurrences();