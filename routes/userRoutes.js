const express = require("express");
const {
	getAllUsers,
	getUserById,
	loginUser,
	registerUser,
} = require("../controllers/userController");
const { authMiddleware, adminOnly, signToken } = require("../middleware/auth");
const passport = require("passport");

const userRouter = express.Router();

//Get all users
userRouter.get("/", authMiddleware, getAllUsers);

//Get user by Id
userRouter.get("/:id", authMiddleware, adminOnly, getUserById);

//Register a user
userRouter.post("/register", registerUser);

//Login a user
userRouter.post("/login", loginUser);

//Github Authentication
userRouter.get(
	"/auth/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

//Github callback
userRouter.get(
	"/auth/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/login", 
		session: false, 
	}),
	(req, res) => {
		const token = signToken(req.user);
		res.json({ message: "GitHub login successful!", token, user: req.user });
	}
);

module.exports = userRouter;