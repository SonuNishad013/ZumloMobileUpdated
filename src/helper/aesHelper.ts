import Aes from "react-native-aes-crypto";

const generateKey = (
  password: string,
  salt: string,
  cost: number,
  length: number
) => Aes.pbkdf2(password, salt, cost, length, "sha256");

const encryptData = async (text: string, key: string) => {
  const iv = await Aes.randomKey(16);
  const cipher = await Aes.encrypt(text, key, iv, "aes-256-cbc");
  return {
    cipher,
    iv,
  };
};

const decryptData = (encryptedData: any, key: string) =>
  Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, "aes-256-cbc");

export const getDecryptedData = (cipher: any, iv: string, key: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      var text = await decryptData({ cipher, iv }, key);
      console.log(text);
      resolve(text);
    } catch (e) {
      reject(e);
    }
  });
};

export const sendDataForEncryption = () => {
  try {
    generateKey("Arnold", "salt", 5000, 256).then((key) => {
      encryptData("These violent delights have violent ends", key)
        .then(({ cipher, iv }) => {
          console.log("cipher sendDataForEncryption :", cipher);
          console.log("iv sendDataForEncryption :", iv);
          console.log("Key sendDataForEncryption :", key);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } catch (e) {
    console.error(e);
  }
};
