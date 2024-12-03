/**
 * 
 * Problem 1
 */

const fs = require('fs')
//const left = [7, 2, 5, 3];
//const right = [10, 4, 6, 8];


const rawData = fs.readFileSync('input.txt', 'utf-8')

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

  console.log(calculateSimilarityScore(left, right))

}


// The first number in the left list is 3. It appears in the right list three times, so the similarity score increases by 3 * 3 = 9.
// The second number in the left list is 4. It appears in the right list once, so the similarity score increases by 4 * 1 = 4.
// The third number in the left list is 2. It does not appear in the right list, so the similarity score does not increase (2 * 0 = 0).
// The fourth number, 1, also does not appear in the right list.
// The fifth number, 3, appears in the right list three times; the similarity score increases by 9.
// The last number, 3, appears in the right list three times; the similarity score again increases by 9.

const calculateSimilarityScore = (a1, a2) => {
  const occuranceMap = a1.map(leftVal => {
      const count = a2.filter(rightVal => rightVal === leftVal).length;
      return leftVal * count; 
  });

  return occuranceMap.reduce((total, num) => total + num, 0);
};


main();
