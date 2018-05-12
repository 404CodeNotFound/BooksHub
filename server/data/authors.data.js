const { Author } = require('../models')
const getPageOfCollection = require('../utils/pagination');

const itemsPerPage = 10;

module.exports = class AuthorsData {
    getOrAddAuthorByName(firstName, lastName) {
        return new Promise((resolve, reject) => {
            return Author.findOne({ 'first_name': firstName, 'last_name': lastName },
                (err, author) => {
                    if (err) {
                        return reject(err);
                    } else {
                        if (!author) {
                            return this.createAuthor(firstName, lastName);
                        }

                        return resolve(author);
                    }
                });
        });
    }

    createAuthor(firstName, lastName) {
        return new Promise((resolve, reject) => {
            const author = new Author();
            author.first_name = firstName;
            author.last_name = lastName;
            author.save((err, createdAuthor) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(createdAuthor);
                }
            });
        });
    }

    getAuthorById(id) {
        return new Promise((resolve, reject) => {
            return Author.findById(id)
                .populate({ path: 'books', select: 'title summary photo' })
                .exec((err, author) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(author);
                    }
                });
        });
    }

    addBookToAuthorCollection(bookId, authorId) {
        return new Promise((resolve, reject) => {
            Author.findOneAndUpdate({ _id: authorId }, { $push: { books: bookId } },
                { new: true }, (err, savedBook) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(savedBook);
                    }
                });
        });
    }

    getAllAuthors(page) {
        return new Promise((resolve, reject) => {
            Author.find({ 'isDeleted': false })
                .exec((err, authors) => {
                    if (err) {
                        return reject(err);
                    }

                    const pageAuthors = getPageOfCollection(authors, page, itemsPerPage);

                    const data = {
                        authors: pageAuthors,
                        authorsCount: authors.length
                    };

                    return resolve(data);
                });
        });
    }
}