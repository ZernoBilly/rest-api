import password from "../../models/password";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-+=";

const createPassword = (
  length: number = 8,
  hasNumbers: boolean = true,
  hasSymbols: boolean = true
) => {
  let chars = alphabet;
  let password = "";
  hasNumbers && (chars += numbers);
  hasSymbols && (chars += symbols);

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export default createPassword;
