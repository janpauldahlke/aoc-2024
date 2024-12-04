/**
 * 
 * 
 * problem 2
 */

import fs from 'fs';

const inputReader = () => {
  return fs.readFileSync('input.txt', 'utf-8');
};

const findCorrectMulExpressionIncludingDoAndDont = (rawData: string) => {
  const pattern = /(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/g;
  const matches = rawData.matchAll(pattern);
  return Array.from(matches);
};

const multiplyBasedOnInstructions = (instructions: RegExpMatchArray[]) => {
  let isEnabled = true;
  let totalSum = 0;

  instructions.forEach(match => {
    const instruction = match[0];

    if (instruction === 'do()') {
      isEnabled = true;
    } else if (instruction === "don't()") {
      isEnabled = false;
      //ensures existance of match[2] && match[3]
    } else if (instruction.startsWith('mul(') && match[2] && match[3]) {
      const x = parseInt(match[2], 10);
      const y = parseInt(match[3], 10);
      if (isEnabled) {
        totalSum += x * y;
      } else {
        console.log('skpped', x, y)
      }
    }
  });

  return totalSum;
};

const main = () => {
  const rawData = inputReader();
  const instructions = findCorrectMulExpressionIncludingDoAndDont(rawData);
  const result = multiplyBasedOnInstructions(instructions);
  console.log(result);
};

main();


//region -- Test

//from example
const testInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
const expectedSum = 48;

const runTest = (input: string, expected: number) => {
  const instructions = findCorrectMulExpressionIncludingDoAndDont(input);
  const result = multiplyBasedOnInstructions(instructions);

  console.log(`test input: ${input}`);
  console.log(`expect: ${expected}, actual: ${result}`);
  console.log(result === expected ? 'Passed' : 'Failed');
};

//runTest(testInput, expectedSum);