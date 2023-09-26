const express = require('express');
const mongoose = require("mongoose");
const beerRouter = require("./routers/beerRouter");
const cors = require('cors')
require('dotenv').config()


const app = express();

app.use(cors());
app.use(express.json());
app.use("/beer", beerRouter);

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://katie5five5:${process.env.MONGO_PWD}@cluster0.nuc9sog.mongodb.net/`);






app.listen(process.env.PORT || 3001, ()=>{
    console.log('Server Running')
})