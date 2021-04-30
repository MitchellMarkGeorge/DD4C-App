const fs = require("fs");
const os = require("os");
const path = require("path");
const csv = require("csv-parser");
const QR = require("qrcode");
require("dotenv").config();
const archiver = require("archiver");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
let TAGS = {};
const BASE_PATH = path.join(os.homedir(), "DD4C QR Codes");

if (!fs.existsSync(BASE_PATH)) {
  fs.mkdirSync(BASE_PATH);
}

// console.log(uuidv4())

//make this dynamic so most csv files work (for future years)
fs.createReadStream("students2021.csv")
  .pipe(csv())
  .on("data", (row) => {
    let {
      "First name": first_name,
      "Last name": last_name,
      Grade: grade,
      Advisor: advisor,
      House: house,
    } = row;

    advisor = advisor.replace("/", " & ");
    const student = {
      first_name,
      last_name,
      grade,
      advisor,
      house,
      id: uuidv4(),
    };

    if (!TAGS[advisor]) {
      TAGS[advisor] = [];
    }
    TAGS[advisor].push(student);
  })
  .on("end", () => {
    // console.log(TAGS);
    console.log("Writing QR Codes");
    for (const tagAdvisor in TAGS) {
      const tagFolderPath = path.join(BASE_PATH, tagAdvisor);

      if (!fs.existsSync(tagFolderPath)) {
        fs.mkdirSync(tagFolderPath);
      }

      TAGS[tagAdvisor].forEach((student) => {
        // Encrypt
        const encryptedStudentObj = CryptoJS.AES.encrypt(
          JSON.stringify(student),
          process.env.REACT_APP_SECRET_PASSWORD
        ).toString();

        const studentPath = path.join(
          tagFolderPath,
          `${student.first_name} ${student.last_name}.png`
        );
        QR.toFile(studentPath, encryptedStudentObj, { type: "png" }, (err) => {
          if (err) throw err; // use ashbury colors
        });
      });

      // zip folder
      const output = fs.createWriteStream(
        path.join(BASE_PATH, `${tagAdvisor}.zip`)
      );
      const archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
      });

      archive.on("error", function (err) {
        throw err;
      });

      archive.pipe(output);

      archive.directory(tagFolderPath, false);

      archive.finalize();
    }
    console.log("Done"); //MAKE SURE EVERYTHING IS 100% BEFORE SENDING OUT
  });
