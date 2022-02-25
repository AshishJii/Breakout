//Not at all compatible with mobiles
// for god sake please make it scalable with vw and vh
// use orietnatjon detection also

// include randomlevel() in game

// add multiple hit bricks


import Game from './js/game.js';

var canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");
var stopper;

console.log(Date.now());

const GAME_WIDTH = 475;
const GAME_HEIGHT = 300;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

function draw(timestamp){
	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
  	//orientationDetection();
  	game.draw(ctx);
  	game.update();

  	stopper = requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);

  var leftBut = document.querySelector("#leftBut");
  var rightBut = document.querySelector("#rightBut");

 var rightPressed = false;
 var leftPressed = false;
 var color = randomColor();

//  document.addEventListener("pointerdown", PointerDownHandler);
//  document.addEventListener("pointerup", PointerUpHandler);
//  document.addEventListener("mousemove", mouseMoveHandler);


function orientationDetection(){
	if(window.innerHeight > window.innerWidth)
	{
		alert("LANDSCAPE MODE ONLY!");
		document.location.reload();
	}
}


	function PointerDownHandler(e) {
		if(e.target.id == "rightBut") {
			rightPressed = true;
		}
		else if(e.target.id == "leftBut") {
			leftPressed = true;
		}
	}

	function PointerUpHandler(e) {
		if(e.target.id == "rightBut") {
			rightPressed = false;
		}
		else if(e.target.id == "leftBut") {
			leftPressed = false;
		}
	}

	function mouseMoveHandler(e){
		var relativeX = e.clientX - canvas.offsetLeft;
		if(relativeX > 0 && relativeX < GAME_WIDTH && e.clientY < GAME_HEIGHT)
			paddleX = relativeX - paddleWidth/2;
	}

	function randomColor(){
		return "rgb("+rand()+","+rand()+","+rand()+")";
	}

	function rand(){
    return Math.floor(Math.random()*150);  //dark colors only(<=150)
  }