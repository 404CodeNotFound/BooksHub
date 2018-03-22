const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { secret } = require('./config');

const configAuth = (app, { users }, passport, db) => {
    app.use(cookieParser('keyboard cat'));
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
    app.use(passport.initialize());

    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
        issuer: 'accounts.examplesoft.com',
        audience: 'yoursite.net',
    };

    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        const userId = jwt_payload.sub;
        users.getUserById(userId, function(err, user) {
            if (err) {
                return done(err, false);
            }

            if (user) {
                const userProfile = {
                    _id: user._id,
                    username: user.username,
                    firstName: user.first_Name,
                    lastName: user.last_Name,
                    nationality: user.nationality,
                    age: user.age,
                    favouriteQuote: user.favourite_quote,
                    photo: user.photo,
                };
                return done(null, userProfile);
            } else {
                return done(null, false);
            }
        });
    }));
};

module.exports = configAuth;