const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const route = require("./APIS/Route/route");
require("dotenv").config();
const app=express();
mongoose.connect(process.env.DB_URL);
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/api",route)
app.listen(process.env.PORT,()=>{
    console.log(`server start at port ${process.env.PORT}`);
})
