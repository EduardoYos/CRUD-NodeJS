//Constants
const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const handlebars=require('express-handlebars');
const { engine } = require ('express-handlebars');
const app=express();
const urlencodeParser=bodyParser.urlencoded({extended:false});

//Database
const sql=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   port:3306
});

sql.query("use crud_nodejs");


app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));
// app.engine('handlebars', engine());

//ENGINE
app.engine("handlebars",engine({defaultLayout:'main'}));
app.set('view engine','handlebars');



//ROUTES
// app.get("/:id?",function(req,res){
//    res.render('index',{id:req.params.id});
// });

app.get("/",function(req,res){
   res.render('index');
});
app.get("/insert",function(req,res){
   res.render('insert');
});

app.get("/select/:id?",function(req,res){
   if(!req.params.id){
       sql.query("select * from user order by id asc",function(err,results,fields){
          res.render('select',{data:results});
       });
   }else{
       sql.query("select * from user where id=? order by id asc",[req.params.id],function(err,results,fields){
           res.render('select',{data:results});
       });
   }
});

app.get('/delete/:id',function(req,res){
   sql.query("delete from user where id=?",[req.params.id]);
   res.render('delete');
});

app.get("/update/:id",function(req,res){
   sql.query("select * from user where id=?",[req.params.id],function(err,results,fields){
       res.render('update',{id:req.params.id,name:results[0].name,age:results[0].age});
   });
});

app.post("/controllerUpdate",urlencodeParser,function(req,res){
  sql.query("update user set name=?,age=? where id=?",[req.body.name,req.body.age,req.body.id]);
  res.render('controllerUpdate');
});

app.post("/controllerForm",urlencodeParser,function(req,res){
   sql.query("insert into user values (?,?,?)",[req.body.id,req.body.name,req.body.age]);
   res.render('controllerForm',{name:req.body.name});
});

app.get("/",function(req,res){
   res.render('index');
});
app.get("/",function(req,res){
   res.render('index');
});

app.get("/javascript",function(req,res){
   res.sendFile(__dirname+'/js/javascript.js');
});
app.get("/style",function(req,res){
    res.sendFile(__dirname+'/css/style.css');
});



//Start server
app.listen(3000,function(req,res){
   console.log('Servidor est?? rodando!');
});