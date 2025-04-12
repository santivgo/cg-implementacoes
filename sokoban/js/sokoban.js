import TileMap  from "./tilemap.js";


const tileSize = 32;

const cnv = document.querySelector("#sokobanCanvas")
const ctx = cnv.getContext("2d");
const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer()
const stone = tileMap.getStones()

setInterval(gameLoop, 1000 / 60);


function gameLoop() {
    tileMap.draw(cnv, ctx);
    player.draw(ctx)
    stone.forEach(stone => {
        stone.draw(ctx)
    });
}

