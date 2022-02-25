import {RIGHTARROW_KEYCODE, LEFTARROW_KEYCODE, ESC_KEYCODE, SPACE_KEYCODE, ENTER_KEYCODE} from './constants.js';
export default class InputHandler{
	constructor(paddle, game){
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
				game.startCampaign();
				break;
				case ENTER_KEYCODE:
				game.startRandom();
				break;
			}
			//console.log("'"+e.key+"' : "+e.keyCode);
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
	}	
}