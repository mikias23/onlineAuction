const express = require('express');
const path = require('path')
const fs = require('fs');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const User = require('./routes/user');
const Fetch = require('./routes/fetch');
const Activities= require('./routes/activities');

const Upload = require('./routes/upload');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

//|| 'mongodb://localhost:27017/houseRent'
mongoose.connect("mongodb://localhost:27017/onlineAuctions" , {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});



mongoose.connection.on('connected', ()=> {
    console.log('Database Connected to  '+ 'mongodb://localhost:27017/onlineAuction')})

    

app.use(bodyParser.json());
app.use("/images", express.static(path.join("images")));  
app.use('/users', User);

app.use('/uploads', Upload);
 app.use('/fetch', Fetch);
app.use('/activities', Activities);
// app.use('/deletions', Deletions);
// app.use('/authenticate', Authenticate);


app.listen(3000, ()=> {
    console.log('Server Connected to' + 3000)
})