const mongoose = require('mongoose')
const dburl = "mongodb://localhost:27017/MediaApp" 

mongoose.connect(dburl , { useNewUrlParser: true, useUnifiedTopology: true }, (err,client)=>{
    if(err){
        console.log("Error in connecting to database" , err)
    }
    else{
        console.log("Connected to Database...")
    }
})


