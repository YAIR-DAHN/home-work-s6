const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//ספרייה
let books = [
    { id: 1, title: 'tehilim', author: 'king david' },
    { id: 2, title: 'hamahapah', author: 'rabbay zamor chohen' },
    { id: 3, title: 'mishna brura', author: 'hazon iish' },
    { id: 4, title: 'solhan aaruh', author: 'bet yusef' },
    { id: 5, title: 'yabia omer', author: 'rabbay ovadia yosef' },
];
//הצגת דף הבית
app.get('/', (req, res) => {
    fs.createReadStream(path.join(__dirname,
        '/src/index.html')).pipe(res);
    });

//הצגת כל הספרים
app.get('/books', (req, res) => {
    res.send(books)
});

//הצגת ספר ספציפי
app.get('/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) res.status(404).send('מצטערים, אבל הספר המבוקש לא נמצא');
    res.send(book);
});

//הוספת ספר חדש
app.post('/books', (req, res) => {
    let book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(book);
    console.log("התבצעה הוספת ספר" + book);
    res.send('הספר נוסף בהצלחה,');
});

//עדכון ספר קיים
app.put('/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) res.status(404).send(' מצטערים, אבל הספר המבוקש לא נמצא אם ברצונך להוסיף ספר חדש השתמש בpost');
    book.title = req.body.title;
    book.author = req.body.author;
    console.log("התבצעה עדכון ספר" + book);
    res.send('הספר עודכן בהצלחה,');
});

//עדכון שדה ספציפי בספר קיים
app.patch('/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) res.status(404).send(' מצטערים, אבל הספר המבוקש לא נמצא');
    let title = req.body.title;
    let author = req.body.author;
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    console.log("התבצעה עדכון שדה ספציפי בספר" + book);
    res.send('הספר עודכן בהצלחה,');
});

//מחיקת ספר קיים
app.delete('/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) res.status(404).send(' מצטערים, אבל הספר המבוקש לא נמצא');
    let index = books.indexOf(book);
    books.splice(index, 1);
    console.log("התבצעה מחיקת ספר" + book);
    res.send('הספר נמחק בהצלחה,');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
