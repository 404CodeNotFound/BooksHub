const { Genre } = require('../models');

module.exports = class GenresData {
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
            Genre.find({}, (err, genres) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(genres);
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

