export function getComputerChoice(gameBoard) {
  let hits = gameBoard.hitCoordinates;
  let missedHits = gameBoard.missedHits;
  let lastHit = hits[hits.length - 1];
  if (lastHit !== undefined) {
    let intelligentHits = [
      [lastHit[0] - 1, lastHit[1]],
      [lastHit[0], lastHit[1] - 1],
      [lastHit[0] + 1, lastHit[1]],
      [lastHit[0], lastHit[1] + 1],
    ];
    let intelligentHit = intelligentHits.find((hit) => {
      return (
        hit[0] >= 0 &&
        hit[1] >= 0 &&
        hit[0] <= 9 &&
        hit[1] <= 9 &&
        hits.every(
          (damageHit) => damageHit[0] !== hit[0] || damageHit[1] !== hit[1]
        ) &&
        missedHits.every(
          (missedHit) => missedHit[0] !== hit[0] || missedHit[1] !== hit[1]
        )
      );
    });
    if (intelligentHit !== undefined) {
      return intelligentHit;
    }
  }
  let randomHit;
  while (!randomHit) {
    let currentChoice = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    randomHit =
      hits.every(
        (damageHit) =>
          damageHit[0] !== currentChoice[0] || damageHit[1] !== currentChoice[1]
      ) &&
      missedHits.every(
        (missedHit) =>
          missedHit[0] !== currentChoice[0] || missedHit[1] !== currentChoice[1]
      )
        ? currentChoice
        : undefined;
  }
  return randomHit;
}
export function getComputerBoardSelection() {
  let chosenArray = [];
  let tempArray = [5, 4, 3, 3, 2];
  let currentIndex = 0;
  while (currentIndex < 5) {
    let randomRow = Math.floor(Math.random() * 10);
    let randomColumn = Math.floor(
      Math.random() * (11 - tempArray[currentIndex])
    );
    if (
      canShipBePlaced(
        tempArray[currentIndex],
        [randomRow, randomColumn],
        chosenArray
      )
    ) {
      let shipPositionArray = [];
      for (
        let i = randomColumn;
        i < randomColumn + tempArray[currentIndex];
        i++
      ) {
        shipPositionArray.push([randomRow, i]);
      }
      chosenArray.push(shipPositionArray);
      currentIndex++;
    }
  }
  return chosenArray;
}
export function extractCoordinates(classList) {
  return [parseInt(classList[1].slice(1)), parseInt(classList[2].slice(1))];
}

export function canShipBePlaced(shipLength, coordinates, chosenArray) {
  let doesLengthNotOverflow = coordinates[1] <= 10 - shipLength;
  let doesShipNotOverLap = chosenArray.every((shipPosition) => {
    if (shipPosition[0][0] !== coordinates[0]) {
      return true;
    } else {
      return (
        coordinates[1] + shipLength < shipPosition[0][1] ||
        shipPosition[shipPosition.length - 1][1] + 1 < coordinates[1]
      );
    }
  });
  return doesLengthNotOverflow && doesShipNotOverLap;
}
