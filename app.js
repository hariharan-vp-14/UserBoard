const express = require("express");
const path = require("path");
const userModel = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("read", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/edit/:userid", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userid);
    if (!user) return res.redirect("/read");
    res.render("edit", { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/update/:userid", async (req, res) => {
  try {
    const { image, name, email } = req.body;
    await userModel.findByIdAndUpdate(req.params.userid, { image, name, email });
    res.redirect("/read");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/create", async (req, res) => {
  try {
    const { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect("/read");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/read");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});

