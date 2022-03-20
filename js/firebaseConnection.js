import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getDatabase, ref, get, onValue, push, query, limitToLast, orderByChild} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyA0bqq_SOPEFEqfBMmNHRFvna3BhuWgxKA",
	authDomain: "breakout-55a9d.firebaseapp.com",
	databaseURL: "https://breakout-55a9d-default-rtdb.firebaseio.com",
	projectId: "breakout-55a9d",
	storageBucket: "breakout-55a9d.appspot.com",
	messagingSenderId: "155420956474",
	appId: "1:155420956474:web:7bf84d9876ba3e6c872203",
	measurementId: "G-9R3K6EXFY6"
};

let reference;
let data;
export function setupFirebase(){
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	const db = getDatabase();

	reference = ref(db, "users");
	var que = query(reference, orderByChild('score'), limitToLast(10));
	
	onValue(reference, snapshot=>{			//listen change and Display data
		data = [];
		get(que).then(snap=>{				//get ordered data
			console.log(snap);
			snap.forEach(childSnap=>{		//run array through it
				data.push(childSnap.val());	//push the child in array 'data'
			});data.reverse();
		});
	});
}

export function getHighScores(){
	return data;
}

export function uploadScore(nam, scor){
	push(reference,{
		name: nam,
		baseScore: scor.baseScore,
		bonus: scor.bonus,
		score: scor.tScore		
	});
}
