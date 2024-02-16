let myLibrary = [];

// Load the book data from localStorage when the page is loaded
if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
} else {
    myLibrary = [];
}

// Load the book data from localStorage when the page is loaded
if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
} else {
    myLibrary = [];
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary)); // Save the book data to localStorage
}

function removeBookFromLibrary(title) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary)); 
}

function displayBooks() {
    const bookContent = document.querySelector('.bookContent');
    bookContent.innerHTML = ''; // Clear the book content

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');

        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p class="readStatus ${book.read ? 'read' : ''}">${book.read ? 'Read' : 'Not Read'}</p>
            <button class="toggle-read-button">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
            <button class="remove-button">Remove</button>
        `;

        // Add an event listener to the toggle read button
        bookCard.querySelector('.toggle-read-button').addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the click event from bubbling up to the book card
            book.read = !book.read; // Toggle the read status of the book
            displayBooks(); // Update the book display
        });

        // Add an event listener to the remove button
        bookCard.querySelector('.remove-button').addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the click event from bubbling up to the book card
            removeBookFromLibrary(book.title);
            displayBooks();
        });

        bookContent.appendChild(bookCard);
    }
}


// Modal Operation
var modal = document.getElementById("addBookModal");
var modalOverlay = document.getElementById("overlay");
var btn = document.getElementById("addBook");
var span = document.getElementsByClassName("close")[0];
 
btn.onclick = function() {
    modal.style.display = "block";
    modalOverlay.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
}

displayBooks();


// Add book form
let bookForm = document.getElementById('addBookForm');
bookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    modal.style.display = "none";
    modalOverlay.style.display = "none";
    bookForm.reset();
});