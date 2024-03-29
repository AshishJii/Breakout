import {RIGHTARROW_KEYCODE, LEFTARROW_KEYCODE, ESC_KEYCODE, SPACE_KEYCODE, ENTER_KEYCODE, GAMESTATE} from './constants.js';
export default class InputHandler{
	constructor(paddle, game){
		playButton.addEventListener("click",e => {
			if(nameBox.value=="") return;
			game.username = nameBox.value;
			game.saveNewUser(nameBox.value);
			userDialog.close();
			game.gameState = GAMESTATE.MENU;		//this should not be here. gamestate should be handled from game.js
		});

		playAsNewPlayer.addEventListener("click",()=>{
			userNamePage.style.display = "block";
			userSelectionPage.style.display = "none";
			nameBox.focus();
   		});

		document.addEventListener("keydown", e => {
			switch(e.keyCode){
				case RIGHTARROW_KEYCODE:
				paddle.moveRight();
				break; 
				case LEFTARROW_KEYCODE:
				paddle.moveLeft();
				break;
				case ESC_KEYCODE:
				game.togglePause();
				break;
				case SPACE_KEYCODE:
				e.preventDefault();
				game.startRandom();
				break;
				case ENTER_KEYCODE:
				game.startCampaign();
				break;
			}
		});
		document.addEventListener("keyup", e => {
			switch(e.keyCode){
				case RIGHTARROW_KEYCODE:
				if(paddle.currentSpeed > 0)
					paddle.stopMoving();
				break;
				case LEFTARROW_KEYCODE:
				if(paddle.currentSpeed < 0)
					paddle.stopMoving();
				break;
			}
		});

		document.addEventListener("pointerdown", e => {
			switch(e.target.id){
				case "rightBut":
				paddle.moveRight();
				break; 
				case "leftBut":
				paddle.moveLeft();
				break;
				case "escBut":
				game.togglePause();
				break;
				case "spaceBut":
				game.startRandom();
				break;
				case "enterBut":
				game.startCampaign();
				break;
			}
		});

		document.addEventListener("pointerup", e => {
			switch(e.target.id){
				case "rightBut":
				if(paddle.currentSpeed > 0)
					paddle.stopMoving();
				break; 
				case "leftBut":
				if(paddle.currentSpeed < 0)
					paddle.stopMoving();
				break;
			}
		});
	}
}
