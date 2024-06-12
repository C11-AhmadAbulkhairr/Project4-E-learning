const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// connecting to mongodb
mongoose.connect(process.env.DB_URI).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);

// roles.insertMany([{role:"Admin"},{role:"Student"},{role:"Teacher"}]).then((result)=>{console.log(result);})