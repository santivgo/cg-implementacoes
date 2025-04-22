import TileMap from "./tilemap.js";

const tileSize = 32;

const cnv = document.querySelector("#sokobanCanvas");
const ctx = cnv.getContext("2d");
const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer();
const stones = tileMap.getStones();

setInterval(gameLoop, 1000 / 60);

let finished = false;

function gameLoop() {
  tileMap.draw(cnv, ctx);
  player.draw(ctx);
  tileMap.stones.forEach((stone) => {
    stone.draw(ctx);
  });

  if (tileMap.stones.length === 0 && !finished) {
    finished = !finished;
    setTimeout(() => {
      alert("Parabéns, você ganhou!! seu jumento");
      location.reload();
    }, 100);
  }
}
