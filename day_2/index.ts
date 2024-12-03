/**
 * 
 * problem 2
  
*/

import fs from 'fs';

const getDataFromRawInput = (): number[][] => {
  const rawData = fs.readFileSync('input.txt', 'utf-8');
  return rawData
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.split(/\s+/).map(Number));
};

const isReportSafe = (report: number[]): boolean => {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }
    if (diff > 0) isDecreasing = false;
    if (diff < 0) isIncreasing = false;
  }

  const isreportUnsafe = (isIncreasing || isDecreasing);

  if (isreportUnsafe) return isFailedReportRecoverable(report)

  return isIncreasing || isDecreasing;
};

const analyseLogEntries = (data: number[][]): number => {
  return data.filter(report => isReportSafe(report) || isFailedReportRecoverable(report)).length;
};

const isFailedReportRecoverable = (report: number[]): boolean => {
  for (let i = 0; i < report.length; i++) {

    const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
    if (isReportSafe(modifiedReport)) {
      return true;
    }
  }
  return false;
};

const main = () => {
  const data = getDataFromRawInput();
  const countSafeReports = analyseLogEntries(data);
  console.log(countSafeReports);
};

main();
