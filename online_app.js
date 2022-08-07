//Constants
const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const handlebars=require('express-handlebars');
const { engine } = require ('express-handlebars');
const app=express();
const urlencodeParser=bodyParser.urlencoded({extended:false});
const crud=require('./crud-module');

let crudObj = new crud();

//Database
let port=process.env.PORT || 3000;

app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));
// app.engine('handlebars', engine());

//ENGINE
app.engine("handlebars",engine({defaultLayout:'main'}));
app.set('view engine','handlebars');


//Routes and Templates
app.get("/",function(req,res){
     res.render('index');
 });

 app.get("/insert",function(req,res){
    res.render("insert");
});
 app.get("/select/:id?",function(req,res){
    crudObj.GetUser(req, res);
 });

 app.post("/controllerForm",urlencodeParser,function(req,res){
     crudObj.CreateUser(req, res);
 });

 app.get('/delete/:id',function(req,res){
     crudObj.DeleteUser(req, res);
 });
 app.get("/update/:id",function(req,res){
     crudObj.Update(req, res);
 });

 app.post("/controllerUpdate",urlencodeParser,function(req,res){
    crudObj.Update(req, res, 'controller');
 });



//Start server
app.listen(port,function(req,res){
   console.log('Servidor está rodando!');
});