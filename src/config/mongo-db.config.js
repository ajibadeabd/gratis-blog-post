const mongoose = require('mongoose');

async function connection() {
     try {
       await mongoose.connect(
          process.env.MONGODB_URI,
         {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useFindAndModify: false,
           useCreateIndex: true,
         },
         (error) => {
           if (error) return new Error("Failed to connect to database");
           console.log("connected");
         }
       );
     } catch (error) {
       console.log(error, "here");
     }
   }
   module.exports = {
     connection,
   };