const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//create connection to jobsDB
// mongod --dbpath /home/rohan/data --port 27020
// path = 'mongodb://127.0.0.1:27020/tnp-web-portal-passport'
// mongoose.connect('mongodb://127.0.0.1:27018/tnp-web-portal-passport',{//"@cluster0-r6ge3.mongodb.net/jobsDB", {
mongoose.connect('mongodb+srv://student:abcd1234@merncluster-mmtj5.mongodb.net/test?retryWrites=true&w=majority', {//"@cluster0-r6ge3.mongodb.net/jobsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
