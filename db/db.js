const   mongoose  = require("mongoose")

const dbConnection= async()=>{

    try {
       await mongoose.connect(process.env.MONGO_DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       })
        console.log('Db conectada');
    } catch (error) {
        console.log(error);
        throw error
    }


}


module.exports={dbConnection}