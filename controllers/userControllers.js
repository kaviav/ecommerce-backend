import User from "../models/User";
import CryptoJS from "crypto-js";

export const update = async (req, res) => {
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

/////

//The Advanced Encryption Standard (AES) is a U.S. Federal Information Processing Standard (FIPS). It was selected after a 5-year process where 15 competing designs were evaluated.
// var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
// ​
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
// CryptoJS supports AES-128, AES-192, and AES-256. It will pick the variant by the size of the key you pass in. If you use a passphrase, then it will generate a 256-bit key.
//
/////
// CryptoJS.AES.encrypt("Message", "Secret Passphrase");

//Vishnu Sathyanathan6:12 PM
// Middleware functions are functions that have access to the request object ( req ), the response object ( res ), and the next function in the application's request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware
