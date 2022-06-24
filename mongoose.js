const mongoose=require('mongoose');

const ConnectToMongo = (uri)=>{

    mongoose.connect(uri).then(()=>{
        console.log('Database connected');
    }).catch((err)=> console.log('Error in Database Connection'));

}

module.exports=ConnectToMongo;