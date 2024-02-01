const express = require('express')
const fs = require('fs')
const url = require('url')

const bookData = 'books.json'
const app = express()

app.get('/', (req, res) => {
    fs.readFile('./templates/index.html', (err, data) => {
        if(err){
            console.log('Error')
        }
        console.log('HTML found')
        res.writeHead(200, {"Content-Type": "text/html"})
        res.write(data)
        res.end()
    })
})

app.get('/books', (req, res) => {
    fs.readFile(bookData, (err, data) => {
        if(err) {
            res.writeHead(400, "Not found")
        }
        res.writeHead(200, {"Content-Type": "text/html"})
        books = JSON.parse(data)
        res.write("books")
        console.log(books)
        res.end()
    })
})

app.get("/books/:id", (req, res) => {
    var bookId = req.params.id
    bookId = parseInt(bookId)
    fs.readFile(bookData, (err, data) => {
        if(err) {
            res.writeHead(400)
        }
        let books = JSON.parse(data)
        console.log(books)
        let book = books.find(b => b.id === bookId)
        if(book !=undefined) {
            resp = {
                "Title": book.title,
                "Country": book.country,
                "language": book.language,
                "pages": book.pages,
                "year": book.year
            }
            res.writeHead(200, {"Content-Type": "json"})
            res.write(JSON.stringify(resp))
            res.end();
        }
        else {
            res.writeHead(400, {"Cntent-Type": "json"})
        res.end('Not found')
        }
    })
})


app.get('/search/', (req, res) => {
    var searchString = url.parse(req.url, true);
    var searchQuery = searchString.query.q; // assuming the search query is provided as 'q'
    fs.readFile(bookData, (err, data) => {
        if(err) {
            res.writeHead(400);
            res.end();
            return;
        }
        let books = JSON.parse(data);
        let matchingBooks = books.filter(b => 
            Object.values(b).some(val => 
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        if(matchingBooks.length > 0) {
            let resp = matchingBooks.map(book => ({
                "Title": book.title,
                "Country": book.country,
                "language": book.language,
                "pages": book.pages,
                "year": book.year
            }));
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(resp));
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.write(JSON.stringify({ message: 'Not found' }));
        }
        res.end();
    });
});

app.listen(1000, () => {
    console.log('Server is live')
})