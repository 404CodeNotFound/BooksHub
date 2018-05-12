module.exports = (data) => {
    return {
        getAllGenres: (req, res) => {
            // if (req.user.role !== 'Admin') {
            //     res.status(403)
            //         .json({ message: 'Only Administrator can get all genres.' });
            // } else {
            //     data.genres.getAllGenres()
            //         .then(genres => {
            //             res.status(200)
            //                 .json({ genres: genres });
            //         })
            //         .catch(error => {
            //             res.status(500)
            //                 .json({ message: 'Something went wrong!' })
            //             return res;
            //         });
            // }

            data.genres.getAllGenres()
                .then(genres => {
                    res.status(200)
                        .json({ genres: genres });
                })
                .catch(error => {
                    res.status(500)
                        .json({ message: 'Something went wrong!' })
                    return res;
                });

            return res;            
        }
    }
}