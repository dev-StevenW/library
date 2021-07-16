const pageLibrary = document.querySelector("#mylibrary");
const addButton = document.querySelector("#newBook");
const bookForm = document.querySelector("#bookForm");
const addBookButton = document.querySelector("#addBook");

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
      return `${title} by ${author}, ${pages} pages, ${isRead}`;
    };
    this.isReadSwitch = function () {
      isRead = !isRead;
      this.previousSibling.textContent = `Read? ${isRead}`;
    };
  }
}

const myLibrary = [];
if (localStorage.myLibrary) {
  localLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  populateFromLocal(localLibrary);
} else {
  localLibrary = [];
}

function populateFromLocal(localLibrary) {
  localLibrary.map((book, i) => {
    const title = book.title;
    const author = book.author;
    const pages = book.pages;
    const isRead = book.isRead;
    addBookToLibrary(title, author, pages, isRead);
  });
}

function addBookButtonSwitch() {
  bookForm.classList.toggle("hidden");
  pageLibrary.classList.toggle("hidden");
  bookForm.classList.contains("hidden")
    ? (addButton.textContent = "Add Book")
    : (addButton.textContent = "Hide");
}

function getFormData() {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isread").checked;
  addBookToLibrary(title, author, pages, isRead);
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  addBook(myLibrary.length - 1, myLibrary);
  saveLocal(myLibrary);
}

function populate(myLibrary) {
  pageLibrary.innerText = "";
  myLibrary.forEach((book, i) => {
    addBook(i);
  });
}

function addBook(i) {
  const card = document.createElement("div");
  card.classList.add("book-wrap");
  card.dataset.index = i;
  card.addEventListener("transitionend", () => {
    card.remove();
  });

  const title = document.createElement("div");
  title.classList.add("book-title");
  title.textContent = `${myLibrary[i].title}`;
  card.appendChild(title);

  const author = document.createElement("div");
  author.classList.add("book-author");
  author.textContent = `${myLibrary[i].author}`;
  card.appendChild(author);

  const pages = document.createElement("div");
  pages.classList.add("book-pages");
  pages.textContent = `${myLibrary[i].pages} pages`;
  card.appendChild(pages);

  const isRead = document.createElement("div");
  isRead.classList.add("book-isRead");
  isRead.textContent = `Read? ${myLibrary[i].isRead}`;
  card.appendChild(isRead);

  const isReadButton = document.createElement("button");
  isReadButton.classList.add("isRead-button", "button");
  isReadButton.textContent = "Read?";
  isReadButton.addEventListener("click", myLibrary[i].isReadSwitch);
  card.appendChild(isReadButton);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button", "button");
  removeButton.textContent = "Remove";
  removeButton.dataset.index = i;
  removeButton.addEventListener("click", removeBook);
  card.appendChild(removeButton);

  pageLibrary.appendChild(card);
}

function removeBook(e) {
  const index = e.target.dataset.index;
  const book = document.querySelector(`div[data-index="${index}"]`);
  book.classList.add("removed");
  book.addEventListener("transitionend", () => {
    myLibrary.splice(index, 1);
    saveLocal(myLibrary);
    book.remove();
    populate(myLibrary);
  });
  /*  myLibrary.splice(index, 1);
  saveLocal(myLibrary);
  book.remove();
  populate(myLibrary); */
}

function saveLocal(myLibrary) {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

newBook.addEventListener("click", () => {
  addBookButtonSwitch();
});

populate(myLibrary);

function seed() {
  for (let i = 0; i < 7; i++) {
    addBookToLibrary("The Hobbit", "J.R.R Tolkien", "295", false);
  }
}
/*
seed();
 */
