const { Genre } = require('../models');

module.exports = class GenresData {

    createGenre(genre) {
        return new Promise((resolve, reject) => {
            let newGenre = new Genre();
            newGenre.name = genre.name;

            newGenre.save((err, createdGenre) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(createdGenre);
                }
            });
        });
    }

    getBooksByGenres(genres) {
        return new Promise((resolve, reject) => {
            Genre.find({ '_id': { $in: genres } })
                .populate({
                    path: 'books',
                    populate: {
                        path: 'author',
                        select: 'first_name last_name'
                    }
                })
                .select('books')
                .limit(4)
                .exec((err, foundCollection) => {
                    if (err) {
                        return reject(err);
                    } else {
                        let books = [];
                        foundCollection.forEach(booksInCollection => {
                            booksInCollection.books.forEach(book => {
                                if (!book.isDeleted) {
                                    books.push(book);
                                }
                            });
                        });

                        const randomBooks = getRandomRecommendedBooks(books);
                        return resolve(randomBooks);
                    }
                });
        });
    }

    getAllGenres() {
        return new Promise((resolve, reject) => {
            Genre.find({ 'isDeleted': false }, (err, genres) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(genres);
                }
            });
        });
    }

    getGenreById(id) {
        return new Promise((resolve, reject) => {
            return Genre.findById(id)
                .exec((err, genre) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(genre);
                    }
                });
        });
    }

    deleteGenre(id) {
        return new Promise((resolve, reject) => {
            Genre.findOneAndUpdate({ '_id': id }, {
                $set: {
                    isDeleted: true
                }
            }, { new: true }, (err, genre) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(genre);
                }
            });
        });
    }
}

function getRandomRecommendedBooks(books) {
    const count = 4;
    const shuffled = books.sort(() => .5 - Math.random());
    let selected = shuffled.slice(0, count);

    return selected;
}

