/**
 * 
 * Problem 1
 */

const fs = require('fs')
//const left = [7, 2, 5, 3];
//const right = [10, 4, 6, 8];


const rawData = fs.readFileSync('input.txt', 'utf-8')
const [left, right] = rawData.split('\n').reduce(
  ([leftArr, rightArr], line) => {
      if (line.trim()) {
          const [leftValue, rightValue] = line.split(/\s+/).map(Number);
          leftArr.push(leftValue);
          rightArr.push(rightValue);
      }
      return [leftArr, rightArr];
  },
  [[], []]
);


const main = () => { 

  
  const [left, right] = rawData.split('\n').reduce(
    ([leftArr, rightArr], line) => {
        if (line.trim()) {
            const [leftValue, rightValue] = line.split(/\s+/).map(Number);
            leftArr.push(leftValue);
            rightArr.push(rightValue);
        }
        return [leftArr, rightArr];
    },
    [[], []]
  );

  console.log(calculateDistance(left, right))

}

const calculateDistance = (a1, a2) => { 
  a1.sort((a, b) => a - b);
  a2.sort((a, b) => a - b);


  const totalDistance = a1.reduce((sum, value, index) => {
      return sum + Math.abs(value - a2[index]);
  }, 0);

  return totalDistance;
}

main(); 
