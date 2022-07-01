//display for all states except runningState
import { GAMESTATE, GAMETYPE } from './constants.js';
import {getHighScores} from './firebaseConnection.js';

export function drawState(ctx, game){
	switch(game.gameState){
		case GAMESTATE.MENU: menu(ctx, game);
		return;
		case GAMESTATE.OVER:
		switch(game.gameType){
			case GAMETYPE.CAMPAIGN: campaignOver(ctx, game);
			return;
			case GAMETYPE.RANDOM: randomOver(ctx, game);
			return;
		}
		case GAMESTATE.COMPLETE:
		switch(game.gameType){
			case GAMETYPE.CAMPAIGN: campaignComplete(ctx, game);
			return;
			case GAMETYPE.RANDOM: randomComplete(ctx, game);
			return;
		}
	}
}

export function paused(ctx, game){
	ctx.beginPath();
	ctx.rect(0,0,game.gameWidth,game.gameHeight);
	ctx.fillStyle = "rgba(0,0,0,0.5)";
	ctx.fill();
	ctx.closePath();

	ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Paused", game.gameWidth/2, game.gameHeight/2);
}
function menu(ctx, game){
	ctx.beginPath();
	ctx.rect(0,0,game.gameWidth,game.gameHeight);
	ctx.fillStyle = "rgba(0,0,0,0.3)";
	ctx.fill();
	ctx.closePath();

	ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("BreakOut", game.gameWidth/2, game.gameHeight/2);

	ctx.font = "12px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("v5.1", game.gameWidth/2, game.gameHeight/2+18);

	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText("Press Space to start CAMPAIGN mode", game.gameWidth/2, game.gameHeight-35);
	ctx.fillText("Press Enter to start RANDOM level", game.gameWidth/2, game.gameHeight-20);
}

function campaignOver(ctx, game){
	ctx.beginPath();
	ctx.rect(0,0,game.gameWidth,game.gameHeight);
	ctx.fillStyle = "rgba(0,0,0,0.8)";
	ctx.fill();
	ctx.closePath();

	ctx.font = "25px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Game Over", game.gameWidth/2, 5);

	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("SCORE : "+game.stats.tScore, game.gameWidth/2, 37);

	ctx.beginPath();
	ctx.rect(65,52,game.gameWidth-130,game.gameHeight-100);
	ctx.fillStyle = "rgba(0,0,0,0.9)";
	ctx.fill();
	ctx.closePath();

	//Experimental
	var data = getHighScores();
	ctx.font = "bold 14px Arial";
	ctx.fillStyle = "white";

	ctx.textAlign = "right";
	ctx.fillText("Name", game.gameWidth/2-10, 56);
	ctx.textAlign = "left";
	ctx.fillText("Score", game.gameWidth/2+10, 56);

	ctx.font = "normal 12px Arial";
	for (var i = 0; i<data.length; i++){
		ctx.textAlign = "right";
		ctx.fillText(data[i].name, game.gameWidth/2-10, 75+(18*i));
		ctx.textAlign = "left";
		ctx.fillText(data[i].totalScore, game.gameWidth/2+10, 75+(18*i));
	}
	//Experimental

	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText("Press Space to start CAMPAIGN mode", game.gameWidth/2, game.gameHeight-30);
	ctx.fillText("Press Enter to start RANDOM level", game.gameWidth/2, game.gameHeight-10);
}

function campaignComplete(ctx, game){
	ctx.beginPath();
	ctx.rect(0,0,game.gameWidth,game.gameHeight);
	ctx.fillStyle = "rgba(0,0,0,0.5)";
	ctx.fill();
	ctx.closePath();

	ctx.font = "25px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("The End", game.gameWidth/2, 5);

	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("SCORE : "+game.stats.tScore, game.gameWidth/2, 37);

	ctx.beginPath();
	ctx.rect(65,52,game.gameWidth-130,game.gameHeight-100);
	ctx.fillStyle = "rgba(0,0,0,0.9)";
	ctx.fill();
	ctx.closePath();

	//Experimental
	var data = getHighScores();
	ctx.font = "bold 14px Arial";
	ctx.fillStyle = "white";

	ctx.textAlign = "right";
	ctx.fillText("Name", game.gameWidth/2-10, 56);
	ctx.textAlign = "left";
	ctx.fillText("Score", game.gameWidth/2+10, 56);

	ctx.font = "normal 12px Arial";
	for (var i = 0; i<data.length; i++){
		ctx.textAlign = "right";
		ctx.fillText(data[i].name, game.gameWidth/2-10, 75+(18*i));
		ctx.textAlign = "left";
		ctx.fillText(data[i].totalScore, game.gameWidth/2+10, 75+(18*i));
	}
	//Experimental

	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText("Press Space to start CAMPAIGN mode", game.gameWidth/2, game.gameHeight-30);
	ctx.fillText("Press Enter to start RANDOM level", game.gameWidth/2, game.gameHeight-10);
}


function randomOver(ctx, game){
	ctx.beginPath();
	ctx.rect(0,0,game.gameWidth,game.gameHeight);
	ctx.fillStyle = "rgba(0,0,0,0.8)";
	ctx.fill();
	ctx.closePath();

	ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Game Over", game.gameWidth/2, game.gameHeight/3);

	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("SCORE : "+game.stats.tScore, game.gameWidth/2, game.gameHeight/2);

	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText("Press Space to start CAMPAIGN mode", game.gameWidth/2, game.gameHeight-35);
	ctx.fillText("Press Enter to start RANDOM level", game.gameWidth/2, game.gameHeight-20);
}
function randomComplete(ctx, game){
	ctx.beginPath();
	ctx.rect(0,0,game.gameWidth,game.gameHeight);
	ctx.fillStyle = "rgba(0,0,0,0.5)";
	ctx.fill();
	ctx.closePath();

	ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("The End", game.gameWidth/2, game.gameHeight/3);

	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("SCORE : "+game.stats.tScore, game.gameWidth/2, game.gameHeight/2);


	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText("Press Space to start CAMPAIGN mode", game.gameWidth/2, game.gameHeight-35);
	ctx.fillText("Press Enter to start RANDOM level", game.gameWidth/2, game.gameHeight-20);
}
