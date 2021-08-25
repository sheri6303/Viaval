const mongoose = require('mongoose');
const Sheri = mongoose.model('Sheri');
const Login = mongoose.model("Login");
const Signup=mongoose.model("Signup");
const bcrypt= require("bcrypt");
const jwt=require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const API_KEY ='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';
const secret= "sheraz786";
sgMail.setApiKey(API_KEY);

function insertRecord(req, res)
{
    var sheri = new Sheri();
    sheri.name = req.body.aname;
    sheri.address = req.body.address;
    sheri.contact = req.body.contact;

    sheri.save((err, doc)=>{
        if(!err){
            console.log("success");
        }else{
            console.log("error during record insersion: "+err);
        }
    });
}
 function signup(req,res)
{
    var signup = new Signup();
    signup.username = req.body.username;
    signup.email=req.body.email;
    signup.password=bcrypt.hashSync(req.body.password, 10,function(err,hash){
    });
    Signup.find({username:signup.username},function(err,result){
        if (result==0)
        {
        const token = jwt.sign({ email:signup.email,username:signup.username, password:signup.password}, secret , {expiresIn: '1h'});
        const msg = {
            to: signup.email,
            from: 'sheraz.a@vaivaltech.com',
            subject: 'Verify your email',
            html: `<h2>Hello ${signup.username} Please click on given link to activate your account</h2>
            <a href="http://localhost:3002/activate/${token}">http://localhost:3000/activate/${token}</a>`   
        };
            sgMail.send(msg)
            {
             if (msg)
             console.log('Email sent');
             else
             console.error(error);
            }
        }
        else
        console.log("user name already exists");
    });
    }
function login(req,res)
{
    var login;
    login=req.body.username;
    Signup.find({username:login},function(err,result){
        if (result.length>0)
        {

            bcrypt.compare(req.body.password,result[0].password,function(err,hash){
            if (hash)
            {
            const token = jwt.sign({
                username: result[0].username,
                password: result[0].password
            },
            'text',
            {expiresIn:"1h"});
                console.log("login success");
                console.log(token);
        }
            else
                console.log("password does not match");
            });
        
        }
        else 
        console.log("user not find");
    });
}
function reset(req,res)
{
    var signup=new Signup();
    signup.email=req.body.email;
    Signup.find({email:signup.email},function(err,result){
        if (result.length>0)
        {   
            const tokenn = jwt.sign({ email:signup.email}, secret , {expiresIn: '1h'});
            const msg = {
                to: signup.email,
                from: 'sheraz.a@vaivaltech.com',
                subject: 'Verify your email',
                html: `<h2>Hello Please click on given link to Reset your password</h2>
                <a href="http://localhost:3002/reset/${tokenn}">http://localhost:3000/reset/${tokenn}</a>`   
            };
                sgMail.send(msg)
                {
                 if (msg)
                 console.log('Email sent');
                 else
                 console.error(error);
                }
            }

            
        else 
        console.log("Email not find");
    });
}
function activate(req,res)
{
    const token = req.params.token;
    console.log(token);
    if(token){
        jwt.verify(token, secret, (err, decodedToken)=>{
            if(err){
                res.json({message:"Incorrect or Expire Link"});
            }

            const {username, email, password} = decodedToken;
            console.log(`${username} ${email} ${password}`)
            Signup.find({username:username}, (err,result)=>{
            if(result!=0){
                res.json("you already activated your account");
            }
            else{
                res.json("Signup successfull");
                bcrypt.hash(password, 10, (err, hash)=>{ 
                    if(err){
                        res.json("error in password: "+err);
                    }
                    else{
                        const user = new Signup({
                            username: username,
                            password: hash,
                            email: email
                        })
                        user.save()
                        .then(result=>{
                            res.json(result);
                        })
                        .catch(err=>{
                            res.json(err);
                        });
                    }
                });
            }
            });
                })
            }else{
                res.json({message: "Link invalid"});
            }
};
function resetter(req,res)
 {
     console.log(req.body.password);
     console.log(req.body.newpassword);

    const tokenn=req.params.tokenn;
    console.log(tokenn);
    if (tokenn)
    {
        jwt.verify(tokenn, secret, (err, decodedToken)=>
        {
            if(err)
            {
                res.json({message:"Incorrect or Expire Link"});
            }

            const { email} = decodedToken;
            console.log(` ${email} `);
            Signup.find({email:email},function(err,result)
            {
            if (result.length>0)
                {   
                    console.log(result);
            {
                    var passworddd=bcrypt.hashSync(req.body.newpassword, 10,function(err,hash){});
                    console.log("password matched");
                    if (req.body.newpassword ==req.body.newpasswordd)
                    {
                Signup.updateOne({email :email},{$set:{password:passworddd}},function (err,result)
                {
                    if (result)
                        console.log("password updated");
                    else
                    console.log("password not updated")
                });
            }
                else
                {
                    console.log("confirm password does not match with new password");
                }

            }
            

            
           }
        });
    });
}
 };
module.exports = {insertRecord,signup,login,reset,resetter,activate}