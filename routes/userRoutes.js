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

userRouter.get("/", authMiddleware, getAllUsers);

userRouter.get("/:id", authMiddleware, adminOnly, getUserById);

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get(
	"/auth/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

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