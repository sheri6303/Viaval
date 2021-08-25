var express = require('express');
const services=require('../services/service');
const { model } = require('mongoose');
var router=express.Router();

router.get('/', function(req, res)
{
    res.render('form')
});

router.post('/', function(req, res)
{
    
    services.insertRecord(req,res);
});
router.get('/home', function(req, res)
{
    
    res.sendFile(__dirname + '/static/index.html');
});

router.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/static/signup.html');
  });
  router.post('/signup', (req, res) => {
    services.signup(req,res);
  });

  router.get('/reset/:tokenn',function(req,res){
    res.sendFile(__dirname + '/static/resetPassword.html');
    
  });
  router.post('/reset/:tokenn',(req,res)=>{
    services.resetter(req,res);
});









router.get('/resett',function(req,res){
  res.sendFile(__dirname + '/static/resett.html');
});
router.post('/resett',(req,res)=>{
  services.reset(req,res);
});
  router.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/static/login.html');

});
router.post('/login',(req,res)=>{
    services.login(req,res);
});
router.get('/activate/:token',function(req,res){
  services.activate(req,res);
});
  module.exports=router;
