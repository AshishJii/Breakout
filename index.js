import Game from './js/game.js';

var canvas = document.querySelector("#mainCanvas");
var ctx = canvas.getContext("2d");
//background canvas
var bgcanvas = document.querySelector("#bgCanvas");
var bgctx = bgcanvas.getContext("2d");
var stopper;
const GAME_WIDTH = 475;
const GAME_HEIGHT = 300;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

//background canvas filling
var bg = document.querySelector("#bg");
bgctx.drawImage(bg,0,0,GAME_WIDTH,GAME_HEIGHT);

function draw(timestamp){
	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
	//orientationDetection();
	game.draw(ctx);
	game.update();
	stopper = requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

//  document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < GAME_WIDTH && e.clientY < GAME_HEIGHT)
		paddleX = relativeX - paddleWidth/2;
}
