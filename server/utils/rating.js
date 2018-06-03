module.exports =
    {
        calculateNewRating: (ratings, newRating) => {
            let sum = newRating.stars;
            for (let i = 0; i < ratings.length; i++) {
                sum += ratings[i].stars;
            }
            const ratingsCount = ratings.length;

            return sum / (ratingsCount + 1);
        },
        calculateRating: (ratings) => {
            let sum = 0;
            for (let i = 0; i < ratings.length; i++) {
                sum += ratings[i].stars;
            }
            const ratingsCount = ratings.length;

            return sum / ratingsCount;
        }
    }