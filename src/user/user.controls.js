const User = require('./user.model');

exports.addUser = async (req, res) => {
	try {
		const newUser = new User(req.body);
		const token = await newUser.generateAuthToken();
		await newUser.save();
		res.status(200).send({ message: 'Success!', newUser, token });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send({ message: 'Something went wrong, check server logs' });
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
		console.log(req.body);
		const result = await User.updateOne(
			{ _id: req.body.userId },
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
				},
			},
		);
		console.log(result);
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
			message: 'Something went wrong, check server logs',
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
