var express = require('express');
var app = express();

app.get('/', function(req, res,next){
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});
app.get('/first_template', function(req, res){
  res.render('first_view.pug');
});
app.get('/user', function (req,res)
{
  res.render('user_auth.pug',{
    user: {name: "Ayush", age: "20"}
 });
})
app.get('/sh', function(req, res){
  res.json({message : " hello from server!"});
});
app.get('/sh/:id', function(req, res){
  const id =req.params.id;
  if (id==20)
  res.send(" sheri!" + id) ;
  else if (id==21)
  res.send("ahmed"+id)

});
app.get('/sheri/:id([0-9]{5})', function(req, res){
  res.send('id: ' + req.params.id);
});
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});
app.listen(3001,function(req,res)
{
  console.log('server is running');
});
