const pool = require('../config/db')

class Books {
    constructor(author, country, imageLink, language, link, pages, title, year, id ) {
        this.author = author
        this.country = country
        this.imageLink = imageLink
        this.language =language
        this.link = link
        this.pages = pages
        this.title = title
        this.year = year
        this.id = id
    }
}

module.exports = {
    Books,
}