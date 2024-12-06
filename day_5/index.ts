/**
 * problem 1
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

const returnMiddlePage = (data: Data) => {
  const validUpdates = data.updates.filter((update) => {
    return isOrderValid(update, data.rules)
  })

  let sum = 0;
  for (const update of validUpdates) {
    const middlePage = update[Math.floor(update.length / 2)];
    sum += middlePage;
  }
  return sum;
}



const main = () => {
  const data = inputReader()
  //console.log('hello 5', data)
  console.log(returnMiddlePage(data))

}

main()