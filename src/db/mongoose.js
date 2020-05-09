const mongoose = require('mongoose')

//create connection to jobsDB
mongoose.connect('mongodb://127.0.0.1:27018/tnp-web-portal-passport',{//"@cluster0-r6ge3.mongodb.net/jobsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});