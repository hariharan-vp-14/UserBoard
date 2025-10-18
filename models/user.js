// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/testapp1");


// const uerSchema = mongoose.Schema({
//     image:String,
//     email:String,
//     name:String
// })

// module.exports = mongoose.model('user',userSchema);

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Define the schema FIRST
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

// Then create the model from the schema
const userModel = mongoose.model("User", userSchema);

// Export the model so app.js can use it
module.exports = userModel;
