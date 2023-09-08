import User from "../models/User";

export const auth = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });

  let user;

  try {
    user = await newUser.save();

    console.log(user);
  } catch (err) {
    console.log(err);
  }

  return res.status(200).json(user);
};
