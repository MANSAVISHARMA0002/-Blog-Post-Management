import mongoose from 'mongoose';


const Connection = async (username,password)=>{
    const URL= `mongodb://${username}:${password}@ac-gwnu0vm-shard-00-00.zxt3l7d.mongodb.net:27017,ac-gwnu0vm-shard-00-01.zxt3l7d.mongodb.net:27017,ac-gwnu0vm-shard-00-02.zxt3l7d.mongodb.net:27017/?ssl=true&replicaSet=atlas-z4tl22-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
       await mongoose.connect(URL,{useNewUrlParser: true})
       console.log("Database connected successfully.")
    }catch(error){
        console.log(error); 
    }
}
export default Connection;