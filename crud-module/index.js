const mysql=require('mysql');

class ClassCrud{

    constructor()
    {
        this.sql=mysql.createPool({
            user: "b095c0a0ca541e",
            password: "c6d6518f",
            host: "us-cdbr-east-06.cleardb.net",
            database: "heroku_83f5aa3759b0b7c"
         });
    }

    GetUser(req,res)
    {
        if(!req.params.id){
            this.sql.getConnection(function(err,connection){
                connection.query("select * from user order by id asc",function(err,results,fields){
                    res.render('select',{data:results});
                });
            });
        }else{
            this.sql.getConnection(function(err,connection){
                sql.query("select * from user where id=? order by id asc",[req.params.id],function(err,results,fields){
                    res.render('select',{data:results});
                });
            });
        }
    }

    CreateUser(req,res)
    {
        this.sql.getConnection(function(err,connection){
            connection.query("insert into user values (?,?,?)",[req.body.id,req.body.name,req.body.age]);
            res.render('controllerForm',{name:req.body.name});
        });
    }

    DeleteUser(req,res)
    {
        this.sql.getConnection(function(err,connection){
            connection.query("delete from user where id=?",[req.params.id]);
            res.render('delete');
        });
    }

    Update(req,res,controller=null)
    {
        if(controller==null){
            this.sql.getConnection(function(err,connection){
                connection.query("select * from user where id=?",[req.params.id],function(err,results,fields){
                    res.render('update',{id:req.params.id,name:results[0].name,age:results[0].age});
                });
            });
        }else{
            this.sql.getConnection(function(err,connection){
                connection.query("update user set name=?,age=? where id=?",[req.body.name,req.body.age,req.body.id]);
                res.render('controllerUpdate');
            });
        }
    }
}
module.exports=ClassCrud;