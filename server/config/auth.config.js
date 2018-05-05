const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { secret } = require('./config');


const configAuth = {
    init: (app, { users }, passport, db) => {
        app.use(cookieParser('keyboard cat'));
        app.use(bodyParser.urlencoded({
            extended: true,
        }));
        app.use(bodyParser.json());
        app.use(passport.initialize());
        const options = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret
        };

        passport.use('jwt', new JwtStrategy(options, function (jwt_payload, done) {
            const userId = jwt_payload.id;

            users.getUserById(userId)
            .then(user => {
                if (user) {
                    const userProfile = {
                        _id: user._id,
                        username: user.username,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        role: user.role
                    };
                    return done(null, userProfile);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => {
                return done(err, false);
            });
        }));
    },
    authenticate: (passport) => {
        return (req, res, next) => passport.authenticate("jwt", { session: false })(req, res, next);
    }
};

module.exports = configAuth;