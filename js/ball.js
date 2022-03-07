//maybe document object is available to all classes
import { detectCollision } from './collisionDetection.js';
import { BALL_SPEED,BALL_WIDTH, BALL_HEIGHT } from './constants.js';
export default class Ball{
	constructor(game){
		this.game = game;		// now the game obj is accessible in other function of this class
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		//this.width = 40;
		//this.height = 40;
		this.width = BALL_WIDTH;
		this.height = BALL_HEIGHT;
		this.speed = BALL_SPEED;
		
		this.image = document.querySelector("#img_ball"); // how did document object came here
		this.resetAll();
	}

	resetTimestamp(){
		this.previousTimestamp = NaN;
	}

	resetAll(){
		this.position = {
			x: this.game.gameWidth/2, // - this.width)/2,
			y: this.game.gameHeight - 20 //this.height - 20
		}
		this.currentSpeed = {
			x: -Math.sqrt((Math.pow(this.speed,2)/2)),
			y: -Math.sqrt((Math.pow(this.speed,2)/2))
		}
		this.previousTimestamp = NaN;
	}

	
	draw(ctx){
		ctx.beginPath();
		ctx.drawImage(this.image, this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);
		ctx.closePath();
	}

	update(timestamp){
		let dl = timestamp - this.previousTimestamp;
		this.previousTimestamp = timestamp;

		//moving distance according to time passed since last frame
		//helps making ball speed platform independent(not depenent on device frame rate)
		if(isNaN(dl)){
			this.position.x = this.position.x + this.currentSpeed.x*15/100;
			this.position.y = this.position.y + this.currentSpeed.y*15/100;
		}

		else{
			this.position.x = this.position.x + this.currentSpeed.x*dl/100;
			this.position.y = this.position.y + this.currentSpeed.y*dl/100;
		}

		//wall on left
		if(this.position.x < this.width/2){
			this.currentSpeed.x = -this.currentSpeed.x;
			this.position.x = this.width/2;
		}
		//wall on right
		if(this.position.x > this.gameWidth - this.width/2){
			this.currentSpeed.x = -this.currentSpeed.x;
			this.position.x = this.gameWidth - this.width/2;
		}
		//wall on top
		if(this.position.y < this.height/2){
			this.currentSpeed.y = -this.currentSpeed.y;
			this.position.y = this.height/2;
		}
		//wall on bottom
		if(this.position.y > this.gameHeight - this.height/2){
			this.game.stats.decrementLives();
			this.resetAll();	// only ball reset not paddle. WHY? personal perference
		}

		//check collision with paddle
		if(detectCollision(this, this.game.paddle)){
			navigator.vibrate(20);
			//direction change by paddle
			this.currentSpeed.x = this.speed*(2*this.position.x-2*this.game.paddle.position.x-this.game.paddle.width)/this.game.paddle.width;

			//extremes removal
			this.currentSpeed.x = this.currentSpeed.x >  0.92*this.speed ?  0.92*this.speed : this.currentSpeed.x ;
			this.currentSpeed.x = this.currentSpeed.x < -0.92*this.speed ? -0.92*this.speed : this.currentSpeed.x;

			this.currentSpeed.y = -Math.sqrt(Math.pow(this.speed,2)-Math.pow(this.currentSpeed.x,2));
			this.position.y = this.game.paddle.position.y - this.height/2;
		}
	}

	collidedToBrick(point){ 
		switch(point.side){
			case "LEFT": case "RIGHT":
			this.currentSpeed.x = -this.currentSpeed.x;
			break;
			case "TOP": case "BOTTOM":
			this.currentSpeed.y = -this.currentSpeed.y;
			default:
			break;
		}
		//this.currentSpeed.y = -this.currentSpeed.y;	//ostrich algorithm
		/*it turns out finding the directtion from which ball hit the brick is pretty hard
		it would require storing a previous state and some complex calulations with vectors and stuff.
		So, please accept my noob solution.*/
		//NO longer required . i created the algorithm for it.
	}
}
