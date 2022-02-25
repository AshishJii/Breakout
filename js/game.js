import Ball from './ball.js';
import Paddle from './paddle.js';
import Brick from './brick.js';
import Stats from './stats.js';
import InputHandler from './inputHandler.js';				//if same folder use './paddle.js'
import { buildlevel, randomlevel, levels } from './buildlevel.js';
import { GAMESTATE, GAMETYPE } from './constants.js';

export default class Game{
	constructor(gameWidth, gameHeight){
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.gameState = GAMESTATE.MENU;
		this.gameType;
		this.ball = new Ball(this);     //passing the extension of game object to the classes
		// now the ball class can access any ingo about other objects like paddle and bricks
		this.paddle = new Paddle(this);
		this.stats = new Stats(this);
		this.inputHandler = new InputHandler(this.paddle, this);
		this.gameObjects = [];
		this.bricks = [new Brick(this,0,0)];		//empty array to br filled with bricks
		// dummy brick outside the canvas to avoid triggering empty array(no bricks) function at menu state
		this.levels = levels;
		this.gameObjects = [
		this.ball, 
		this.paddle,
		this.stats];
	}

	// you can also inititalise global variable inside a function by passing them as this.paddle or this.xyz(not done here)
	startCampaign(){
		if(this.gameState !== GAMESTATE.MENU 
			&& this.gameState !== GAMESTATE.GAMECOMPLETE
			&& this.gameState !== GAMESTATE.GAMEOVER)
			return;
		this.gameType = GAMETYPE.CAMPAIGN;
		this.stats.currentLevel = 1;
		this.stats.reset();
		this.start();
	}

	startRandom(){
		if(this.gameState !== GAMESTATE.MENU 
			&& this.gameState !== GAMESTATE.GAMECOMPLETE
			&& this.gameState !== GAMESTATE.GAMEOVER)
			return;
		this.gameType = GAMETYPE.RANDOM;
		this.stats.currentLevel = "RANDOM";
		this.stats.reset();
		this.start();
	}

	startNextLevel(){
		this.stats.currentLevel++;
		this.gameState = GAMESTATE.NEWLEVEL;
		this.start();
	}

	start(){
		switch(this.gameType){
			case GAMETYPE.RANDOM:
			this.bricks = buildlevel(this, randomlevel());
			break;
			case GAMETYPE.CAMPAIGN:
			this.bricks = buildlevel(this, this.levels[this.stats.currentLevel-1]);
			break;
		}
		this.stats.reset();
		this.ball.resetAll();	
		this.gameState = GAMESTATE.RUNNING;	
	}

	draw(ctx){
		switch(this.gameState){
			case GAMESTATE.MENU:
			ctx.beginPath();
			ctx.rect(0,0,this.gameWidth,this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill();
			ctx.closePath();

			ctx.font = "30px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("BreakOut", this.gameWidth/2, this.gameHeight/2);

			ctx.font = "15px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom";
			ctx.fillText("Press Space to start CAMPAIGN mode", this.gameWidth/2, this.gameHeight-35);
			ctx.fillText("Press Enter to start RANDOM level", this.gameWidth/2, this.gameHeight-20);
			return;

			case GAMESTATE.GAMEOVER:
			ctx.beginPath();
			ctx.rect(0,0,this.gameWidth,this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill();
			ctx.closePath();

			ctx.font = "30px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Game Over", this.gameWidth/2, this.gameHeight/3);

			ctx.font = "20px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("SCORE : "+this.stats.score, this.gameWidth/2, this.gameHeight/2);

			ctx.font = "15px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom";
			ctx.fillText("Press Space to start CAMPAIGN mode", this.gameWidth/2, this.gameHeight-35);
			ctx.fillText("Press Enter to start RANDOM level", this.gameWidth/2, this.gameHeight-20);
			return;

			case GAMESTATE.GAMECOMPLETE:
			ctx.beginPath();
			ctx.rect(0,0,this.gameWidth,this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill();
			ctx.closePath();

			ctx.font = "30px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("The End", this.gameWidth/2, this.gameHeight/3);

			ctx.font = "20px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("SCORE : "+this.stats.score, this.gameWidth/2, this.gameHeight/2);


			ctx.font = "15px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom";
			ctx.fillText("Press Space to start CAMPAIGN mode", this.gameWidth/2, this.gameHeight-35);
			ctx.fillText("Press Enter to start RANDOM level", this.gameWidth/2, this.gameHeight-20);
			return;
		}

		this.gameObjects.forEach(obj => obj.draw(ctx)); // draw frame objects
		this.bricks.forEach(obj => obj.draw(ctx));

		if(this.gameState == GAMESTATE.PAUSED){
			ctx.beginPath();
			ctx.rect(0,0,this.gameWidth,this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fill();
			ctx.closePath();

			ctx.font = "30px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
		}
	}

	update(){
		if(this.stats.lives === 0){
			this.gameState = GAMESTATE.GAMEOVER;
		}
		if(this.bricks.length === 0){
			switch(this.gameType){
				case GAMETYPE.CAMPAIGN:
				if(this.stats.currentLevel < this.levels.length)		//next level
					this.startNextLevel();
				else													//game end
					this.gameState = GAMESTATE.GAMECOMPLETE;
				break;
				case GAMETYPE.RANDOM:
				this.gameState = GAMESTATE.GAMECOMPLETE;
				break;
			}
		}

		if(this.gameState !== GAMESTATE.RUNNING) return;

		let timestamp = Date.now();
		this.gameObjects.forEach(obj => obj.update(timestamp));

		this.bricks.forEach(obj => obj.update());
		this.bricks = this.bricks.filter(brick => brick.markedForRemoval==false);
	}

	togglePause(){
		if(this.gameState == GAMESTATE.RUNNING)
		{
			this.gameState = GAMESTATE.PAUSED;
			this.ball.resetTimestamp();
		}
		else{
			this.gameState = GAMESTATE.RUNNING;
		}
	}
}