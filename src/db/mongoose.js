const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//create connection to jobsDB
// mongod --dbpath /home/rohan/data --port 27018
mongoose.connect('mongodb://127.0.0.1:27018/tnp-web-portal-passport' ,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
