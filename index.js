const express = require('express');

const app = express();

const fs = require('fs');

const bodyParser = require('body-parser');

const urlEncoded = bodyParser.json({extended: false});

app.use(express.static(__dirname + '/public'));

app.get('/academics', (req, res) => {
    let content = fs.readFileSync("academics.json", "utf-8");
    let academics = JSON.parse(content);
    res.send(academics);
});

app.post('/add', urlEncoded, (req, res) => {
    let content = fs.readFileSync('academics.json');
    let academics = JSON.parse(content);
    if (req.body.password == "REDDIVISION") {
        let academic = {
            name: req.body.name,
            vk: req.body.vk
        };
        academics.push(academic);
        let data = JSON.stringify(academics);
        fs.writeFileSync('academics.json', data);
        res.send(true);
    } else {
        res.send(false);
    }
})

app.listen(3030);