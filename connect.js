const mongoose=require('mongoose');

const mongouri=process.env.mongouri;
async function connectToDB() {
    try{
        await mongoose.connect(mongouri);
        console.log("connected to db");
    }
    catch(err){
        console.log("error connecting to db", err);
    }
};

module.exports={connectToDB};