import fs from 'fs'

/**
 * problem 2
 * 
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

const simulateAddingRocks = (pMap: PatrolMap, guardPos: GuardPositionAndDir) => {
  let validPositionsCount = 0;

  for (let y = 0; y < pMap.length; y++) {
    for (let x = 0; x < pMap[y].length; x++) {
      // not empty cell, not guard start itself
      if (pMap[y][x] !== '.' || (x === guardPos[0] && y === guardPos[1])) {
        continue;
      }

      //console.log('pMap', pMap[y])
      // new rock
      pMap[y][x] = '#';
      //console.log('pMap', pMap[y])

      const causesLoop = detectInfinitePatrol(guardPos, pMap);
      if (causesLoop) validPositionsCount = validPositionsCount + 1; //++
      //remove new rock form map after this
      pMap[y][x] = '.';
    }
  }

  return validPositionsCount;
}

//return new UpdatedMap
const move = (guard: GuardPositionAndDir, map: PatrolMap): GuardMoveResult => {
  const [x, y, dir] = guard;
  const { dx, dy } = directionMap[dir];
  const newX = x + dx;
  const newY = y + dy;

  if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[0].length) {
    return { updatedMap: map, newGuard: guard, exited: true };
  }

  const cellAhead = map[newY][newX];
  if (cellAhead === '#') {
    const updatedDir = (dir + 1) % 4;
    return { updatedMap: map, newGuard: [x, y, updatedDir], exited: false };
  }

  return { updatedMap: map, newGuard: [newX, newY, dir], exited: false };
}

const detectInfinitePatrol = (guardPos: GuardPositionAndDir, map: PatrolMap): boolean => {
  let updatedGuardPos: GuardPositionAndDir = guardPos;
  let exited = false;
  const visitedStates: Set<string> = new Set();

  while (!exited) {
    const stateKey = `${updatedGuardPos[0]},${updatedGuardPos[1]},${updatedGuardPos[2]}`;
    if (visitedStates.has(stateKey)) {
      return true;
    }
    visitedStates.add(stateKey);

    const result = move(updatedGuardPos, map);
    updatedGuardPos = result.newGuard;
    exited = result.exited;
  }

  return false;
};

//----

const main = () => {
  //console.log('run')
  const map = inputReader()
  const guardPos = findGuardPosition(map)
  const validRockPlacements = simulateAddingRocks(map, guardPos);
  console.log('validRockPositionToPrevenParadox', validRockPlacements)
}


main();
