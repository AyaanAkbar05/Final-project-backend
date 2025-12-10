const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.GITHUB_CALLBACK_URL, 
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log("This is the profile: \t\n", profile);
			try {
				const existingUser = await User.findOne({ githubId: profile.id });

				if (existingUser) {
					return done(null, existingUser);
				}

				const newUser = new User({
					githubId: profile.id,
					username: profile.username,
					email: profile.emails ? profile.emails[0].value : "test@mail.com", 
					password: Math.random().toString(36).slice(-8), 
				});

				console.log("newUser profile: \t\n", newUser);

				await newUser.save();
				done(null, newUser);
			} catch (err) {
				done(err);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => done(err, user));
});