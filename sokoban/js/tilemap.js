import Player from "./player.js";
import Stone from "./stone.js";
import MovingDirection from "./moviment.js";

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.floor = this.#image("floor.png");
    this.wall = this.#image("wall.png");
    this.stone = this.#image("stone.png");
    this.player = this.#image("player.png");
    this.hole = this.#image("hole.png");
    this.stones = [];
  }

  // 1 - parede
  // 0 - caminho
  // 2 - boneco
  // 3 - blocos arrastaveis
  // 4 - buracos
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 3, 0, 1, 0, 4, 0, 1, 0, 3, 0, 1, 0, 4, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 4, 0, 1, 0, 3, 0, 1, 0, 4, 0, 1, 0, 3, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  #image(file) {
    const img = new Image();
    img.src = `../img/${file}`;
    return img;
  }
  #setCanvasSize(canvas) {
    canvas.height = this.map.length * this.tileSize;
    canvas.width = this.map[0].length * this.tileSize;
  }
  #clearCanvas(canvas, ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  #drawMap(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        let image = null;

        switch (tile) {
          case 1:
            image = this.wall;
            break;
          case 0:
            image = this.floor;
            break;
          case 2:
            image = this.player;
            break;
          case 3:
            image = this.stone;
            break;
          case 4:
            image = this.hole;
            break;
        }

        ctx.strokeStyle = "yellow";
        ctx.strokeRect(
          column * this.tileSize,
          row * this.tileSize,
          this.tileSize,
          this.tileSize
        );

        if (image != null) {
          ctx.drawImage(
            image,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }
  }

  getPlayer() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        if (tile === 2) {
          this.map[row][column] = 0;
          return new Player(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this
          );
        }
      }
    }
  }

  getStones() {
    const stones = [];
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        if (tile === 3) {
          this.map[row][column] = 0;
          stones.push(
            new Stone(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this
            )
          );
        }
      }
    }
    this.stones = stones;
    return stones;
  }

  draw(canvas, ctx) {
    this.#setCanvasSize(canvas);
    this.#clearCanvas(canvas, ctx);
    this.#drawMap(ctx);
  }

  collide(x, y, moviment) {
    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (MovingDirection[moviment]) {
        case "up":
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case "down":
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case "left":
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case "right":
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
      }

      const tile = this.map[row][column];

      if (tile === 1) {
        return true;
      }

      const hasStone = this.stones.find(
        (stone) =>
          stone.x === column * this.tileSize && stone.y === row * this.tileSize
      );

      if (hasStone) {
        let behindColumn = column;
        let behindRow = row;

        switch (MovingDirection[moviment]) {
          case "up":
            behindRow--;
            break;
          case "down":
            behindRow++;
            break;
          case "left":
            behindColumn--;
            break;
          case "right":
            behindColumn++;
            break;
        }

        const tileBehind = this.map[behindRow][behindColumn];
        const stoneBehind = this.stones.find(
          (stone) =>
            stone.x === behindColumn * this.tileSize &&
            stone.y === behindRow * this.tileSize
        );

        const canMoveStone =
          (tileBehind === 0 || tileBehind === 4) && !stoneBehind;

        if (canMoveStone) {
          if (tileBehind === 4) {
            this.map[behindRow][behindColumn] = 0;
            this.stones = this.stones.filter((stone) => stone !== hasStone);
          } else {
            hasStone.x = behindColumn * this.tileSize;
            hasStone.y = behindRow * this.tileSize;
          }

          return false;
        } else {
          return true;
        }
      }
    }

    return false;
  }
}
