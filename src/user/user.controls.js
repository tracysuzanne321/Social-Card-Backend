const User = require('./user.model');
const emailRegex =
	/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

exports.addUser = async (req, res) => {
	try {
		if (
			(req.body.username === '') |
			(req.body.email === '') |
			(req.body.password === '')
		) {
			throw new Error('One or more fields were not completed');
		}
		if (emailRegex.test(req.body.email) === false) {
			throw new Error('Invalid email address');
		}
		const newUser = new User(req.body);
		const token = await newUser.generateAuthToken();
		await newUser.save();
		res.status(200).send({ message: 'Success!', newUser, token });
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: error.message,
		});
	}
};

exports.logIn = async (req, res) => {
	try {
		const token = await req.user.generateAuthToken();
		res.status(200).send({ user: req.user, token });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Check server logs' });
	}
};

exports.updateUser = async (req, res) => {
	try {
		if (
			(req.body.username === '') |
			(req.body.email === '') |
			(req.body.password === '')
		) {
			throw new Error('One or more fields were not completed');
		}
		if (emailRegex.test(req.body.email) === false) {
			throw new Error('Invalid email address');
		}
		const result = await User.updateOne(
			{ _id: req.user._id },
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
				},
			},
		);
		res.status(200).send({
			result: {
				username: req.body.username,
				email: req.body.email,
				_id: req.params.id,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: error.message,
		});
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await User.deleteOne(req.user);
		res.status(200).send({ message: 'Current User Deleted from the DataBase' });
	} catch (error) {
		console.log(error);
	}
};

exports.getCard = async (req, res) => {
	const { username } = req.body;
	try {
		const user = await User.findOne({ username: username }).lean();

		if (user === null) {
			res.status(200).send(null);
			return;
		}

		const { email, password, _id, __v, ...cardDetails } = user;
		console.log(user);

		res.status(200).send(cardDetails);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Check server logs' });
	}
};

exports.updateCard = async (req, res) => {
	const { jobTitle, profileImageUrl, bio, fullName, socialLinks } = req.body;
	try {
		await User.findOneAndUpdate(
			{ username: req.body.username },
			{
				$set: {
					jobTitle: jobTitle,
					profileImageUrl: profileImageUrl,
					bio: bio,
					fullName: fullName,
					socialLinks: socialLinks,
				},
			},
		);
		res.status(200).send({ message: 'Specified SocialCard Updated' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Check server logs' });
	}
};

exports.deleteCard = async (req, res) => {
	try {
		await User.findOneAndUpdate(
			{ username: req.body.username },
			{
				$set: {
					jobTitle: undefined,
					profileImageUrl: undefined,
					bio: undefined,
					fullName: undefined,
					socialLinks: undefined,
				},
			},
		);
		res.status(200).send({ message: 'Specified SocialCard Updated' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Check server logs' });
	}
};
