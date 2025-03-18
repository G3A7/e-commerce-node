const mongoose = require('mongoose');
const dbConnection =()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log(`DB connection established`);
    })
    .catch((err)=>{
        console.log(`Error connecting to${err}`);
        process.exit(1);
    });
}

module.exports = dbConnection;