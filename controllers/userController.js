const User = require("../models/User");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "2h"; 

//Get all users
async function getAllUsers(req, res) {
	console.log(req.user);

	if (!req.user) {
		return res
			.status(401)
			.json({ message: "You must be logged in to see this!" });
	}

	const user = await User.find();
	res.json(user);
}

//Get user by id
function getUserById(req, res) {
	res.send(`Data for user: ${req.params.id}`);
}

//REGISTER
async function registerUser(req, res) {
	try {
		const alreadyExist = await User.findOne({ email: req.body.email });
		if (alreadyExist) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const user = await User.create(req.body);

		res.status(201).json({
			message: `User created: username: ${req.body.username} and email: ${req.body.email}`,
		});
	} catch (error) {
		console.log(error.message);
	}
}

//LOGIN
async function loginUser(req, res) {
	try {
		const { email, password } = req.body;


		const dbUser = await User.findOne({ email });

		if (!dbUser) {
			return res.status(400).json({ message: "Incorrect email or password" });
		}

		const passwordMatched = await dbUser.isCorrectPassword(password);

		if (!passwordMatched) {
			return res.status(400).json({ message: "Incorrect email or password" });
		}

		const payload = {
			_id: dbUser._id,
			username: dbUser.username,
			email: dbUser.email,
			role: dbUser.role,
		};
		const token = jwt.sign({ data: payload }, secret, {
			expiresIn: expiration,
		});

		res.json({ token, dbUser });
	} catch (error) {}
}

module.exports = {
	getAllUsers,
	getUserById,
	registerUser,
	loginUser,
};