const errors = require('../../utils/error.constants');
const generateErrorResponse = require('../../utils/error.responses');

module.exports = (data) => {
    return {
        getAuthor: (req, res) => {
            const authorId = req.params.id;
            if (!authorId) {
                res.status(400)
                    .json({ message: errors.MISSING_AUTHOR_ID });
            } else {
                data.authors.getAuthorById(authorId)
                    .then(author => {
                        if (author) {
                            res.status(200)
                                .json({ author: author });
                        } else {
                            throw Error(errors.AUTHOR_NOT_FOUND);
                        }
                    })
                    .catch(error => {
                        generateErrorResponse(res, error.message);
                    });
            }

            return res;
        },
        getAllAuthors: (req, res) => {
            if (req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: errors.PERMISSIONS_DENIED });
            }

            const page = req.query.page;

            data.authors.getAllAuthors(page)
                .then(result => {
                    res.status(200)
                        .json(result);
                })
                .catch(error => {
                    generateErrorResponse(res, error.message);
                });

            return res;
        },

        addAuthor: (req, res) => {
            if (req.user.role !== 'Admin') {
                res.status(403)
                    .json({ message: "Only Administrators can add new books." });
            } else {
                const author = req.body;

                data.authors.createAuthor(author)
                    .then(createdAuthor => {
                        res.status(201)
                            .json({ author: createdAuthor });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' })
                    });
            }

            return res;
        },

        updateAuthor: (req, res) => {
            if (req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: "Only Administrators can update books." });
            }

            const authorId = req.params.id;
            const author = req.body;

            data.authors.getAuthorById(authorId)
                .then(existingAuthor => {
                    if (!existingAuthor) {
                        return res.status(404)
                            .json({ message: "Author with that id has not been found." });
                    }

                    data.authors.updateAuthor(authorId, author)
                        .then(updatedAuthor => {
                            return res.status(201)
                                .json({ author: updatedAuthor });
                        })
                })
                .catch(error => {
                    return res.status(500)
                        .json({ message: 'Something went wrong!' });
                });

            return res;
        },

        deleteAuthor: (req, res) => {
            if (req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: "Only Administrators can delete books." });
            }

            const authorId = req.params.id;

            data.authors.getAuthorById(authorId)
                .then(foundAuthor => {
                    if (!foundAuthor) {
                        return res.status(404)
                            .json({ message: 'Author with provided ID does not exist.' });
                    }

                    data.authors.deleteAuthor(authorId)
                        .then(() => {
                            return res.status(204)
                                .json("Removed");
                        });
                })
                .catch(error => {
                    return res.status(500)
                        .json({ message: 'Something went wrong!' });
                });
        }
    }
}