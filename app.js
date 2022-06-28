const express=require('express');
const mongoose  = require('mongoose');
const ConnectToMongo= require('./mongoose');
const app=express();
const port= process.env.PORT || 5000;
const path =require('path');

const cors=require('cors');
app.use(cors());
const fileUpload=require('express-fileupload')
require('dotenv').config();

ConnectToMongo(process.env.MONGO_URI);
app.use(express.json());
app.use(express.static('public'));
app.use('/images',express.static(path.join(__dirname,'public/images')));

app.use(fileUpload());

//For adding or getting projects
app.use('/api',require('./routes/addProject'));
app.use('/auth',require('./routes/auth'));
app.use('/contact',require('./routes/contact'));


app.listen(port,()=>{
    console.log('Server Running at '+ port);
})