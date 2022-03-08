//display for all states except runningState
export const displayState = {
	paused, menu, over, complete
};

function paused(ctx, game){
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
	ctx.fillText("v4.2", game.gameWidth/2, game.gameHeight/2+18);

	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText("Press Space to start CAMPAIGN mode", game.gameWidth/2, game.gameHeight-35);
	ctx.fillText("Press Enter to start RANDOM level", game.gameWidth/2, game.gameHeight-20);
}
function over(ctx, game){
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
	ctx.fillText("SCORE : "+game.stats.score, game.gameWidth/2, game.gameHeight/2);

	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText("Press Space to start CAMPAIGN mode", game.gameWidth/2, game.gameHeight-35);
	ctx.fillText("Press Enter to start RANDOM level", game.gameWidth/2, game.gameHeight-20);
}
function complete(ctx, game){
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
	ctx.fillText("SCORE : "+game.stats.score, game.gameWidth/2, game.gameHeight/2);


	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText("Press Space to start CAMPAIGN mode", game.gameWidth/2, game.gameHeight-35);
	ctx.fillText("Press Enter to start RANDOM level", game.gameWidth/2, game.gameHeight-20);
}