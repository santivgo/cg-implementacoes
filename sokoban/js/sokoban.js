import TileMap  from "./tilemap.js";

const cnv = document.querySelector("#sokobanCanvas")
const ctx = cnv.getContext("2d");
const tileSize = 32;
const tileMap = new TileMap(tileSize);

setInterval(gameLoop, 1000 / 60);


function gameLoop() {
    tileMap.draw(cnv, ctx);
}

