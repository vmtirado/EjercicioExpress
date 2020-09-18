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
// Se usa mayuscula porque Joi devuelve una clase 
const Joi= require("joi") 
module.exports = app;
let messages=[];

// Esquema de validación de Joi
const schema =Joi.object({
    message: Joi.string()
    .min(5)
    .required(),
    author: Joi.string()
    .pattern(new RegExp('^[a-zA-Z_]+( [a-zA-Z]+)$')) //Expresion Reg para tener dos nombres separados
     .required(),
     ts:Joi.string()
     .required()
}) ;

// get all 
app.get("/chat/api/messages",(req,res)=>{
    res.send(messages)
});

// get id 
app.get("/chat/api/messages/:ts",(req,res)=>{
    //Busca el mensaje 
    const msg=messages.find(m=> m.ts===req.params.ts)
    if(!msg){
        return res.status(404).send("The message with the given ts was not found");
    }
    const index=messages.indexOf(msg);
    res.send(msg);
});

//post 
app.post("/chat/api/messages",(req,res)=>{

    //Se valida el cuerpo si tiene error se usa deconstruct para guardarlo 
    
    const { error }=schema.validate(req.body);
    if (error){
        console.log(error);
        console.log(req);
        return res.status(400).send(error);
    }
    let msg=req.body;
    messages.push(msg);
    res.send(msg);
});

app.put("/chat/api/messages",(req,res)=>{
    //Busca el mensaje 
    const msg=messages.find(m=> m.ts===req.body.ts)
    if(!msg){
        return res.status(404).send("The message with the given ts was not found");
    }

    //Verifica el body 
        //Se valida el cuerpo si tiene error se usa deconstruct para guardarlo 
        const { error }=schema.validate(req.body);
        if (error){
            console.log(error);
            return res.status(400).send(error);
        }
    //Actualiza 
    msg.message=req.body.message;
    msg.author=req.body.author;

    //Envia la respuesta
    res.send(msg)

});

app.delete("/chat/api/messages/:ts",(req,res)=>{
    //Busca el mensaje 
    const msg=messages.find(m=> m.ts===req.params.ts)
    if(!msg){
        return res.status(404).send("The message with the given ts was not found");
    }
    const index=messages.indexOf(msg);
    messages.splice(index,1);
    res.send(msg);
});

