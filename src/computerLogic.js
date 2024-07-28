function getComputerChoice(gameBoard) {
  let hits = gameBoard.hits;
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
        hits.every((damageHit) => damageHit !== hit) &&
        missedHits.every((missedHit) => missedHit !== hit)
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
      hits.every((damageHit) => damageHit !== currentChoice) &&
      missedHits.every((missedHit) => missedHit !== currentChoice)
        ? currentChoice
        : undefined;
  }
  return randomHit;
}
