const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => console.error(err));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: "79946673447-0e7h6b04a3aq1kfhb6qikml7rld246ah.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // // Check if the user already exists in our DB
        // let user = await User.findOne({ googleId: profile.id });

        // if (!user) {
        //   // If not, create a new user
        //   user = await new User({
        //     googleId: profile.id,
        //     username: profile.displayName,
        //     email: profile.emails[0].value,
        //     thumbnail: profile._json.picture,
        //   }).save();
        // }

        done(null, user);
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  )
);
