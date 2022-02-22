const express = require('express');
const mongoose = require("mongoose");
const beerRouter = require("./routers/beerRouter");

const app = express();

app.use(express.json());
app.use("/beer", beerRouter);

mongoose.connect("mongodb://localhost:27017/beerApp");






app.listen(3001, ()=>{
    console.log("Server Running Port: 3001");
});