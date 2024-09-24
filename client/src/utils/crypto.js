import CryptoJS from "crypto-js";

const secretKey = "your-de";

//!encrypt
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};
// !decrypt
export const decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
