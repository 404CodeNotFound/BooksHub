module.exports = (data) => {
    return {
        getAllGenres: (req, res) => {
            data.genres.getAllGenres()
                .then(genres => {
                    res.status(200)
                        .json({ genres: genres, genresCount: genres.length });
                })
                .catch(error => {
                    res.status(500)
                        .json({ message: 'Something went wrong!' })
                    return res;
                });

            return res;            
        },

        addGenre: (req, res) => {
            if (req.user.role !== 'Admin') {
                res.status(403)
                    .json({ message: "Only Administrators can add new genres." });
            } else {
                req.checkBody('name', 'Name is required.').notEmpty();

                const errors = req.validationErrors();

                if (errors) {
                    return res.status(400)
                        .json(errors);
                } else {
                    const genre = req.body;

                    data.genres.getGenreByName(genre.name)
                        .then(genreName => {
                            if (genreName) {
                                res.status(400)
                                    .json({ message: 'Genre with that name already exists.' });
                            } else {
                                data.genres.createGenre(genre)
                                    .then(createdGenre => {
                                        res.status(201)
                                            .json({ genre: createdGenre });
                                    });
                            }
                        })
                        .catch(error => {
                            res.status(500)
                                .json({ message: 'Something went wrong!' });
                        });
                }
            }

            return res;
        },

        deleteGenre: (req, res) => {
            if (req.user.role !== 'Admin') {
                return res.status(403)
                    .json({ message: "Only Administrators can delete genres." });
            }

            const genreId = req.params.id;

            data.genres.getGenreById(genreId)
                .then(foundGenre => {
                    if (!foundGenre) {
                        return res.status(404)
                            .json({ message: 'Genre with provided ID does not exist.' });
                    }

                    data.genres.deleteGenre(genreId)
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