const User = require("./user.model");

exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const token = await newUser.generateAuthToken();
    await newUser.save();
    res.status(200).send({ message: "Success!", newUser, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong, check server logs" });
  }
};

exports.logIn = async (req, res) => {
  try {
    const token = await req.user.generateAuthToken();
    res.status(200).send({ user: req.user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server logs" });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { username: req.body.username },
      { $set: { email: req.body.email } }
    );
    res.status(200).send({ message: "Specified User Email Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server logs" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne(req.user);
    res.status(200).send({ message: "Current User Deleted from the DataBase" });
  } catch (error) {
    console.log(error);
  }
};
