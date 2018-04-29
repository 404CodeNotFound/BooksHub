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
        },
        addReview: (req, res) => {
            const review = req.body;
            if(!review.user) {
                res.status(400)
                    .json({ message: "You should provide id of user." });
            } else if(!review.book) {
                res.status(400)
                    .json({ message: "You should provide id of book." });
            } else if(!review.content) {
                res.status(400)
                    .json({ message: "You should provide content of review." });
            } else {
                data.reviews.createReview(review)
                .then(createdReview => data.books.addReviewToBook(createdReview.book, createdReview))
                .then(createdReview => data.users.addReviewToUser(review.user, createdReview))
                .then(createdReview => {
                    res.status(201)
                        .json({ review: createdReview });
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