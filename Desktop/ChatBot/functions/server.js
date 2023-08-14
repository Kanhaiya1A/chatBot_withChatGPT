// // const express = require("express");
// // const path = require("path");
// // const axios = require("axios");
// // const serverless = require("serverless-http");

// // const app = express();
// // app.use(express.json());
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'ejs');




// // app.post("/.netlify/functions/server/", async (req, res) => {
// //   const OPENAI_API_KEY = "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";

// //   try {
// //     const responseData = await axios.post(
// //       "https://api.openai.com/v1/engines/davinci-codex/completions",
// //       {
// //         prompt: 'Translate the following English text to French: "{text}"',
// //         max_tokens: 60,
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${OPENAI_API_KEY}`,
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     return responseData.status(200).json({
// //       status: 1,
// //       message: "success",
// //     });
// //   } catch (error) {
// //     res.status(500).send(`Error ${error.message}`);
// //   }
// // });

   

// // const PORT = 5000;
// // app.listen(PORT, (err) => {
// //   if (err) console.log("error", err);
// //   console.log(`Server is running on port ${PORT}`);
// // });

// // exports.handler = serverless(app);


// const express = require("express");
// const multer = require("multer");
// const axios = require("axios");
// const csv = require("csv-parser");
// const pdf = require("pdf-parse");
// cons

// const app = express();
// const port = 3000;

// const OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci/completions";
// const OPENAI_API_KEY = "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";

// app.use(express.static("public"));

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.get("/", (req, res) => {

// });

// app.post("/upload", upload.single("file"), async (req, res) => {
//   const prompt = req.body.prompt;
//   let data = "";

//   if (req.file.mimetype === "text/csv") {
//     const results = [];
//     await new Promise((resolve, reject) => {
//       req.file.stream
//         .pipe(csv())
//         .on("data", (row) => results.push(row))
//         .on("end", () => {
//           data = JSON.stringify(results);
//           resolve();
//         });
//     });
//   } else if (req.file.mimetype === "application/pdf") {
//     data = await pdf(req.file.buffer);
//   } else {
//     return res.status(400).send("Invalid file type");
//   }

//   try {
//     const response = await axios.post(
//       OPENAI_API_URL,
//       {
//         prompt: `${prompt}\n\nData:\n${data}`,
//         max_tokens: 100,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.send(response.data.choices[0].text.trim());
//   } catch (error) {
//     res.status(500).send("Error processing data.");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`);
// });