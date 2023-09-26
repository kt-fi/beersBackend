const express = require('express');
const mongoose = require("mongoose");
const beerRouter = require("./routers/beerRouter");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use("/beer", beerRouter);

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/beerApp");






app.listen(process.env.PORT || 3000, console.log('SERVER STARTED'))