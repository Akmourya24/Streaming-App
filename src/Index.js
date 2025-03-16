import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({ path: './.env' });

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 6000 ,()=>{
    console.log("mongodb database run successfully")
    })
})
.catch((Error)=>{
    console.log("database connection failed",Error)
})
