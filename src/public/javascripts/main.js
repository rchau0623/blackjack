const deck = [
	{char: 'A', num: 1, type: '&diams;'}, 
	{char: '2', num: 2, type: '&diams;'}, 
	{char: '3', num: 3, type: '&diams;'}, 
	{char: '4', num: 4, type: '&diams;'}, 
	{char: '5', num: 5, type: '&diams;'}, 
	{char: '6', num: 6, type: '&diams;'}, 
	{char: '7', num: 7, type: '&diams;'}, 
	{char: '8', num: 8, type: '&diams;'}, 
	{char: '9', num: 9, type: '&diams;'}, 
	{char: '10', num: 10, type: '&diams;'}, 
	{char: 'J', num: 10, type: '&diams;'}, 
	{char: 'Q', num: 10, type: '&diams;'}, 
	{char: 'K', num: 10, type: '&diams;'},

	{char: 'A', num: 1, type: '&clubs;'}, 
	{char: '2', num: 2, type: '&clubs;'}, 
	{char: '3', num: 3, type: '&clubs;'}, 
	{char: '4', num: 4, type: '&clubs;'}, 
	{char: '5', num: 5, type: '&clubs;'}, 
	{char: '6', num: 6, type: '&clubs;'}, 
	{char: '7', num: 7, type: '&clubs;'},
	{char: '8', num: 8, type: '&clubs;'},
	{char: '9', num: 9, type: '&clubs;'}, 
	{char: '10', num: 10, type: '&clubs;'}, 
	{char: 'J', num: 10, type: '&clubs;'}, 
	{char: 'Q', num: 10, type: '&clubs;'}, 
	{char: 'K', num: 10, type: '&clubs;'},
	
	{char: 'A', num: 1, type: '&hearts;'}, 
	{char: '2', num: 2, type: '&hearts;'}, 
	{char: '3', num: 3, type: '&hearts;'}, 
	{char: '4', num: 4, type: '&hearts;'}, 
	{char: '5', num: 5, type: '&hearts;'}, 
	{char: '6', num: 6, type: '&hearts;'}, 
	{char: '7', num: 7, type: '&hearts;'}, 
	{char: '8', num: 8, type: '&hearts;'}, 
	{char: '9', num: 9, type: '&hearts;'}, 
	{char: '10', num: 10, type: '&hearts;'}, 
	{char: 'J', num: 10, type: '&hearts;'}, 
	{char: 'Q', num: 10, type: '&hearts;'}, 
	{char: 'K', num: 10, type: '&hearts;'},
	
	{char: 'A', num: 1, type: '&spades;'}, 
	{char: '2', num: 2, type: '&spades;'}, 
	{char: '3', num: 3, type: '&spades;'}, 
	{char: '4', num: 4, type: '&spades;'}, 
	{char: '5', num: 5, type: '&spades;'}, 
	{char: '6', num: 6, type: '&spades;'}, 
	{char: '7', num: 7, type: '&spades;'}, 
	{char: '8', num: 8, type: '&spades;'}, 
	{char: '9', num: 9, type: '&spades;'}, 
	{char: '10', num: 10, type: '&spades;'}, 
	{char: 'J', num: 10, type: '&spades;'}, 
	{char: 'Q', num: 10, type: '&spades;'}, 
	{char: 'K', num: 10, type: '&spades;'}
];

let player;
let playerIndex;
let cpu;
let cpuIndex;
let shuffled;

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function hit(user) {
	let temp = shuffled.shift();
	shuffled.push(temp);
	user.push(temp);
	return user;
}

function getTotal(user) {
	let total = 0;
	let aces = 0;
	for (let i = 0; i < user.length; i++) {
		if (user[i].char === 'A') { aces++; }
		total += user[i].num;
	} 
	if (total < 12 && aces > 0) { total += 10; }
	return total;
}

function cpuMove() {
	while (getTotal(player) > getTotal(cpu)) { 
		cpu = hit(cpu); 
		displayCard(cpu[cpuIndex]);
		cpuIndex++;
	} document.querySelector('.cpuTotal').innerHTML = 'Computer Hand - Total: ' + getTotal(cpu) + '<p>';
}

function showHidden() {
	let card = document.createElement('div');
	card.setAttribute('class', 'card');
	card.style.transform = 'rotate(' + getRandomInt(-3,3) + 'deg)';
	
	let style = document.createElement('div');
	style.setAttribute('class', 'top');
	style.innerHTML = cpu[1].char + '<br>' + cpu[1].type;
	card.appendChild(style);
	
	if (cpu[1].type === '&hearts;' || cpu[1].type === '&diams;') { style.style.color = 'red'; }
	else { style.style.color = 'black'; }

	style = document.createElement('div');
	style.setAttribute('class', 'suit');
	style.innerHTML = cpu[1].type;
	card.appendChild(style);
	
	if (cpu[1].type === '&hearts;' || cpu[1].type === '&diams;') { style.style.color = 'red'; }
	else { style.style.color = 'black'; }

	style = document.createElement('div');
	style.setAttribute('class', 'bottom');
	style.innerHTML = cpu[1].type + '<br>' + cpu[1].char;
	card.appendChild(style);

	if (cpu[1].type === '&hearts;' || cpu[1].type === '&diams;') { style.style.color = 'red'; }
	else { style.style.color = 'black'; }

	document.querySelector('.cpuHand').replaceChild(card, document.querySelector('.hiddenCard'));
}

function deal() {
	for (let i = 0; i < 2; i++) {
		let x = shuffled.shift();
		shuffled.push(x);
		cpu.push(x);
		x = shuffled.shift();
		shuffled.push(x);
		player.push(x); 
	}
}

function elevator(arr) {
	let k = 0; 
	for (let i = arr.length; i >= 0; i--) {
		for (let j = k; j < shuffled.length; j++) {
			if (arr[i] === shuffled[j].char) {
				const temp = shuffled[j];
				shuffled.splice(j, 1);
				shuffled.splice(0, 0, temp);
				k++;
				break;
			}
		}
	}
}

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	} return deck;
}

function displayCard(x, play) {
	let card = document.createElement('div');
	card.setAttribute('class', 'card');
	card.style.transform = 'rotate(' + getRandomInt(-3,3) + 'deg)';
	
	
	let style = document.createElement('div');
	style.setAttribute('class', 'top');
	style.innerHTML = x.char + '<br>' + x.type;
	card.appendChild(style);
	
	if (x.type === '&hearts;' || x.type === '&diams;') { style.style.color = 'red'; }
	else { style.style.color = 'black'; }

	style = document.createElement('div');
	style.setAttribute('class', 'suit');
	style.innerHTML = x.type;
	card.appendChild(style);

	if (x.type === '&hearts;' || x.type === '&diams;') { style.style.color = 'red'; }
	else { style.style.color = 'black'; }
	
	style = document.createElement('div');
	style.setAttribute('class', 'bottom');
	style.innerHTML = x.type + '<br>' + x.char;
	card.appendChild(style);
	
	if (x.type === '&hearts;' || x.type === '&diams;') { style.style.color = 'red'; }
	else { style.style.color = 'black'; }

	if (play) { document.querySelector('.playerHand').appendChild(card); }
	else { document.querySelector('.cpuHand').appendChild(card); }
}

function display() {
	const game = document.querySelector('.game');
	
	const cpuDiv = document.createElement('div');
	cpuDiv.setAttribute('class', 'cpu');

	const playerDiv = document.createElement('div');
	playerDiv.setAttribute('class', 'player');

	const cpuTotal = document.createElement('div');
	cpuTotal.setAttribute('class', 'cpuTotal');
	cpuTotal.innerHTML = 'Computer Hand - Total: ?';
	
	const playerTotal = document.createElement('div');
	playerTotal.setAttribute('class', 'playerTotal');
	playerTotal.innerHTML = 'Player Hand - Total: ' + getTotal(player);

	const cpuHand = document.createElement('div');
	cpuHand.setAttribute('class', 'cpuHand');
	
	const playerHand = document.createElement('div');
	playerHand.setAttribute('class', 'playerHand');
	
	const hidden = document.createElement('div');
	hidden.setAttribute('class', 'hiddenCard');
	hidden.style.transform = 'rotate(' + getRandomInt(-3,3) + 'deg)';
	cpuHand.appendChild(hidden);
	
	const buttons = document.createElement('div');
	buttons.setAttribute('class', 'buttons');
	
	const hit = document.createElement('input');
	hit.setAttribute('class', 'hit');
	hit.setAttribute('type', 'submit');
	hit.setAttribute('value', 'Hit');
	
	const stand = document.createElement('input');
	stand.setAttribute('class', 'stand');
	stand.setAttribute('type', 'submit');
	stand.setAttribute('value', 'Stand');
	
	cpuDiv.appendChild(cpuTotal);
	playerDiv.appendChild(playerTotal);
	cpuDiv.appendChild(cpuHand);
	playerDiv.appendChild(playerHand);
	buttons.appendChild(hit);
	buttons.appendChild(stand);
	playerDiv.appendChild(buttons);
	game.appendChild(cpuDiv);
	game.appendChild(playerDiv);

	displayCard(cpu[0], false);
	for (let i = 1; i >= 0; i--) {
		displayCard(player[i], true);
	}
}

function start(rigged) {
	if (rigged !== undefined) { elevator(rigged.split(',')); }
	deal(shuffled);
	display();
}

function displayMessage(i) {
	const message = document.createElement('div');
	message.setAttribute('class', 'message');
	if (i === 1) { message.innerHTML = 'You win, you sly dog, you!'; }
	else if (i === 0) { message.innerHTML = 'You win some, you lose some, and sometimes you just tie.'; }
	else if (i === -1) { message.innerHTML = 'You lost, but you can try again with this cool reset button I implemented below. ;)'; }

	const reset = document.createElement('input');
	reset.setAttribute('class', 'reset');
	reset.setAttribute('type', 'submit');
	reset.setAttribute('value', 'Reset');

	document.querySelector('.buttons').removeChild(document.querySelector('.hit'));
	document.querySelector('.buttons').removeChild(document.querySelector('.stand'));
	document.querySelector('.buttons').appendChild(reset);
	
	document.querySelector('.player').insertBefore(message, document.querySelector('.buttons'));

	document.querySelector('.player').insertBefore(document.createElement('br'), document.querySelector('.buttons'));

	document.querySelector('.reset').addEventListener('click', function() {
		let x = document.querySelector('.game');
		while (x.firstChild) { x.removeChild(x.firstChild); }
		game();
	});
}

function twentyOne() {
	cpuMove();
	showHidden();
	const cpuTot = getTotal(cpu);
	document.querySelector('.cpuTotal').innerHTML = 'Computer Hand - Total: ' + cpuTot;
	if (cpuTot > 21) {
		displayMessage(1);
	} else if (cpuTot === 21) {
		displayMessage(0);
	} else {
		displayMessage(-1);
	}
}

function game(rigged) {
	player = [];
	playerIndex = 2;
	cpu = [];
	cpuIndex = 2;
	shuffled = shuffle(deck);

	document.querySelector('.start').style.display = 'none';
	start(rigged);
	if (getTotal(player) === 21) { twentyOne(); }
	else {
		document.querySelector('.hit').addEventListener('click', function() {
			player = hit(player);
			displayCard(player[playerIndex], true);
			playerIndex++;
			document.querySelector('.playerTotal').innerHTML = 'Player Hand - Total: ' + getTotal(player);
			if (getTotal(player) > 21) {
				showHidden();
				document.querySelector('.cpuTotal').innerHTML = 'Computer Hand - Total: ' + getTotal(cpu);
				displayMessage(-1);
				
			} else if (getTotal(player) === 21) {
				twentyOne();
			}
		});
		document.querySelector('.stand').addEventListener('click', function() {
			//document.querySelector('.buttons').style.display = 'none';
			cpuMove();
			showHidden();
			const cpuTot = getTotal(cpu);
			const playerTot = getTotal(player);
			document.querySelector('.cpuTotal').innerHTML = 'Computer Hand - Total: ' + cpuTot;
			if (cpuTot > 21) {
				displayMessage(1);
			} else if (cpuTot > playerTot) {
				displayMessage(-1);
			} else if (cpuTot == playerTot) {
				displayMessage(0);
			} else {
				displayMessage(1);
			}
		});
	}
}

function main() {
	let rigged;
	document.querySelector('.playBtn').addEventListener('click', function(evt) {
		evt.preventDefault();
		rigged = document.querySelector('#startValues').value;
		game(rigged);
	});
}

document.addEventListener('DOMContentLoaded', main);