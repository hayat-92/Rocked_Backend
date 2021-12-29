const express = require('express');
const app = express();
app.use(express.json())
const routes=require("./routes/v1/");
const url="mongodb://127.0.0.1:27017/cropdb";
const mongoose = require("mongoose");
const passport = require("passport");
const { jwtStrategy } = require("./middleware/passport");

app.use("/v1", routes);

app.use(passport.initialize())
passport.use(jwtStrategy);

const port = 8081;

mongoose.connect(url).then(() => {

    console.log("Connected to MongoDB");
  
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  });

