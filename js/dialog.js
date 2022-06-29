import {setupFirebase, uploadScore} from './firebaseConnection.js';

export function showDialog(){
	savedUsers.style.display="block";
}

export function fillDialog(game, arr=[]){
	savedUsers.textContent = "";
	arr.forEach((name,index)=>{
		var spn = document.createElement("span");
		spn.id = "name"+index;
		spn.style.display = "block";
		//REsource Leak. Someone can enter malicous code here. Fix it
		spn.innerHTML = `Play as ${name}<span style="float:right">></span></span><hr>`;
		savedUsers.prepend(spn);
		spn.addEventListener("click",e=>{
			game.username = name;
			userDialog.close();
		})
	});	
}