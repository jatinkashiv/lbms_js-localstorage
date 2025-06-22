function generateCustomID() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const datePart = `${yyyy}${mm}${dd}`;

    // Generate a random 3-digit number
    let randomPart;
    let customID;

    // Keep generating until a unique ID is found
    do {
      randomPart = Math.floor(100 + Math.random() * 900); // Ensures 100–999
      customID = `ID${datePart}${randomPart}`;
    } while (books.some((book) => book.id === customID));

    return customID;
  }

  let books = JSON.parse(localStorage.getItem("books")) || [];

  function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  function addBook() {
    const name = document.getElementById("bookName").value;
    const author = document.getElementById("bookAuthor").value;
    const id = generateCustomID();
    if (!name || !id) return alert("Please enter book name and ID");

    if (books.some((book) => book.id === id)) {
      return alert("Book ID already exists");
    }

    books.push({ id, name, author, isBorrowed: false });
    saveBooks();
    displayBooks();
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookId").value = "";
  }

  function toggleBorrowStatus(index) {
    books[index].isBorrowed = !books[index].isBorrowed;
    saveBooks();
    displayBooks();
  }

  function deleteBook(index) {
    books.splice(index, 1);
    saveBooks();
    displayBooks();
  }

  function displayBooks() {
    const tbody = document.querySelector("#bookTable tbody");
    tbody.innerHTML = "";

    books.forEach((book, index) => {
      const row = document.createElement("tr");
      if (book.isBorrowed) row.classList.add("borrowed");

      row.innerHTML = `
      <td>${book.id}</td> 
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.isBorrowed ? "Borrowed" : "Available"}</td>
      <td><button onclick="toggleBorrowStatus(${index})">
        ${book.isBorrowed ? "Return" : "Borrow"}</button></td>
      <td><button onclick="deleteBook(${index})">Delete</button></td>
    `;

      tbody.appendChild(row);
    });
  }

  displayBooks();