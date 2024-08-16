const myLibrary = []

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read){
    // const title = prompt("What is the name of the book?")
    // const author = prompt("who is the author");
    // const pages = prompt("How many pages is the book?");
    // const read = prompt("Have you read the book? yes/no").toLowerCase()==='yes';

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    displayBooks();
}

function removeBook(index){
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks(){
    const libraryContainer = document.querySelector('#libraryContainer');
    libraryContainer.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookElement = document.createElement('div')
        bookElement.classList.add('book');
        bookElement.dataset.index = index;
        bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: <span class="read-status">${book.read ? 'Yes' : 'No'}</span></p>
        <button class="remove-btn">Remove</button>
        <button class="toggle-read-btn">Toggle Read</button>
        `;
        libraryContainer.appendChild(bookElement);

        bookElement.querySelector('.remove-btn').addEventListener('click', () => removeBook(index));
        bookElement.querySelector('.toggle-read-btn').addEventListener('click', () => {
            book.toggleRead();
            bookElement.querySelector('.read-status').textContent = book.read ? 'Yes' : 'No';
        });
        
    });
}
const newBookBtn = document.getElementById('newBookBtn');
const formContainer = document.getElementById('formContainer');
const newBookForm = document.getElementById('newBookForm');

newBookBtn.addEventListener('click', () => {
    formContainer.style.display = 'block';
});

newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    
    // Reset form and hide it
    newBookForm.reset();
    formContainer.style.display = 'none';
});
