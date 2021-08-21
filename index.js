const express = require("express");
const app = express();
const port = 3001;
const Photo = require("./models/Photo");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/map_project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!!");
    console.log(err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/images", async (req, res) => {
  const { url } = req.body;
  const photo = new Photo({ url });
  const photoId = await photo.save().then((doc) => doc.id);
  res.send({ id: photoId });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
