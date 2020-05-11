const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//create connection to jobsDB
mongoose.connect(`mongodb+srv://${process.env.ATLASUSER}:${process.env.ATLASPASSWORD}@merncluster-mmtj5.mongodb.net/test?retryWrites=true&w=majority`,{//"@cluster0-r6ge3.mongodb.net/jobsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});