import User from "../models/User";
import CryptoJS from "crypto-js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  let updatedUser;
  if (password) {
    password = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
  }
  try {
    updatedUser = await User.findByIdAndUpdate(id, {
      email,
      username,
      password,
    });
  } catch {
    console.log(err);
  }
  return res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json("user has been deleted");
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Get varius user Statuses

export const userStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//
//ate.setFullYear(date.getFullYear() - 1): This part of the code subtracts 1 from the year of the date object using the setFullYear method. It effectively changes the year of the date object to be one year earlier than it was before.

//The Advanced Encryption Standard (AES) is a U.S. Federal Information Processing Standard (FIPS). It was selected after a 5-year process where 15 competing designs were evaluated.
// var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
// ​
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
// CryptoJS supports AES-128, AES-192, and AES-256. It will pick the variant by the size of the key you pass in. If you use a passphrase, then it will generate a 256-bit key.
//
/////
// CryptoJS.AES.encrypt("Message", "Secret Passphrase");
