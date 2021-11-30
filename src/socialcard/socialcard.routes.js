const { Router } = require("express");
const { addCard, updateCard } = require("./socialcard.controls");
const userRouter = Router();

userRouter.post("/addCard", addCard);
userRouter.put("/update", updateCard);

module.exports = userRouter;
