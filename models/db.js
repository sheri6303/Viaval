require('./schema.js');
const mongoose = require('mongoose')
const url = `mongodb://localhost:27017/Sheraz`;
mongoose.connect(url,{useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true },(err)=>{
        if (!err)
        console.log("database connected")
        else
        console.log("database not connected")
    })

    