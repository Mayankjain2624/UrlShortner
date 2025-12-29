const mongoose=require('mongoose');


async function connectToDB() {
    try{
        await mongoose.connect('mongodb+srv://mayankjainiitdelhi_db_user:0f2RGByXmrIy066E@cluster0.nlrqk6c.mongodb.net/?appName=Cluster0');
        console.log("connected to db");
    }
    catch(err){
        console.log("error connecting to db", err);
    }
};

module.exports={connectToDB};