const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiration = "24h";

function authMiddleware(req, res, next) {
	let token = req.body?.token || req.query?.token || req.headers?.authorization;
	if (req.headers.authorization) {
		token = token.split(" ").pop().trim();
	}
	if (!token) {
		next();
	}
	try {
		const { data } = jwt.verify(token, secret, { maxAge: expiration });
		req.user = data;
	} catch {
		console.log("Invalid token");
	}
	next();
}

function adminOnly(req, res, next) {
	if (req.user && req.user.role === "admin") {
		next(); 
	} else {
		res.status(403).json({ message: "Access denied. Admins only." });
	}
}

function signToken({ username, email, _id }) {
	const payload = { username, email, _id };
	return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = {
	authMiddleware,
	adminOnly,
	signToken,
};