
const player = ['Player One','Player Two'];

var red = '#e53829';
var green = '#32d81c';

var currentPlayer;


//let playerOne;

window.onload = start

function start() {
	currentPlayer = player[0];
	answerBtn();
	printOutPlayer('green');
	addCursor();
	//changeHover()
	// playerOne = new playerId();
	// console.log(playerOne.wins, playerOne.tries);
}

// class playerId {
// 	constructior() {
// 		this.wins = 0;
// 		this.tries = 0;
// 	}
// }


function changePlayer() {
	if (currentPlayer == 'Player One'){
		currentPlayer = player[1];
		printOutPlayer('red');
		return currentPlayer;	
	}
	if (currentPlayer == 'Player Two'){
		currentPlayer = player[0];
		printOutPlayer('green')
		return currentPlayer;
	}
}



function printOutPlayer(newClass) {
	let playerContainer = document.getElementsByClassName("playerBox")[0];

	playerContainer.className = 'playerBox ' + newClass;
	playerContainer.childNodes[1].innerHTML = currentPlayer;
}

	var taken = false; //default value for a box being taken 
const btn = document.getElementsByClassName('box');

function answerBtn() {
	for (var i = 0; i < btn.length; i++) {
		btn[i].addEventListener('click', (x) => {	//for every click , add marker, change player, add cursor
			taken = false;			//resets value
			addMarker(x)			//checks if it can put a marker down
			changeArray(taken);
			changePlayer()
			addCursor();
		});
	}
}

	var c;
function addMarker(input) {
	var canvas = input.target;
	c = document.getElementById(canvas.id); //current canvas clicked on
	
	if (canvas.className.includes('taken')) {
		alert("this spot is taken by the other player!");
		changePlayer();				//return playerName to what it was before error.
		taken = true;
		return;
	}
	if (currentPlayer == 'Player One'){
		drawLine(15,15,185,185);
 		drawLine(185,15,15,185);
 		return canvas.className = 'box taken ' + currentPlayer;
	}
	if (currentPlayer == 'Player Two'){
		drawCircle();
		return canvas.className = 'box taken ' + currentPlayer;
	}
} 

function addCursor() {
	var canvas = document.getElementsByClassName("box");

	for (var i = 0; i < canvas.length; i++) {
		if(canvas[i].className.includes('taken')){
			canvas[i].style.cursor = "auto";
		}
	}
}

const correctCombo = {
	v: {
		first:  [0,1,2], //0+1+1
		secound:[3,4,5], //3+1+1
		third:  [6,7,8], //6+1+1
	},
	h: {
		first:  [0,3,6], //0+3+3
		secound:[1,4,7], //1+3+3
		third:  [2,5,8]  //2+3+3
	},	
	a: {
		first:  [0,4,8], //0+4+4
		secound:[2,4,6], //2+2+2
	}
};




	var playerOne = [];
	var playerTwo = [];

	var checked;
function changeArray(boolean) {
	if (boolean == true) {
		return;
	} 
	if (currentPlayer == 'Player One') {
		checked = document.getElementsByClassName('box taken Player One');
		addToArray(playerOne);
		return;
	}
	if (currentPlayer == 'Player Two') {
		checked = document.getElementsByClassName('box taken Player Two');
		addToArray(playerTwo);
		return;
	} 
}
	var x = 0;

function addToArray(array) {

	for (var i = 0; i < checked.length; i++) {
		if(!array.includes(Number(checked[i].id))) {
			array.push(Number(checked[i].id))

		}
	}
	//console.log(currentPlayer + ':  ' + array);
	checkWinnerv2(array,correctCombos);
	return;
}

const correctCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

function checkWinnerv2(arrayUser,arrayKey) {
	var cnt = 0;
	var countedArray = [];
	for (var i = 0; i < arrayKey.length; i++) {
		if (cnt != 3) {
			cnt = 0;
		}
		for (var x = 0; x < arrayKey[i].length; x++) {
			if(arrayUser.includes(arrayKey[i][x])) {
			
			cnt++;
			console.log(arrayUser + '   '+ 'counted: ' + cnt);
			}	
		}	
	}

	if(cnt == 3) {
		alert("!");

	}
}

var arr1 = ['a','b','a','c'];
var arr2 = ['a','b','c']; //key

//checkWinner(arr1,arr2);


// function checkWinner(arrKey, arrUserInput) {
// 	var element_found;
// 	var no_of_matches = 0;

// 	for (var i = 0; i < arrUserInput.length; i++) {
// 		element_found = false;
// 		for (var j = 0; j < arrKey.length; j++) {
// 			if ((element_found == false) && (arrUserInput[i] == arrKey[j])) {
// 				element_found = true;
// 				no_of_matches++;
// 			}
// 		}
// 	}

// 	if (no_of_matches == 3) {
// 		alert("true");
// 	}
// 	console.log(no_of_matches);
// }
//console.log(checkWinnerv2(arr1,arr2));


function drawWinnerLine(startIndex, direction) {
	if (direction == 'vertical'){
		for (let i = startIndex; i < 9+(1*startIndex); i+=3) {
			c = document.getElementsByClassName('box')[i];
			drawLine(100,0,100,200);
		}
		return;
	}
	if (direction == 'horisontal'){
		for (let i = startIndex; i < startIndex+3; i++) {
			c = document.getElementsByClassName('box')[i];
			drawLine(0,100,200,100);
		};
		return;
	}
	if (direction == 'across'){
		if (startIndex == 0){
			for (let i = 0; i < 3; i++) {
				c = document.getElementsByClassName('box')[i*4];
				drawLine(0,0,200,200);
			}
			return;
		}
		if (startIndex == 2){ 
			for (var i = 2; i < 7; i+=2) {
				c = document.getElementsByClassName('box')[i];
				drawLine(200,0,0,200);
			}
			return;
		}
	}
}

function reset() {
	currentPlayer = player[0];
	printOutPlayer('green');

	c = document.getElementsByClassName("box");
	for (var i = 0; i < c.length; i++) {
		let ctx = c[i].getContext("2d");	
		ctx.clearRect(0,0, c[i].width, c[i].height);
		c[i].className = 'box';	
	}
	return;
}


function changeHover() {
	for (var i = 0; i < btn.length; i++) {
		btn[i].addEventListener('mouseover', (x) => {
			var div = x.target
			div.style.backgroundColor = "yellow";
			div.style.opacity = "0.25";
		});
		btn[i].addEventListener('mouseleave', (y) => {
			y.target.style.backgroundColor = "white";
			y.target.style.opacity = "1";
		})
	}
}

function removeHover() {

}

function drawLine(x1,y1,x2,y2) {
	let ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineWidth = 5;
	ctx.strokeStyle = green;
	ctx.stroke();
	ctx.closePath();
	return;
}

function drawCircle() {
	let ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(100, 100, 85, 0, 2 * Math.PI);
	ctx.lineWidth = 5;
	ctx.fillStyle = "white";
	ctx.strokeStyle = red;
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	return;
}