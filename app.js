const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {User} = require('./model/user');
const assert = require('assert');
const db = 'mongodb://localhost:27017/valmate';
app.use(express.json());

mongoose.connect(db,{useNewUrlParser:true})
    .then(()=>console.log("Connected successfully to server"))
    .catch((err)=>console.log('Not connected to db'))


app.get('/',(req, res)=>{
    res.send('helloworld')
});

app.post('/api/user',async(req,res)=>{
    let user = new User({
        name:req.body.name
    });
    try {
        user = await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
});
app.put('/api/user',async(req,res)=>{
    try {
        let user = await User.find({name:req.body.name});
        if (user.partner != null) return res.status(200).send(user)

        let users = await User.find({assign:false,name :{ $ne: req.body.name}});

        len = users.length;
        index = Math.floor(Math.random() * len);

        partner = users[index];
        user.partner = partner.name;
        res.send(user);

        // user = await user.save();

        // res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
    
})

app.listen(3000, ()=>console.log('listening on port 3000'))