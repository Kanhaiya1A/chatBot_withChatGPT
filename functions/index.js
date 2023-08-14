const express = require("express");
const multer = require("multer");
const axios = require("axios");
const csv = require("csv-parser");
const pdf = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const serverless = require("serverless-http");


const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const OPENAI_API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";
const OPENAI_API_KEY = "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";

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
// const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/index.ejs");
 return res.render("index", {
   title: "Codeial | Home",
 });
});

app.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    //   console.log("*****", req.file);

    let prompt = req.body.prompt;
    let data = "";
    let isTrue = 0;
    if (req.file) isTrue = true;
    //   console.log("fileStream", fileStream);

    if (req.file && req.file.mimetype === "text/csv") {
      const fileStream = fs.createReadStream(req.file.path);
      const results = [];

      await new Promise((resolve, reject) => {
        fileStream
          .pipe(csv())
          .on("data", (row) => results.push(row))
          .on("end", () => {
            data = JSON.stringify(results);
            resolve();
          });
      });
    } else if (req.file && req.file.mimetype === "application/pdf") {
      data = await pdf(req.file.buffer);
    } else if (req.file) {
      return res.status(400).send("Invalid file type");
    }

    try {
      if (isTrue) {
        prompt = `${prompt}\n\nData:\n${data}`;
        //   console.log("hello", `${prompt}\n\nData:\n${data}`);

        //   console.log(prompt);
      }
      const response = await axios.post(
        OPENAI_API_URL,
        {
          prompt: `${prompt}`,
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      let results = response.data.choices[0].text.trim();
      return res.render("result", {
        title: "Codeial | upload",
        results: results
      });


    //   res.send(response.data.choices[0].text.trim());
    } catch (error) {
      res.status(500).send("Error processing data.");
    }
  }
);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

exports.handler = serverless(app);

