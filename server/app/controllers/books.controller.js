module.exports = (data) => {
    return {
        getBook: (req, res) => {
            const title = req.params.title;

            if (!title) {
                res.status(400)
                    .json({ message: "You should provide title of book." });
            } else {
                data.books.getBookByTitle(title)
                    .then(book => {
                        if (!book) {
                            res.status(404)
                                .json({ message: "Book was not found." })
                        } else {
                            res.status(200)
                                .json({ book });
                        }
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' })
                    });
            }

            return res;
        }
    }
}