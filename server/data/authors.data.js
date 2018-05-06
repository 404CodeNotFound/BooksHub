const { Author } = require('../models')

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
}