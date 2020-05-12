const mongoose = require("mongoose");

//create connection to jobsDB
mongoose.connect(
  "mongodb+srv://student:abcd1234@merncluster-mmtj5.mongodb.net/test?retryWrites=true&w=majority",
  {
    //"@cluster0-r6ge3.mongodb.net/jobsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
