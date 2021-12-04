const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const socialLinkSchema = new mongoose.Schema({
	socialNetwork: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
});

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	jobTitle: {
		type: String,
		required: false,
	},
	profileImageUrl: {
		type: String,
		required: false,
	},
	bio: {
		type: String,
		required: false,
	},
	fullName: {
		type: String,
		required: false,
	},
	socialLinks: [socialLinkSchema],
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this._id }, process.env.SECRET);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
