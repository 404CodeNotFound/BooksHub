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
                const genre = req.body;

                data.genres.createGenre(genre)
                    .then(createdGenre => {
                        res.status(201)
                            .json({ genre: createdGenre });
                    })
                    .catch(error => {
                        res.status(500)
                            .json({ message: 'Something went wrong!' });
                    });
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