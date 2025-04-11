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

        document.addEventListener("keydown", this.#keydown.bind(this))
        document.addEventListener("keyup", this.#keyup)

        this.#loadPlayerImage();    
    }

    draw(ctx){
        ctx.drawImage(this.playerImg,this.x, this.y, this.size, this.size)
    }

    #loadPlayerImage(){
        this.playerImg = new Image();
        this.playerImg.src = "/img/player.png"
    }



    #keydown = (event)=> {

        switch(event.keyCode){
            case 87:
                this.y -= this.size
                break;
            case 83:
                this.y += this.size
                break;
            case 65: 
                this.x -= this.size
                break;
            case 68: 
                this.x += this.size
                break;
    }
    }
    #keyup = (event)=> {

        switch(event.keyCode){
            case 87:
                this.upPressed = false
                break;
            case 83:
                this.downPressed = false
                break;
            case 65: 
                this.leftPressed = false
                break;
            case 68: 
                this.rightPressed = false
                break;
    }

    }


}
