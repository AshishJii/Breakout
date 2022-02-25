import Brick from './brick.js';
import { CANVAS_LEFT_PADDING, BRICK_WIDTH, HORIZONTAL_MARGIN_BETWEEN_BRICKS, CANVAS_TOP_PADDING, BRICK_HEIGHT, VERTICAL_MARGIN_BETWEEN_BRICKS} from './constants.js';

export function buildlevel(game, levelArray){
	let bricks = [];

	levelArray.forEach((row, rowIndex) => {
		row.forEach((brick, brickIndex) => {
			if(brick === 1){
				bricks.push(
					new Brick(game, 
						{x: CANVAS_LEFT_PADDING + brickIndex*(BRICK_WIDTH+HORIZONTAL_MARGIN_BETWEEN_BRICKS),
						 y: CANVAS_TOP_PADDING + rowIndex*(BRICK_HEIGHT+VERTICAL_MARGIN_BETWEEN_BRICKS)}));
			}
		});
	});

	return bricks;
}

// NOT USED IN GAME
export function randomlevel(){
	let level = [];
	for(var i = 0;i<5;i++){
		level[i] = [];
		for(var j = 0;j<9;j++){
			level[i][j] = Math.floor(Math.random()*2);
		}
	}
	return level;
}

/*Easy levels for testing
const level1 = [
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 0, 0, 0, 0, 0, 0, 0, 0],];

const level2 = [
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 0, 0, 0, 0, 0, 0, 0, 1],];*/


const level1 = [
[1, 0, 1, 0, 1, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 1, 0, 1, 0],
[1, 0, 1, 0, 1, 0, 1, 0, 1],];

const level2 = [
[1, 1, 1, 1, 1, 1, 1, 1, 1],
[0, 1, 0, 1, 0, 1, 0, 1, 0],
[1, 0, 1, 1, 1, 1, 1, 0, 1],
[0, 1, 0, 1, 0, 1, 0, 1, 0],];

const level3 = [
[1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 0, 1, 0, 1, 0, 1, 1],
[1, 0, 1, 1, 1, 1, 1, 0, 1],
[1, 1, 0, 1, 0, 1, 0, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1]];

export const levels = [level1,level2,level3];
