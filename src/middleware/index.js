const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../user/user.model');

exports.hashPassword = async (req, res, next) => {
	console.log(req.body.password);
	const pass = req.body.password;
	if (pass === '') {
		next();
	}
	const hashedPass = await bcrypt.hash(pass, 8);
	req.body.password = hashedPass;
	next();
};

exports.comparePasswords = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user === null) {
			throw new Error('User does not exist');
		}
		const comparisonBool = await bcrypt.compare(
			req.body.password,
			user.password,
		);
		if (comparisonBool) {
			req.user = user;
			next();
		} else {
			throw new Error('Invalid username or password');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
};

exports.tokenAuth = async (req, res, next) => {
	try {
		const token = req.header('Authorization');
		const noBearerToken = token.replace('Bearer ', '');
		const tokenObj = jwt.verify(noBearerToken, process.env.SECRET);
		const user = await User.findOne({ _id: tokenObj._id });
		console.log(user);
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Check server logs' });
	}
};
