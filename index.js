require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {PythonShell} = require('python-shell')
const app = express()
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res)=>{
    res.render("index", {data:''})
})

app.post("/", (req, res)=>{
    let options = {
        // pythonPath: '',
        args: [req.body.username, process.env.PASSWORD]
    };
    PythonShell.run('./scraper.py', options, function (err, results) {
        if (err){
            res.render("index", {data:results})
            console.log('results: %j', err);
        };
        console.log('results: %j', results);
        res.render("index",{data: results})
    });
})

app.listen(process.env.PORT,()=>{
    console.log("Running")
})