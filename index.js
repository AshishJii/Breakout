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

let intro = "Welcome to BreakOut 5.1.\n";
intro += "Made using HTML, CSS, and vanilla JavaScript with Firebase integration.\n";
intro += "Players can break blocks (either use left/right arrows or buttons) and compete for high scores, thanks to Firebase's real-time database.\n";
intro += "You can also play as previous users added on this PC\n";
intro += "Enjoy!";
alert(intro);

requestAnimationFrame(draw);

//  document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < GAME_WIDTH && e.clientY < GAME_HEIGHT)
		paddleX = relativeX - paddleWidth/2;
}

