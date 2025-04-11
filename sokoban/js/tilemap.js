import Player from "./player.js";
import MovingDirection from "./moviment.js";

export default class TileMap {

    constructor(tileSize) {
        this.tileSize = tileSize;

        this.floor = this.#image('floor.png')
        this.wall = this.#image('wall.png')
        this.stone = this.#image('stone.png')
        this.player = this.#image('player.png')
        this.hole = this.#image('hole.png')


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
        img.src = `../img/${file}`
        return img
    }
    #setCanvasSize(canvas){
        canvas.height = this.map.length * this.tileSize
        canvas.width = this.map[0].length * this.tileSize
    }
    #clearCanvas(canvas, ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(0,0,canvas.width, canvas.height)

    }

    #drawMap(ctx){
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                const tile = this.map[row][column]
                let image = null;

                switch(tile){
                    case 1:
                        image = this.wall;
                        break
                    case 0:
                        image = this.floor;
                        break
                    case 2:
                        image = this.player;
                        break
                    case 3:
                        image = this.stone;
                        break
                    case 4: 
                        image = null;
                        break
                }

                ctx.strokeStyle = "yellow"
                ctx.strokeRect(
                    column* this.tileSize,
                    row*this.tileSize,
                    this.tileSize, this.tileSize
                )

                if(image != null){
                    ctx.drawImage(image, column * this.tileSize,
                row * this.tileSize,
                this.tileSize, this.tileSize)
                }
           
            }
        }
    }





    getPlayer(velocity){
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                const tile = this.map[row][column];
                if(tile === 2){
                    this.map[row][column] = 0
                    return new Player(
                        column*this.tileSize,
                        row*this.tileSize,
                        this.tileSize, velocity, this
                    )
                }
            }
        }
    }

    draw(canvas, ctx) {
        this.#setCanvasSize(canvas)
        this.#clearCanvas(canvas, ctx)
        this.#drawMap(ctx)
    }

    collide(x, y, moviment){
        if(Number.isInteger(x/this.tileSize) && Number.isInteger(y/this.tileSize)){
            let column = 0
            let row = 0
            let nextColumn = 0
            let nextRow = 0

            switch(MovingDirection[moviment]){
                case 'up':
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break
                case 'down':
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break
                case 'left':
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;    
                    row = y / this.tileSize;
                    break
                case 'right':
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;    
                    row = y / this.tileSize;
                    break
            }
            const tile = this.map[row][column];
            if(tile === 1 || tile === 3){
                return true
            }
        }

        return false
    }
}