const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const {engine} =require('express-handlebars');
const app=express();
const urlencodeParse=bodyParser.urlencoded({extended:false});
const sql = mysql.createConnection({
    host: 'localhost',
    user:'root', 
    password:'',
    port:3306
})
sql.query('use nodejs');//usar o banco de dados criado


//Template engine
app.engine("handlebars" , engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));

app.get('/inserir', function(req,res){
    res.render('inserir');
})

app.get('/select/:id?', function(req,res){
    if(!req.params.id){
        sql.query("select * from user", function(err, results, fields){
            res.render('select', {data:results});
        })
    }else{
        sql.query("select * from user where id =?",[req.params.id], function(err, results, fields){
            res.render('select', {data:results});
        })
    }
})

app.get('/deletar/:id', function(req,res){
    sql.query("delete from user where id=?",[req.params.id]);
    res.render('deletar');
})

app.get('/update/:id', function(req,res){
    sql.query('select * from user where id=?', [req.params.id], function(err,results,fields){
        res.render('update', {id:req.params.id, nome:results[0].nome, idade:results[0].idade});
    });
})
app.post("/controllerUpdate", urlencodeParse, function(req, res){
    sql.query("update user set nome=?, idade=? where id=?", [req.body.name, req.body.idade, req.body.id]);
    res.render('controllerUpdate');
})

app.post('/controllerForm', urlencodeParse, function(req, res){
    sql.query("insert into user(nome,idade) values (?, ?)", [req.body.name, req.body.idade])
    res.render('controllerForm');
})


//routes and templantes
app.get("/",function(req,res){
    res.render('index');
})


//start server
app.listen(3000, function(req,res){
    console.log('Servidor está rodando');
})