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
            let books = [];
            const genresCount = genres.length;
            for (let i = 0; i < genresCount; i++) {
                const genreId = genres[i];
                Genre.findById(genreId)
                    .populate({
                        path: 'books',
                        populate: {
                            path: 'author',
                            select: 'first_name last_name'
                        }
                    })
                    .select('books')
                    .limit(4)
                    .exec((err, foundBooks) => {
                        if (err) {
                            return reject(err);
                        } else {
                            books = [...books, ...foundBooks.books];

                            if (i === genresCount - 1) {
                                const randomBooks = getRandomRecommendedBooks(books);
                                return resolve(randomBooks);
                            }
                        }
                    });
            }
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

