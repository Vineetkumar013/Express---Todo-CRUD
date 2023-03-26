const express = require("express");
const http = require("http");
const app = express();
const fs = require("fs");
app.use(express.json());

//get check data function
app.get("/", (req, res) => {
  res.end("hey i am ready to get the data");
});

//get the data
app.get("/getdata", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  const parsedata = JSON.parse(data);
  res.end(JSON.stringify(parsedata.students));
});

//post the data
app.post("/postdata", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  const parsedata = JSON.parse(data);
  parsedata.students.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(parsedata));
  res.end("Data posted");
});

//put the data
app.put("/putdata", (req, res) => {
  const data = fs.writeFileSync("./db.json", JSON.stringify(req.body));
  const parsedata = JSON.stringify(data);
  res.end("update the data");
});

//delete the data
app.delete("/delete/:id", (req, res) => {
  const { Id } = req.params;
  fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
    const deleted = JSON.parse(data);
    deleted.students = deleted.students.filter((item) => item.id != Id);
    fs.writeFile(
      "./db.json",
      JSON.stringify(deleted),
      { encoding: "utf-8" },
      () => {
        res.send("deleted");
      }
    );
  });
});

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`server start ${port}`);
});
