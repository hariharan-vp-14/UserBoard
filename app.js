const express = require("express");
const path = require("path");
const userModel = require('./models/user')


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // optional but good to be explicit

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read",{users});
});



app.get("/edit/:userid", async (req, res) => {
  const user = await userModel.findById(req.params.userid);
  if (!user) return res.redirect("/read"); // fallback if user not found
  res.render("edit", { user }); // pass as 'user' to match your EJS
});






app.post("/update/:userid", async (req, res) => {
  const { image, name, email } = req.body;

  // Update user in DB
  await userModel.findByIdAndUpdate(
    req.params.userid,
    { image, name, email },
    { new: true }
  );

  // Redirect to /read after update
  res.redirect("/read");
});






app.post("/create", async (req, res) => {
  let {name,email,image} = req.body;

  let createdUser =  await userModel.create({
    name,
    email,
    image

  })
  res.redirect("/read")

});

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  let users = await userModel.find();
  res.render("read", { users });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
