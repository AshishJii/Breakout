//maybe document object is available to all classes
import { detectCollision } from './collisionDetection.js';
import { BRICK_WIDTH, BRICK_HEIGHT } from './constants.js';
export default class Brick{
	constructor(game, position){
		this.game = game;		// now the game obj is accessible in other function of this class
		this.width =  BRICK_WIDTH;
		this.height = BRICK_HEIGHT;
		this.image = document.querySelector("#img_brick"); // how did document object came here? i think it is accesible in all classes
		this.position = position;
		this.markedForRemoval = false;
	}

	draw(ctx){
			ctx.beginPath();
			ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
			ctx.closePath();		
	}

	update(){
			if(detectCollision(this.game.ball, this)){
				this.game.ball.collidedToBrick();
				this.game.stats.incrementScore();
				this.markedForRemoval = true;
			}
		}
	}