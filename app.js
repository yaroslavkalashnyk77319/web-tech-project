document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('book-list');

    const getBooks = () => {
        return JSON.parse(localStorage.getItem('books')) || [];
    };

    const saveBooks = (books) => {
        localStorage.setItem('books', JSON.stringify(books));
    };

    const renderBooks = () => {
        const books = getBooks();
        bookList.innerHTML = '';

        if (books.length === 0) {
            bookList.innerHTML = '<p>Brak dodanych książek. Dodaj pierwszą powyżej!</p>';
            return;
        }

        books.forEach(book => {
            const div = document.createElement('div');
            div.className = 'book-item';
            div.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Autor:</strong> ${book.author}</p>
                <p>${book.description}</p>
            `;
            bookList.appendChild(div);
        });
    };

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const newBook = {
            id: Date.now(), 
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            description: document.getElementById('description').value
        };

        const books = getBooks();
        books.push(newBook);
        saveBooks(books);
        
        renderBooks(); 
        bookForm.reset(); 
    });

    renderBooks();
});
