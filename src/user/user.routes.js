const { Router } = require('express');
const {
	addUser,
	logIn,
	updateUser,
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
userRouter.put('/update', tokenAuth, hashPassword, updateUser);
userRouter.delete('/delete', tokenAuth, deleteUser);

userRouter.post('/getCard', getCard);
userRouter.put('/updateCard', tokenAuth, updateCard);
userRouter.post('/deleteCard', tokenAuth, deleteCard);

module.exports = userRouter;
