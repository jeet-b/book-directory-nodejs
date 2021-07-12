const router = require('express').Router();
const books = require('./books.json');

let booksDirectory = books;

router.get('/books', function (req, res) {
    res.send(booksDirectory);
});

router.get('/books/:id', function (req, res) {
    const { id } = req.params;

    const book = booksDirectory.find(b => b.id === parseInt(id));
    if (!book) {
        return res.status(404).send('Book does not exist');
    }
    else{    
        res.send(book);
    }
});

router.post('/books', function (req, res) {
    const {
        id,
        name,
        author
    } = req.body;

    const bookExist = booksDirectory.find(b => b.id === parseInt(id));
    if (bookExist) return res.send('Book already exist');

    const book = {
        id,
        name,
        author
    };
    booksDirectory.push(book);

    res.send(book);
});

router.put('/books/:ID', function (req, res) {
    const { ID } = req.params;
    const {
        id,
        name,
        author
    } = req.body;

    let book = booksDirectory.find(b => b.id === parseInt(ID));
    if (!book) return res.status(404).send('Book does not exist');

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...book,
        id: updateField(id, book.id),
        name: updateField(name, book.name),
        author: updateField(author, book.author)
    };

    const bookIndex = booksDirectory.findIndex(b => b.id === book.id);
    booksDirectory.splice(bookIndex, 1, updatedBook);

    res.status(200).send(updatedBook);
});

router.delete('/books/:id', function (req, res) {
    const { id } = req.params;

    let book = booksDirectory.find(b => b.id === parseInt(id));
    if (!book) return res.status(404).send('Book does not exist');

    booksDirectory = booksDirectory.filter(b => b.id !== parseInt(id));

    res.send('Success');
});

module.exports = router;