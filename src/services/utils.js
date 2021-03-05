import CryptoJS from "crypto-js";

export function getDBPath() {
    // function to get path for database node
    // this makes sure student participation is registered on the right day
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return [year, month, date].join("-");
}


export function decryptObject(encryptedStudentData) {
    // decrypts object from QR code
    const bytes = CryptoJS.AES.decrypt(encryptedStudentData, process.env.REACT_APP_SECRET_PASSWORD);
    const decryptedStudentData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedStudentData;
}