export default class Stone {
    constructor(x,y,tileSize, tilemap){
        this.x = x
        this.y = y
        this.tileSize = tileSize
        this.tilemap = tilemap
        this.#loadStoneImage();
    }

      #loadStoneImage(){
        this.stoneImg = new Image();
        this.stoneImg.src = "/img/stone.png"
        this.image = this.stoneImg
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
    }
}