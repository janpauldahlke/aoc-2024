/**
 * problem 2
 *
 */

import fs from 'fs';

interface Data {
  rules: number[][],
  updates: number[][]
}

const inputReader = () => {
  const rawData = fs.readFileSync('input.txt', 'utf-8')
  const rules = rawData.split('\n\n')[0].split('\n').map(line => line.split('|').map(Number));
  const updates = rawData.split('\n\n')[1].split('\n').map(line => line.split(',').map(Number));

  return {
    rules,
    updates
  }
}

const isOrderValid = (update: number[], rules: number[][]): boolean => {
  const pageOrder = new Map(update.map((page, index) => [page, index]));
  return rules.every(([x, y]) => {
    if (pageOrder.has(x) && pageOrder.has(y)) {
      return pageOrder.get(x)! < pageOrder.get(y)!;
    }
    return true;
  });
};

const reorderUpdates = (update: number[], rules: number[][]): number[] => {
  //create copy to compare after changes
  let copySorted = [...update];

  let changedPages = true;
  while (changedPages) {
    changedPages = false;
    for (const [x, y] of rules) {
      const posX = copySorted.indexOf(x);
      const posY = copySorted.indexOf(y);

      if (posX !== -1 && posY !== -1 && posX > posY) {
        [copySorted[posX], copySorted[posY]] = [copySorted[posY], copySorted[posX]];
        changedPages = true;
      }
    }
  }

  return copySorted;
};

const incorrectPageSum = (data: Data): number => {
  const incorrectUpdates = data.updates.filter(update => !isOrderValid(update, data.rules));

  let summe = 0;
  for (const update of incorrectUpdates) {

    //console.log('sorting', reorderUpdates(update, data.rules))

    const fixedUpdate = reorderUpdates(update, data.rules);
    const middlePage = fixedUpdate[Math.floor(fixedUpdate.length / 2)];
    summe += middlePage;
  }

  return summe;
};



const main = () => {
  const data = inputReader()
  //console.log('hello 5', data)
  //console.log(returnMiddlePageSum(data))

  console.log('incorrectPageSum', incorrectPageSum(data))

}


main()

// Region -- test

const test = () => {
  const expect = 123;
  //const expect = 1337;
  const data = {
    "rules": [
      [47, 53],
      [97, 13],
      [97, 61],
      [97, 47],
      [75, 29],
      [61, 13],
      [75, 53],
      [29, 13],
      [97, 29],
      [53, 29],
      [61, 53],
      [97, 53],
      [61, 29],
      [47, 13],
      [75, 47],
      [97, 75],
      [47, 61],
      [75, 61],
      [47, 29],
      [75, 13],
      [53, 13]
    ],
    "updates": [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
      [75, 97, 47, 61, 53],
      [61, 13, 29], [97, 13, 75, 29, 47]
    ]
  }

  // const incorrectUpdates = data.updates.filter(update => !isOrderValid(update, data.rules));
  // const correctedUpdates = incorrectUpdates.map(update => reorderUpdates(update, data.rules));

  // let sum = 0;
  // for (const update of correctedUpdates) {
  //   const middlePage = update[Math.floor(update.length / 2)];
  //   sum += middlePage;
  // }

  const sum = incorrectPageSum(data)

  console.assert(sum === expect, `expecting ${expect}, but getting ${sum}`);
}

test()