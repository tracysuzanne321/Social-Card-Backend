const { Router } = require("express");
const { addUser, logIn, updateEmail, deleteUser } = require("./user.controls");
const {
  hashPassword,
  comparePasswords,
  tokenAuth,
} = require("../middleware/index");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.post("/login", comparePasswords, logIn);
userRouter.get("/token", tokenAuth, logIn);
userRouter.put("/update", updateEmail);
userRouter.delete("/delete", tokenAuth, deleteUser);

module.exports = userRouter;
