const mongoose = require('mongoose')
var schema=new mongoose.Schema({
    name:{
        type:String
    },
    address:{
        type:String
    },
contact:{
    type:String
},
});


var schema=new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
});
var schema=new mongoose.Schema({
    email:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },


});
mongoose.model('Sheri',schema);
mongoose.model('Login',schema);
mongoose.model('Signup',schema);
