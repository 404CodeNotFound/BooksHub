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
                            .json({ message: 'Something went wrong!' })
                        return res;
                    });
            }

            return res;
        }
    }
}