let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.remove = '';
	this.changeStatus = function() {
		if (this.read == 'read') {
			this.read = 'not read yet';
		} else {
			this.read = 'read';
		}
	};
}

// function to create single book object and add that to the array
function addBookToLibrary(title, author, pages, read) {
	let book = new Book(title, author, pages, read);
	myLibrary.push(book);
	// myLibrary[myLibrary.length - 1].index = myLibrary.indexOf(book);
}

// Add some sample data
addBookToLibrary('Seto Dharti', 'Amar Neupane', 430, 'read');
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');

//First function generates the head of the table and second
//one generates the body of the table

let table = document.querySelector('table');
let data = Object.keys(myLibrary[0]);

function generateTableHead(table) {
	let thead = table.createTHead();
	let row = thead.insertRow();
	for (let key of data) {
		let th = document.createElement('th');
		let text = document.createTextNode(key);
		th.appendChild(text);
		row.appendChild(th);
	}
}

function generateTable(table, data) {
	for (let element of data) {
		let row = table.insertRow();
		let count = 0;
		for (key in element) {
			if (count < 4) {
				let cell = row.insertCell();
				let text = document.createTextNode(element[key]);
				cell.appendChild(text);
			} else if (count == 4) {
				let cell = row.insertCell();
				let text = document.createElement('button');
				text.innerText = 'Remove';
				let atr = document.createAttribute('onclick');
				atr.value = 'removeThis(this)';
				text.setAttributeNode(atr);
				let anatr = document.createAttribute('id');
				anatr.value = `${myLibrary.indexOf(element)}`;
				text.setAttributeNode(anatr);
				cell.appendChild(text);
			} else if (count == 5) {
				let cell = row.insertCell();
				let text = document.createElement('button');
				text.innerText = 'Change read status';
				let atr = document.createAttribute('onclick');
				atr.value = 'changeThis(this)';
				text.setAttributeNode(atr);
				let anatr = document.createAttribute('id');
				anatr.value = `${myLibrary.indexOf(element)}`;
				text.setAttributeNode(anatr);
				cell.appendChild(text);
			}
			count = count + 1;
		}
	}
}

function removeThis(incoming) {
	let index = incoming.id;
	myLibrary.splice(index, 1);
	render();
}

function changeThis(incoming) {
	let index = incoming.id;
	myLibrary[index].changeStatus();
	render();
}
//function to output the library data in a table
function render() {
	table.innerHTML = '';
	generateTable(table, myLibrary);
	generateTableHead(table);
}

render();

// let form = document.getElementsByClassName('main-form')[0];

let submitButton = document.getElementById('form-button');

submitButton.addEventListener('click', function(event) {
	event.preventDefault();
});

// submitButton.addEventListener(onclick, addBook);
var radioInput = '';
function addBook() {
	let name = document.getElementById('name').value;
	let author = document.getElementById('author').value;
	let pages = document.getElementById('pages').value;
	addBookToLibrary(name, author, pages, radioInput);
	render();
}

function radioValue(radio) {
	radioInput = radio;
	console.log(radioInput);
}
