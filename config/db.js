const mongoose = require('mongoose');

mongoose.connect(`moongodb://localhost/blog project`);
const database = mongoose.connection;
database.on("conection",(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log(`db is connected`);
})
module.exports = database