import MovingDirection from "./moviment.js";
export default class Player{
    constructor(x,y,size,vel, tileMap){
        this.x=x;
        this.y=y;
        this.size=size;
        this.vel=vel;
        this.tileMap=tileMap;
        
        this.currentMovimentDirection = null;
        this.requestedMovimentDirection = null;

        // document.addEventListener("keydown". this.#keydown)
        this.#loadPlayerImage();    
    }

    draw(ctx){
        this.#move()
        ctx.drawImage(this.playerImg,this.x, this.y, this.size, this.size)
    }

    #loadPlayerImage(){
        this.playerImg = new Image();
        this.playerImg.src = "/img/player.png"
    }

    #move(){

    }

    #keydown = (event)=> {
        if(event.keycode == 87){
            if(this.currentMovimentDirection == MovingDirection.down)
                this.currentMovimentDirection = MovingDirection.up;
            this.requestedMovimentDirection = MovingDirection.up;
        } // up
        if(event.keycode == 83){
            if(this.currentMovimentDirection == MovingDirection.up)
                this.currentMovimentDirection = MovingDirection.down;
            this.requestedMovimentDirection = MovingDirection.down;
        } // down 
        if(event.keycode == 65){
            if(this.currentMovimentDirection == MovingDirection.right)
            this.currentMovimentDirection = MovingDirection.left;
        this.requestedMovimentDirection = MovingDirection.left;
        } // left 
        if(event.keycode == 68){
            if(this.currentMovimentDirection == MovingDirection.left)
            this.currentMovimentDirection = MovingDirection.right;
        this.requestedMovimentDirection = MovingDirection.right;
        } // right
    }



}
