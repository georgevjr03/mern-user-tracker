const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 3009;


app.use(cors());
app.use(express.json());

const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true}
);
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB databse established successfully");
})

const contactsRouter = require('./routes/contacts');
const usersRouter =require('./routes/users');

app.use('/contacts',contactsRouter);
app.use('/users',usersRouter);


app.listen(port,() => {
    console.log(`Server is running on port: ${port}`);

});