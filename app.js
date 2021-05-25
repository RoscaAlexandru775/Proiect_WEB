/*const http = require('http');
var url = require("url"); 
const fs = require('fs'); 

const hostname = '127.0.0.1';
const port = 3000;

fs.readFile('index.html',(err,html)=>{
	if(err){
		throw err;}
	
	const server = http.createServer(function (req, res) {
        res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.write(html);
	res.end();
	});
	server.listen(port, hostname, ()=>{
	console.log('server is :'+port);
	});
});*/
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/register', async(req, res) => {
    console.log(req.body)

    const { username, password: plainTextPassword} = req.body

    const password = await bcrypt.hash(password, 10)

    try {
        const response = await User.create({
            username,
            password
        })
    } catch (error) {
        console.log(error)
        return res.json({ status:'error' })
    }
    
    res.json({status : 'ok'})
})

app.listen(9999, () => {
    console.log('Server up at 9999')
})



