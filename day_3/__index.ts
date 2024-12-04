/**
 * 
 * aims to solve problem one
 */

import fs from 'fs';

const inputReader = () => {
  return fs.readFileSync('input.txt', 'utf-8')
}

const findCorrectMulExpressions = (rawData: string) => {
  const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

  const results: Array<{ x: number; y: number }> = [];
  const matchers = rawData.matchAll(pattern)

  Array.from(matchers).forEach(match => {
    results.push({
      x: parseInt(match[1], 10),
      y: parseInt(match[2], 10),
    });
  });
  return results;
}

const mulitplyElements = (elementArray: { x: number; y: number }[]): number => {
  let sum = 0;
  elementArray.forEach((el: { x: number, y: number }) => {
    const innerSum = el.x * el.y
    sum = sum + innerSum
  })
  return sum
}

const main = () => {

  const data = inputReader()
  const findings = findCorrectMulExpressions(data)
  const sum = mulitplyElements(findings)
  console.log(sum)
}


main()