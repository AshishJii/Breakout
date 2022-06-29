//TODO 
// complete anonymous auth ...done
// add different users ...done
// set up app ch3ck recaptcha
// refactor this file into a class



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getDatabase, child, ref, get, set, onValue, push, query, limitToLast, orderByChild} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {fillDialog} from './dialog.js';
//if you are here. you are quite a tester.
//you probably want to steal my firebase credentials. Well, go for it.
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
let db;
let reference;
let data;
let name;
let currentUser;
export function setupFirebase(game){
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	db = getDatabase();
	const auth = getAuth();


	signInAnonymously(auth)
	.then(() => {
   		// Signed in..
   	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorMessage);
	});


	reference = ref(db, "scores");
	var que = query(reference, orderByChild('totalScore'), limitToLast(10));
	

	onValue(reference, snapshot=>{			//listen change and Display data
		data = [];
		get(que).then(snap=>{				//get ordered data
			console.log(snap);
			snap.forEach(childSnap=>{		//run array through it
				data.push(childSnap.val());	//push the child in array 'data'
			});data.reverse();
		});
	});


	

	onAuthStateChanged(auth, (user) => {
		if (user) {
			currentUser = user;
			get(child(ref(db, "users"), currentUser.uid)).then((snapshot) => {
				if (snapshot.exists()) {
					let users = Object.values(snapshot.val());
					fillDialog(game, users);
					
				} 
				else {
					fillDialog(game);
					console.log("No data available");
				}
			}).catch((error) => {
				console.error(error);
			});

			console.log(user.metadata);
		} else {
			console.log("USER SIGNED OUT");
		}
	});
}

export function getHighScores(){
	return data;
}

export function uploadScore(nam, scor){
	push(ref(db, "scores"),{
		uid: currentUser.uid,
		name: nam,
		agent: navigator.userAgent,
		baseScore: scor.baseScore,
		bonus: scor.tScore - scor.baseScore,
		totalScore: scor.tScore
	});
}

export function saveNewUser(name){
	set(push(ref(db, 'users/'+currentUser.uid)),name);
}
