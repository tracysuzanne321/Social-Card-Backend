const { Router } = require('express');
const {
	addUser,
	logIn,
	updateEmail,
	deleteUser,
	deleteCard,
	updateCard,
	getCard,
} = require('./user.controls');
const {
	hashPassword,
	comparePasswords,
	tokenAuth,
} = require('../middleware/index');
const userRouter = Router();

userRouter.post('/user', hashPassword, addUser);
userRouter.post('/login', comparePasswords, logIn);
userRouter.get('/token', tokenAuth, logIn);
userRouter.put('/update', updateEmail);
userRouter.delete('/delete', tokenAuth, deleteUser);

userRouter.post('/getCard', getCard);
userRouter.put('/updateCard', updateCard);
userRouter.post('/deleteCard', deleteCard);

module.exports = userRouter;
