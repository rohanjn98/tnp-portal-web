const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//create connection to jobsDB
// mongod --dbpath /home/rohan/data --port 27018
mongoose.connect('mongodb+srv://student:abcd1234@merncluster-mmtj5.mongodb.net/test?retryWrites=true&w=majority' ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
