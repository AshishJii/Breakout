import {RIGHTARROW_KEYCODE, LEFTARROW_KEYCODE, ESC_KEYCODE, SPACE_KEYCODE} from './constants.js';
export default class Paddle{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.width = 75;
        this.height = 10;

        this.moveSpeed = 50;
        this.currentSpeed = 0;
        
        this.position = {
            x: (game.gameWidth - this.width)/2,
            y: game.gameHeight - this.height - 10
        }
        this.previousTimestamp;
    }


    moveLeft(){
        this.currentSpeed = -this.moveSpeed;
    }

    moveRight(){
        this.currentSpeed = this.moveSpeed;
    }

    stopMoving(){
        this.currentSpeed = 0;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        //ctx.fillStyle = color;
        //ctx.fill();
        ctx.closePath();
    }

    update(timestamp){

        let dl = timestamp - this.previousTimestamp;
        this.previousTimestamp = timestamp;

        if(isNaN(dl)){
            this.position.x = this.position.x + this.currentSpeed;
        }

        else{
            this.position.x = this.position.x + this.currentSpeed*dl/100;
        }

        if(this.position.x < 0) 
            this.position.x = 0;
        if(this.position.x + this.width > this.gameWidth)
            this.position.x = this.gameWidth - this.width;
    }
}