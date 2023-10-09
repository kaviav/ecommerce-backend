import User from "../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, email, password, confirmPassword, image } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    image,
  });
  let user;
  try {
    user = await newUser.save();
    console.log(user);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json(user);
};

//////////////

export const login = async (req, res) => {
  const { username, password } = req.body;
  let user;
  try {
    user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json("wrong username!");
    }
    //
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); //charcode; to convert to ourcode character
    const inputPassword = req.body.password;
    inputPassword !== originalPassword &&
      res.status(401).json("wrong password!");
    //

    const accessToken = jwt.sign(
      //total 3 arguments  sign({properties of user}, secret key,{token validity} )
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc; //{username,email,password,isAdmin,_id,createdAt } inside user._doc

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
  }
};
