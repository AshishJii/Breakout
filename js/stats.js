import {NO_OF_LIVES, STATS_FONTSIZE, STATS_FONTCOLOR, STATS_FONTS, STATS_HORIZONTAL_MARGIN, STATS_VERTICAL_MARGIN} from './constants.js';
export default class Stats{
	constructor(game){
		this.game = game;
		this.currentLevel = 1;
	}

	resetScore(){
		this.baseScore = 0;
		this.bonusStreak = 0;
		this.tScore = 0;
	}

	resetLives(){
		this.lives = NO_OF_LIVES;
	}
	draw(ctx){
		//Score
		var txt = "Score: "+this.baseScore;
		ctx.beginPath();
		ctx.font = STATS_FONTSIZE+" "+STATS_FONTS;
		ctx.fillStyle = STATS_FONTCOLOR;
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText(txt, STATS_HORIZONTAL_MARGIN, STATS_VERTICAL_MARGIN);
		ctx.fillStyle = "red";
		ctx.fillText("+"+(this.tScore-this.baseScore), STATS_HORIZONTAL_MARGIN + ctx.measureText(txt).width, STATS_VERTICAL_MARGIN);
		ctx.closePath();

		//Level
		ctx.beginPath();
		ctx.font = STATS_FONTSIZE+" "+STATS_FONTS;
		ctx.fillStyle = STATS_FONTCOLOR;
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Level: "+this.currentLevel, this.game.gameWidth/2, STATS_VERTICAL_MARGIN);
		ctx.closePath();

		//Lives
		ctx.beginPath();
		ctx.font = STATS_FONTSIZE+" "+STATS_FONTS;
		ctx.fillStyle = STATS_FONTCOLOR;
		ctx.textAlign = "right";
		ctx.textBaseline = "top";
		ctx.fillText("Lives: "+this.lives, this.game.gameWidth-STATS_HORIZONTAL_MARGIN, STATS_VERTICAL_MARGIN);
		ctx.closePath();
	}

	update(timestamp){
		// no double checks necessary
		// available lives update is in ball class
		// score update in game class
		// level update is in game class
	}

	decrementLives(){
		this.lives--;
	}

	updateScore(){
		this.baseScore++;
		this.tScore++;
		this.tScore += this.bonusStreak;
		this.bonusStreak++;
	}

	resetBonusStreak(){		//called in ball class when ball hits paddle from ball.js class
		this.bonusStreak = 0;
	}
}
