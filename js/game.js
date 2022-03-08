import Ball from './ball.js';
import Paddle from './paddle.js';
import Brick from './brick.js';
import Stats from './stats.js';
import InputHandler from './inputHandler.js';				//if same folder use './paddle.js'
import { buildlevel, randomlevel, levels } from './buildlevel.js';
import { GAMESTATE, GAMETYPE } from './constants.js';
import {displayState} from './displayState.js';

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
		this.bricks = [new Brick(this,{x:0,y:0},1)];		//empty array to br filled with bricks
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
			&& this.gameState !== GAMESTATE.COMPLETE
			&& this.gameState !== GAMESTATE.OVER)
			return;
		this.gameType = GAMETYPE.CAMPAIGN;
		this.stats.currentLevel = 1;
		this.stats.resetScore();
		this.start();
	}

	startRandom(){
		if(this.gameState !== GAMESTATE.MENU 
			&& this.gameState !== GAMESTATE.COMPLETE
			&& this.gameState !== GAMESTATE.OVER)
			return;
		this.gameType = GAMETYPE.RANDOM;
		this.stats.currentLevel = "RANDOM";
		this.stats.resetScore();
		this.start();
	}

	startNextLevel(){
		this.stats.currentLevel++;
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
		this.stats.resetLives();
		this.ball.resetAll();	
		this.gameState = GAMESTATE.RUNNING;	
	}

	draw(ctx){
		//display screens when gamestate != (running or paused)
		switch(this.gameState){
			case GAMESTATE.MENU: displayState.menu(ctx, this);
			return;

			case GAMESTATE.OVER: displayState.over(ctx, this);
			return;

			case GAMESTATE.COMPLETE: displayState.complete(ctx, this);
			return;	
		}

		//display scrren when gamestate == (running or paused)
		this.gameObjects.forEach(obj => obj.draw(ctx));
		this.bricks.forEach(obj => obj.draw(ctx));

		//display overlap when gamestate == paused
		if(this.gameState == GAMESTATE.PAUSED)
			displayState.paused(ctx, this);
	}

	update(){
		if(this.gameState !== GAMESTATE.RUNNING) return;

		if(this.stats.lives === 0){
			this.gameState = GAMESTATE.OVER;
		}
		if(this.bricks.length === 0){
			switch(this.gameType){
				case GAMETYPE.CAMPAIGN:
				if(this.stats.currentLevel < this.levels.length)		//next level
					this.startNextLevel();
				else													//game end
					this.gameState = GAMESTATE.COMPLETE;
				break;
				case GAMETYPE.RANDOM:
				this.gameState = GAMESTATE.COMPLETE;
				break;
			}
		}

		let timestamp = Date.now();
		this.gameObjects.forEach(obj => obj.update(timestamp));

		this.bricks.forEach(obj => obj.update());
		this.bricks = this.bricks.filter(brick => brick.hardness>0);
	}

	togglePause(){
		switch(this.gameState)
		{
			case GAMESTATE.RUNNING:
			this.gameState = GAMESTATE.PAUSED;
			this.ball.resetTimestamp();
			break;
			case GAMESTATE.PAUSED:
			this.gameState = GAMESTATE.RUNNING;
			break;
		}
	}
}
