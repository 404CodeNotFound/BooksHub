module.exports = (data) => {
    return {
        getAuthor: (req, res) => {
            const authorId = req.params.id;
            if (!authorId) {
                res.status(400)
                    .json({ message: 'You should provide author id.' });
            } else {
                data.authors.getAuthorById(authorId)
                    .then(author => {
                        res.status(200)
                            .json({ author: author });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                        return res;
                    });
            }

            return res;
        },
        getAllAuthors: (req, res) => {
            const page = req.query.page;
            
            data.authors.getAllAuthors(page)
                .then(result => {
                    res.status(200)
                        .json(result);
                })
                .catch(error => {
                    res.status(500)
                        .json({ message: 'Something went wrong!' });
                });

            return res;
        },

        addAuthor: (req, res) => {
            if(req.user.role !== 'Admin') {
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
            if(req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: "Only Administrators can update books." });
            }

            const authorId = req.params.id;
            const author = req.body;
            
            data.authors.getAuthorById(authorId)
                .then(existingAuthor => {
                    if(!existingAuthor) {
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
                        .json({ message: 'Something went wrong!' })
                });
            
            return res;
        }
    }
}