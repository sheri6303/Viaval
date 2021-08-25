require('./models/db');
var express = require('express');
var app = express();

const controller=require('./controllers/controller');
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/',controller)

app.set('view engine', 'pug');
app.set('views','./views');
const port=process.env.PORT || 3002
  app.listen(port,function(req,res)
{
  
  console.log('server is running');
});
  