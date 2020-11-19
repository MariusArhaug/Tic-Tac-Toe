
class Player {
	constructor(number, color) {
		this._number = number;
		this._color = color;
		this._totalGames = 1;
		this._wins = 0;
		this._draw = 0;
		this._losses = 0; 
	}

	get number () {
		return this._number;
	}
	get wins() {
		return this._wins;
	}
	get color() {
		return this._color;
	}
	increaseTotalGames() {
		return this._totalGames++
	}
	increaseWins() {
		this.increaseTotalGames();
		return this._wins++;
	}
	increasLosses() {
		this.increaseTotalGames();
		return this._losses++;
	}
	increaseDraws() {
		this.increaseTotalGames();
		return this._draw++;
	}
}

var red = '#e53829';
var green = '#32d81c';

var playerOne;
var playerTwo;

let player = [];
var currentPlayer;

window.onload = start

function start() { 												// only initilize once, declare two objects, playerOne and playerTwo.
	playerOne = new Player('Player One', green);
	playerTwo = new Player('Player Two', red);
	player = [playerOne, playerTwo];
	currentPlayer = player[0];

	startGame();
	printOutLeaderboard();
}


function startGame() {
	answerBtn();
	printOutPlayer('green');
	addCursor();
}

	const canvas = document.getElementsByClassName('box');		//gather every canvas and make it a button
function answerBtn() {
	for (var i = 0; i < canvas.length; i++) {
		canvas[i].addEventListener('click', updateValues); 		//for every click run updateValues function
	}
}
 
function updateValues() {
	addMarker(this);  											//checks if it can add marker, get the element being clicked
	changeArray();
	changePlayer();
	changeCursor();
	this.removeEventListener('click', updateValues); 			//removes eventlistener so you cant click same element again
	//changeHover()
}

function changePlayer() {
	if (currentPlayer.number == 'Player One'){
		currentPlayer = player[1];
		printOutPlayer('red');
		return currentPlayer;	
	}
	if (currentPlayer.number == 'Player Two'){
		currentPlayer = player[0];
		printOutPlayer('green');
		return currentPlayer;
	}
}

function printOutPlayer(newClass) {
	let container = document.getElementsByClassName("playerBox")[0]; //gets div

	container.className = 'playerBox ' + newClass;		//changes class to what player so style changes via CSS
	container.childNodes[1].innerHTML = currentPlayer.number;	//changes current name displayed
}


	var c;
function addMarker(element) {
	c = document.getElementById(element.id); //current canvas clicked on
	
	if (currentPlayer.number == 'Player One'){
		drawLine(20,20,180,180, green);
 		drawLine(180,20,20,180, green);
 		//animateCross()
 		return element.className = 'box taken Player One';
	}
	if (currentPlayer.number == 'Player Two'){
		drawCircle(red);
		return element.className = 'box taken Player Two';
	}
} 

function changeCursor() { 										//changes the marked canvases to auto cursors
	for (var i = 0; i < canvas.length; i++) {
		if(canvas[i].className.includes('taken')){
			canvas[i].style.cursor = "auto";
		}
	}
}

function addCursor(style) {				//adds cursor and style
	for (var i = 0; i < canvas.length; i++) {
		canvas[i].style.cursor = style;
	}
}

	var playerOneArray = [];
	var playerTwoArray = [];

	var checked;
function changeArray() { 				//decides which player is playing and what array to send. 
	if (currentPlayer.number == 'Player One') {
		checked = document.getElementsByClassName('box taken Player One'); 
		addToArray(playerOneArray);
		return;
	}
	if (currentPlayer.number == 'Player Two') {
		checked = document.getElementsByClassName('box taken Player Two'); 
		addToArray(playerTwoArray);
		return;
	} 
}

function addToArray(array) { 		//goes through every element that the currentPlayer has marked
	for (let i = 0; i < checked.length; i++) {
		if(!array.includes(Number(checked[i].id))) { 
			array.push(Number(checked[i].id))
		}
	}
	//console.log(currentPlayer.number + ':  ' + array);
	checkOutcome(array);
	return;
}


function checkOutcome(array) {
	var thisKey = checkCorrect(array,correctKey); //gets the correct array combination

	if (thisKey != false) {						  //if found a correct combination, proceed. 			  
		let index = findIndex(thisKey);
		let direction = findDirection(thisKey);

		drawWinnerLine(index, direction, currentPlayer.color);
		leaderboard();
		endGame();						 		
		return;
	}
	var draw = checkDraw();	//check to see if game has ended in a draw
	if (draw == true) {
		return;
	}
}

//Winner combinations 	//0	v	//1	v	//2	v	//3	h	//4	h	//5	h	//6	a	//7 a
const correctKey = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]]

function checkCorrect(arrayUser,arrayKey) {		//arrayUser is what the currentPlayer array is , key is corretCombo
	var cnt;
	for (var i = 0; i < arrayKey.length; i++) {
		cnt = 0;							
		for (var x = 0; x < arrayUser.length; x++) {
			if(arrayKey[i].includes(arrayUser[x])) {						
				cnt++;						
			}
			//console.log('User: ' + arrayUser + '  ' + arrayKey[i] + '   '+ 'counted: ' + cnt);
		}
		if (cnt == 3) {			
			return arrayKey[i];;
		}	
	}
	return false;  //if noone has won, return false
}


function findIndex(correctArray) { //find the index of the correct array in correctKey
	for (var i = 0; i < correctKey.length; i++) {
		if(correctArray.toString() == correctKey[i].toString()){
			if(i == 3 || i == 6) {
				return 0;
			}
			if(i == 4) {
				return 3;
			}
			if(i == 5) {
				return 6;
			} 
			if(i == 7) {
				return 2;
			}
			return i;
		}
	}
}

function findDirection(correctArray) { //checks the correctArray to determine what direction it should return.
	for (var i = 0; i < 3; i++) {
		if (correctArray.toString() == correctKey[i].toString()) { 
			return 'vertical';
		} 
	}
	for (var i = 0; i < 3; i++) {
		if (correctArray.toString() == correctKey[i+3].toString()) {
			return 'horisontal';
		} 
	}
	for (var i = 0; i < 2; i++) {
		if (correctArray.toString() == correctKey[i+6].toString()) {
			return 'across';
		} 
	} 
}


function drawWinnerLine(startIndex, direction, color) { //Draws winner line
	if (direction == 'vertical'){						//unique for loop pattern for each correct line
		for (let i = startIndex; i < 9+(1*startIndex); i+=3) {
			c = canvas[i];
			drawLine(100,0,100,200, color);
		}
		return;
	}
	if (direction == 'horisontal'){
		for (let i = startIndex; i < startIndex+3; i++) {
			c = canvas[i];
			drawLine(0,100,200,100, color);
		};
		return;
	}
	if (direction == 'across'){
		if (startIndex == 0){
			for (let i = 0; i < 3; i++) {
				c = canvas[i*4];
				drawLine(0,0,200,200, color);
			}
			return;
		}
		if (startIndex == 2){ 
			for (var i = 2; i < 7; i+=2) {
				c = canvas[i];
				drawLine(200,0,0,200, color);
			}
			return;
		}
	}
}

function checkDraw() { //if all the number of taken elements is 9, then its a draw, because a winnerline has not been drawn
	var canvas = document.getElementsByClassName('taken');
	if (canvas.length == 9) {
		endGame();
		for (var i = 0; i < player.length; i++) {
			player[i].increaseDraws();
		}
	showMessage('', "It's a draw!")
	printOutLeaderboard();
	return true;
	}
}

function reset() {
	playerOneArray.splice(0,playerOneArray.length);		//clears playerArray
	playerTwoArray.splice(0,playerTwoArray.length);

	document.getElementById("reset").innerHTML = "Reset";
	currentPlayer = player[0];

	clearCanvas();
	addCursor("pointer");								//adds pointer cursor back
	startGame();										//runs startGame to start game agian
	return;
}

function endGame() {			//removes all events and returns all cursors to auto style. 
	for (var i = 0; i < canvas.length; i++) {
		canvas[i].removeEventListener('click', updateValues);
	}
	document.getElementById("reset").innerHTML = "Play again!";
	addCursor("auto");
	
}

function leaderboard() {
	currentPlayer.increaseWins();
	showMessage('',currentPlayer.number + " has won!");

	if (currentPlayer.number == 'Player One') {
		playerTwo.increasLosses();
	} 
	if (currentPlayer.number == 'Player Two') {
		playerOne.increasLosses();
	}
	printOutLeaderboard(); 
	return;
}

function printOutLeaderboard() {
	var sidebar = document.getElementsByClassName('sidebar');

	for (var i = 0; i < sidebar.length; i++) {
		sidebar[i].childNodes[1].innerHTML = `${player[i].number}`;
		sidebar[i].childNodes[5].innerHTML = `<p>Total Games: ${player[i]._totalGames}</p>`;
		sidebar[i].childNodes[7].innerHTML = `<p>Wins: ${player[i].wins}</p>`;
		sidebar[i].childNodes[9].innerHTML = `<p>Losses: ${player[i]._losses}</p>`;
		sidebar[i].childNodes[11].innerHTML = `<p>Draws: ${player[i]._draw}</p>`;
	}
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


function drawLine(x1,y1,x2,y2,color) {
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineWidth = 5;
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.closePath();
	return;
}

function drawCircle(color) {
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(100, 100, 85, 0, 2 * Math.PI);
	ctx.lineWidth = 5;
	ctx.fillStyle = "white";
	ctx.strokeStyle = color;
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	return;
}

function clearCanvas() {	//clears each canvas
	c = canvas
	for (var i = 0; i < c.length; i++) {		
		let ctx = c[i].getContext("2d");	
		ctx.clearRect(0,0, c[i].width, c[i].height);	
		c[i].className = 'box';	
	}
}	

function showMessage(n, text) {
	var backgroundBlack = document.getElementsByClassName("background-fade")[0];
	var msg = document.getElementsByClassName("alert-message")[0];

	if (n == -1) {
		msg.style.display = "none";
		backgroundBlack.style.display = "none";
		//backgroundBlack.classList.toggle('fade');
		return;
	}
	msg.childNodes[1].innerHTML = text;
	msg.style.display = "block";
	backgroundBlack.style.display = "block";
	
	setInterval(showMessage, 1500, -1);
}

	var x1 = 20;
	var y1 = 20;
	var _x1 = 180;
	var _y1 = 20;
	var interval = 0;
	

function animateCross() {
	var start = window.requestAnimationFrame(animateCross);
	let x2 = x1+interval; //180
	let y2 = y1+interval; //180

	let _x2 = _x1 - interval; //20
	let _y2 = _y1 + interval;  //180
	
	drawLine(x1,y1,x2,y2, green);
	drawLine(_x1,_y1,_x2,_y2, green);

	if (((x2 && y2) >= 180) || (_x2 <= 20 && _y2 >= 180)) {
		x2 = 180;
		y2 = 180;
		_x2 = 20;
		_y2 = 180;
		cancelAnimationFrame(start);
		return false;	
	}
	interval += 5;
}	