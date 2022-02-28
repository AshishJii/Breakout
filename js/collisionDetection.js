export function detectCollision(ball, gameObject){
	let top = gameObject.position.y;
	let bottom = gameObject.position.y + gameObject.height;
	let left = gameObject.position.x;
	let right = gameObject.position.x + gameObject.width;

	if(ball.position.y >= top
		&& ball.position.y <= bottom
		&& ball.position.x >= left
		&& ball.position.x <= right){
		return true;
}
else
	return false;
}

/*
From calling class:
posDetector = new PositionDetector(previousBall, ball, brick);
object{x: , y: } = posDetector.intersectionPoint();


class Blueprint:
	constructor(ball1, ball2, gameObject){
		//both ball points initialise
		//gameObject border axes coordinates initialise
		//gameObject corner points declaration
	}

	intersectionPoint(){
		SidesToCheck = this.directionCheck();
		SidesToCheck.forEach((side) =>{
			computeSideCoordinates(side);
			point = solveLineEqns();
			if(point.x >= Math.min(x1,x2) && point.x <= Math.max(x1,x2) && point.y >= Math.min(y1,y2) && point.y <= Math.max(y1,y2))
				break;
		});
	 return point;
	 }

	directionCheck(){...}				// RETURNS array of possible sides on which collision might have happened(using ball1 location)
	computeSideCoordinates(side){...}	// TAKES IN side, and initialise coordinates of corners of it
	solveLineEqns(){...}				// RETURNS an object with coordinates of point of intersections
}*/

export class PositionDetection{
	constructor(ball1, ball2, gameObject){
		this.ball1 = {
			x: ball1.position.x,
			y: ball1.position.y
		}
		this.ball2 = {
			x: ball2.position.x,
			y: ball2.position.y
		}
		//corner coordinates
		this.left = gameObject.position.x;
		this.right = gameObject.position.x+gameObject.width;
		this.top = gameObject.position.y;
		this.bottom = gameObject.position.y+gameObject.height;

		//object border line coordinates
		this.x1;
		this.y1;
		this.x2;
		this.y2;
	}

	intersectionPoint(){
		let point;
		console.log("PREVIOUS LOCATION : ");
		console.log(this.ball1);
		console.log("CURRENT LOCATION : ");
		console.log(this.ball2);
		console.log("brick borders :");
		console.log("x = "+this.left+" to "+this.right);
		console.log("x = "+this.top+" to "+this.bottom);

		let SidesToCheck = this.directionCheck();
		//yes i know i should have usen forEach, but it doesnt support break statement inside it
		var i;
		for(i = 0;i<SidesToCheck.length;i++){
			this.computeSideCoordinates(SidesToCheck[i]);
			point = this.solveLineEqns();
			if(point.x >= Math.min(this.x1,this.x2) 
				&& point.x <= Math.max(this.x1,this.x2) 
				&& point.y >= Math.min(this.y1,this.y2) 
				&& point.y <= Math.max(this.y1,this.y2))
				break;
		}
		return {x: point.x,y: point.y,side: SidesToCheck[i]};
	}

	solveLineEqns()
	{
		let a1,b1,c1,a2,b2,c2;
		let determinant;
		let X,Y;

		// ball path line represented as a1x + b1y = c1
		a1 = (this.ball2.y - this.ball1.y).toFixed(2);
		b1 = (this.ball1.x - this.ball2.x).toFixed(2);
		c1 = (this.ball1.x*this.ball2.y - this.ball2.x*this.ball1.y).toFixed(2);
		// gameObject border line represented as a2x + b2y = c2

		a2 = this.y2 - this.y1;
		b2 = this.x1 - this.x2;
		c2 = this.x1*this.y2 - this.x2*this.y1;

		console.log(a1+"x+"+b1+"y = "+c1);
		console.log(a2+"x+"+b2+"y = "+c2);

		determinant = a1*b2 - a2*b1;

		X = ((b2*c1 - b1*c2)/determinant).toFixed(2);
		Y = ((a1*c2 - a2*c1)/determinant).toFixed(2);
		console.log("Intersection Point : ("+X+", "+Y+")");
		return {x: X,y: Y};
	}

	computeSideCoordinates(side)
	{
		switch(side)
		{
			case "TOP":
			this.x1 = this.left;
			this.y1 = this.top;
			this.x2 = this.right;
			this.y2 = this.top;
			break;;

			case "LEFT":
			this.x1 = this.left;
			this.y1 = this.top;
			this.x2 = this.left;
			this.y2 = this.bottom;
			break;;

			case "RIGHT":
			this.x1 = this.right;
			this.y1 = this.top;
			this.x2 = this.right;
			this.y2 = this.bottom;
			break;

			case "BOTTOM":
			this.x1 = this.left;
			this.y1 = this.bottom;
			this.x2 = this.right;
			this.y2 = this.bottom;
			break;;
		}
		console.log("Line point1 quardinates : "+this.x1+", "+this.y1);
		console.log("Line point2 quardinates : "+this.x2+", "+this.y2);
		return;
	}

	directionCheck()
	{
		/*there are very low chances that a ball entering diagnally will enter object(brick)
	 	without first entering boundary axes of object in a previous frame but i have covered it up.
	 	This can only occur in very niche scenarios like:
	 	-ball entering just at the corner of object 
		-In a very old PC which has such low frame rate that ball enters object without entering axes first
		Mostly only first if() wll be invoked in both set*/

		let arr = ["TOP","LEFT","RIGHT","BOTTOM"];

		//LEFT RIGHT FILTER
		if(this.ball1.x >= this.left && this.ball1.x <= this.right){		//ball coming to corner will be here
			arr.splice(arr.indexOf("LEFT"),1);
			arr.splice(arr.indexOf("RIGHT"),1);
		}
		else if(this.ball1.x < this.left){
			arr.splice(arr.indexOf("RIGHT"),1);
		}
		else if(this.ball1.x > this.right){
			arr.splice(arr.indexOf("LEFT"),1);
		}

		//TOP BOTTOM FILTER
		if(this.ball1.y >= this.top && this.ball1.y <= this.bottom){
			arr.splice(arr.indexOf("TOP"),1);
			arr.splice(arr.indexOf("BOTTOM"),1);
		}
		else if(this.ball1.y < this.top){
			arr.splice(arr.indexOf("BOTTOM"),1);
		}		 
		else if(this.ball1.y > this.bottom){
			arr.splice(arr.indexOf("TOP"),1);
		}

		console.error("SidesToCheck : "+arr.toString());
		return arr;
	}
}