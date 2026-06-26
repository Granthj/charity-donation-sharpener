const express = require('express');
const app = express();
const path = require('path');
const Routes = require('./Route/routes');
const db = require('./Utils/db.js');
const User = require('./Model/UserSchema.js');
const Charity = require('./Model/CharitySchema.js');
// const bodyParser = require('body-parser');
// bodyParser.json();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend')));
app.use('/api',Routes);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'../Frontend/index.html'));
});
Charity.belongsTo(User,{foreignKey: "userId"});
User.hasMany(Charity,{foreignKey: "userId"});

db.sync().then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log('Connected to server 3000');
    });
});