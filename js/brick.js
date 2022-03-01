//maybe document object is available to all classes
import { detectCollision, PositionDetection} from './collisionDetection.js';
import { BRICK_WIDTH, BRICK_HEIGHT } from './constants.js';
export default class Brick{
	constructor(game, position, hardness){
		this.game = game;		// now the game obj is accessible in other function of this class
		this.width =  BRICK_WIDTH;
		this.height = BRICK_HEIGHT;
		this.hardness = hardness;
		this.image = this.getImage(hardness); 
		this.position = position;
		this.ballPreviousState;
		this.ballCurrentState;
	}

	draw(ctx){
		ctx.beginPath();
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
		ctx.closePath();		
	}

	update(){
		this.ballCurrentState = {
			position:{
				x:this.game.ball.position.x.toFixed(2),
				y:this.game.ball.position.y.toFixed(2)
			}
		};


		if(detectCollision(this.ballCurrentState, this)){
			console.warn("Collision Detected");
			
			let posDetector = new PositionDetection(this.ballPreviousState, this.ballCurrentState, this);
			let point = posDetector.intersectionPoint();	//point contains 3 properties : {x: X,y: Y,side: "LEFT"};
			if(point !== null){
				console.error("SIDE IS : "+point.side);
				this.game.ball.collidedToBrick(point);
				this.game.stats.incrementScore();
				this.hardness--;
				this.image = this.getImage(this.hardness);
			}
			else{
				console.error("null");
			}	
		}
		this.ballPreviousState = {
			position:{
				x:this.game.ball.position.x.toFixed(2),
				y:this.game.ball.position.y.toFixed(2)
			}
		};
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
