var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
let messages=[];

// get all 
app.get("/chat/api/messages",(req,res)=>{
    res.send(messages)
});

// get id 

//post 
app.post("/chat/api/messages",(req,res)=>{
    console.log(req);
    let msg=req.body;
    messages.push(msg);
    res.send(msg);
    res.send(messages);
});

app.put("/chat/api/messages",(req,res)=>{
    //Busca el mensaje 
    const msg=messages.find(m=> m.ts===req.body.ts)
    if(!msg){
        return res.status(404).send("The message with the given ts was not found");
    }

    //Verifica el body 
    //Actualiza 
    msg.message=req.body.message;
    msg.author=req.body.author;

    //Envia la respuesta
    res.send(msg)

});

