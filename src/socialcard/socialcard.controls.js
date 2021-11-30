const Card = require("./socialcard.model");

exports.addCard = async (req, res) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.status(200).send({ message: "SocialCard Created" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong, check server logs" });
  }
};

exports.updateCard = async (req, res) => {
  try {
    await Card.findOneAndUpdate(
      { username: req.body.username },
      { $set: { cardprofile: req.body.cardprofile } }
    );
    res.status(200).send({ message: "Specified SocialCard Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server logs" });
  }
};
