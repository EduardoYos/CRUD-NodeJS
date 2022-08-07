//Constants
const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const handlebars=require('express-handlebars');
const { engine } = require ('express-handlebars');
const app=express();
const urlencodeParser=bodyParser.urlencoded({extended:false});

//Database
// const sql=mysql.createConnection({
//    host:'localhost',
//    user:'root',
//    password:'',
//    port:3306
// });

// sql.query("use crud_nodejs");

const sql=mysql.createPool({
   user: "b095c0a0ca541e",
   password: "c6d6518f",
   host: "us-cdbr-east-06.cleardb.net",
   database: "heroku_83f5aa3759b0b7c"
});
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
    /*res.send("Essa é minha página inicial!");*/
     /*res.sendFile(__dirname+"/index.html");*/
     /*console.log(req.params.id);*/
     res.render('index');
 });

 app.get("/insert",function(req,res){
    res.render("insert");
});
 app.get("/select/:id?",function(req,res){
     if(!req.params.id){
         sql.getConnection(function(err,connection){
             connection.query("select * from user order by id asc",function(err,results,fields){
                 res.render('select',{data:results});
             });
         });
     }else{
         sql.getConnection(function(err,connection){
             connection.query("select * from user where id=? order by id asc",[req.params.id],function(err,results,fields){
                 res.render('select',{data:results});
             });
         });
     }
 });
 app.post("/controllerForm",urlencodeParser,function(req,res){
     sql.getConnection(function(err,connection){
         connection.query("insert into user values (?,?,?)",[req.body.id,req.body.name,req.body.age]);
         res.render('controllerForm',{name:req.body.name});
     });
 });
 app.get('/delete/:id',function(req,res){
     sql.getConnection(function(err,connection){
         connection.query("delete from user where id=?",[req.params.id]);
         res.render('delete');
     });
 });
 app.get("/update/:id",function(req,res){
     sql.getConnection(function(err,connection){
             connection.query("select * from user where id=?",[req.params.id],function(err,results,fields){
             res.render('update',{id:req.params.id,name:results[0].name,age:results[0].age});
         });
     });
 });
 app.post("/controllerUpdate",urlencodeParser,function(req,res){
     sql.getConnection(function(err,connection){
         connection.query("update user set name=?,age=? where id=?",[req.body.name,req.body.age,req.body.id]);
         res.render('controllerUpdate');
     });
 });

//ROUTES
// app.get("/",function(req,res){
//    res.send('oi');
// });

// app.get("/",function(req,res){
//     res.render('index');
//  });
// app.get("/insert",function(req,res){
//    res.render('insert');
// });

// app.get("/select/:id?",function(req,res){
//    if(!req.params.id){
//         sql.getConnection(function(err, connection){
//             connection.query("select * from user order by id asc",function(err,results,fields){
//                 res.render('select',{data:results});
//              });
//         })
       
//    }else{
//         sql.getConnection(function(err, connection){
//             connection.query("select * from user where id=? order by id asc",[req.params.id],function(err,results,fields){
//                 res.render('select',{data:results});
//             });
//         })
//    }
// });

// app.get('/delete/:id',function(req,res){
//    sql.query("delete from user where id=?",[req.params.id]);
//    res.render('delete');
// });

// app.get("/update/:id",function(req,res){
//    sql.query("select * from user where id=?",[req.params.id],function(err,results,fields){
//        res.render('update',{id:req.params.id,name:results[0].name,age:results[0].age});
//    });
// });

// app.post("/controllerUpdate",urlencodeParser,function(req,res){
//   sql.query("update user set name=?,age=? where id=?",[req.body.name,req.body.age,req.body.id]);
//   res.render('controllerUpdate');
// });

// app.post("/controllerForm",urlencodeParser,function(req,res){
//    sql.query("insert into user values (?,?,?)",[req.body.id,req.body.name,req.body.age]);
//    res.render('controllerForm',{name:req.body.name});
// });

// app.get("/",function(req,res){
//    res.render('index');
// });
// app.get("/",function(req,res){
//    res.render('index');
// });

// app.get("/javascript",function(req,res){
//    res.sendFile(__dirname+'/js/javascript.js');
// });
// app.get("/style",function(req,res){
//     res.sendFile(__dirname+'/css/style.css');
// });



//Start server
app.listen(port,function(req,res){
   console.log('Servidor está rodando!');
});