const mongoose = require("mongoose")



let connectDB= async () =>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('Connected to DB'))
    .catch(()=>console.log('failed to connected to DB'))


}
module.exports = connectDB;