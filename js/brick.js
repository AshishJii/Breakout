//maybe document object is available to all classes
import { detectCollision } from './collisionDetection.js';
import { BRICK_WIDTH, BRICK_HEIGHT } from './constants.js';
export default class Brick{
	constructor(game, position, hardness){
		this.game = game;		// now the game obj is accessible in other function of this class
		this.width =  BRICK_WIDTH;
		this.height = BRICK_HEIGHT;
		this.hardness = hardness;
		this.image = this.getImage(hardness); 
		this.position = position;
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
			this.hardness--;
			this.image = this.getImage(this.hardness);
		}
	}

	getImage(hardness){
		switch(hardness){
			case 0: 
			return null;
			case 1:
			return document.querySelector("#img_brick1");	// how did document object came here? i think it is accesible in all classes
			case 2:
			return document.querySelector("#img_brick2");
		}
	}
}