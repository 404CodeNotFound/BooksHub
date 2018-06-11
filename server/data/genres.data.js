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

    getGenreByName(name) {
        return new Promise((resolve, reject) => {
            return Genre.findOne({ name: name, isDeleted: false }, 'name')
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



