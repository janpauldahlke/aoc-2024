import fs from 'fs'

/**
 * problem 1
 */

type GuardPositionAndDir = [number, number, Direction] // x,y,Direction
type PatrolMap = string[][]
type GuardMoveResult = {
  updatedMap: PatrolMap;
  newGuard: GuardPositionAndDir;
  exited: boolean
}

enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST
}

interface DirectionInfo {
  symbol: string;
  dx: number;
  dy: number;
}

const directionMap: Record<Direction, DirectionInfo> = {
  [Direction.NORTH]: { symbol: '^', dx: 0, dy: -1 },
  [Direction.EAST]: { symbol: '>', dx: 1, dy: 0 },
  [Direction.SOUTH]: { symbol: 'v', dx: 0, dy: 1 },
  [Direction.WEST]: { symbol: '<', dx: -1, dy: 0 }
};

//---
const inputReader = (): PatrolMap => {
  const rawData = fs.readFileSync('input.txt', 'utf-8')
  return rawData.trim().split('\n').map((inner) => inner.split(''))
}

const findGuardPosition = (map: PatrolMap) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const el = map[y][x];
      switch (el) {
        case '^':
          return [x, y, Direction.NORTH] as GuardPositionAndDir;
        case '>':
          return [x, y, Direction.EAST] as GuardPositionAndDir;
        case 'v':
          return [x, y, Direction.SOUTH] as GuardPositionAndDir;
        case '<':
          return [x, y, Direction.WEST] as GuardPositionAndDir;
        default:
          continue;
      }
    }
  }

  console.error('Guard not found on the map.');
  process.exit(1);
}

//return new UpdatedMap
const move = (guard: GuardPositionAndDir, map: PatrolMap): GuardMoveResult => {
  const [x, y, dir] = guard;
  const { dx, dy } = directionMap[dir];
  const newX = x + dx;
  const newY = y + dy;


  //console.log(`guardPos at (${x}, ${y}) facing ${Direction[dir]}. try to move to (${newX}, ${newY})`);

  if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[0].length) {
    return { updatedMap: map, newGuard: guard, exited: true };
  }

  const cellAhead = map[newY][newX];

  let updatedDir = dir;
  let updatedX = x;
  let updatedY = y;

  //rock
  if (cellAhead === '#') {
    updatedDir = (dir + 1) % 4;
    //console.log(`rock  (${newX}, ${newY}). move right to ${Direction[updatedDir]}`);
  } else {

    updatedX = newX;
    updatedY = newY;

    //console.log(`move to (${updatedX}, ${updatedY})`);
    const updatedMap = map.map(row => row.slice());
    updatedMap[y][x] = 'X';
    updatedMap[updatedY][updatedX] = directionMap[updatedDir].symbol;
    return { updatedMap, newGuard: [updatedX, updatedY, updatedDir], exited: false };
  }

  const updatedMap = map.map(row => row.slice());
  updatedMap[y][x] = directionMap[updatedDir].symbol;

  return { updatedMap, newGuard: [updatedX, updatedY, updatedDir], exited: false };

}

const calculateTravelDistance = (guardPos: GuardPositionAndDir, map: PatrolMap) => {
  let updatedMap: PatrolMap = map;
  let updatedGuardPos: GuardPositionAndDir = guardPos;
  let exited = false;
  //let visitedCellsCount = 0;
  const uniqueVisitedCellsCunt: Set<String> = new Set()
  uniqueVisitedCellsCunt.add(`${guardPos[0]},${guardPos[1]}`)

  //acutal game loop
  while (!exited) {
    const result = move(updatedGuardPos, updatedMap);
    updatedMap = result.updatedMap;
    updatedGuardPos = result.newGuard;
    exited = result.exited;

    //console.log('travel move', updatedGuardPos)
    if (!exited) {
      if (!exited) {
        const posKey = `${updatedGuardPos[0]},${updatedGuardPos[1]}`;
        uniqueVisitedCellsCunt.add(posKey);
      }
    }

  }
  //console.log('endMap', updatedMap)
  return uniqueVisitedCellsCunt.size;
}

//----

const main = () => {
  console.log('run')
  const map = inputReader()
  const guardPos = findGuardPosition(map)
  const distanceTravelled = calculateTravelDistance(guardPos, map)
  console.log(distanceTravelled)
}

const test = () => {
  const expectedResult = 41;
  const underTest: PatrolMap = [
    "....#.....",
    ".........#",
    "..........",
    "..#.......",
    ".......#..",
    "..........",
    ".#..^.....",
    "........#.",
    "#.........",
    "......#..."
  ].map(line => line.split(''));


  const pos = findGuardPosition(underTest);
  const result = calculateTravelDistance(pos, underTest)

  console.assert(
    result === expectedResult,
    `failed: expecting ${expectedResult}, but got ${result}`
  )

  if (result === expectedResult) {
    console.log('passed', expectedResult, result);
  }
}

main();
//test()