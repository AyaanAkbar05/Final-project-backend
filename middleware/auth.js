const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiration = "24h";

//Token verification
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

//Admin only access
function adminOnly(req, res, next) {
	if (req.user && req.user.role === "admin") {
		next(); 
	} else {
		res.status(403).json({ message: "Access denied. Admins only." });
	}
}

//general function  to create a new token
function signToken({ username, email, _id }) {
	const payload = { username, email, _id };
	return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = {
	authMiddleware,
	adminOnly,
	signToken,
};