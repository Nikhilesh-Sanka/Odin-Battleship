class Ship {
  constructor(name, length, coordinates) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.coordinates = coordinates;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    return this.hits === this.length ? true : false;
  }
}

class GameBoard {
  constructor(coord1, coord2, coord3, coord4, coord5) {
    this.carrier = new Ship("carrier", 5, coord5);
    this.battleship = new Ship("battleship", 4, coord4);
    this.destroyer = new Ship("destroyer", 3, coord3);
    this.submarine = new Ship("submarine", 3, coord2);
    this.patrolBoat = new Ship("patrol-boat", 2, coord1);
    this.ships = [
      this.carrier,
      this.battleship,
      this.destroyer,
      this.submarine,
      this.patrolBoat,
    ];
    this.sunkenShips = [];
    this.missedHits = [];
    this.hitCoordinates = [];
  }
  receiveAttack(coord) {
    for (let ship of this.ships) {
      if (ship.coordinates.some((coordinates) => (coord = coordinates))) {
        ship.hit();
        this.hitCoordinates.push(coord);
        if (ship.isSunk()) {
          this.ships = this.ships.filter(
            (aliveShip) => aliveShip.name !== ship.name
          );
          this.sunkenShips.push(ship);
        }
        return;
      }
    }
    this.missedHits.push(coord);
  }
  isGameOver() {
    return this.ships.length === 0;
  }
}

class Player {
  constructor(name, coord1, coord2, coord3, coord4, coord5) {
    this.name = name;
    this.gameBoard = new GameBoard(coord1, coord2, coord3, coord4, coord5);
  }
}
