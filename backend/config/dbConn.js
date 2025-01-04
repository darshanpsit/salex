const mongoose = require('mongoose');

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI).then(()=>{
            console.log('successfully Connected to database');
    
    })
}
catch (error) {
    console.log(error);

}
}

module.exports=connectDB