const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const data = require('./api/data');

const app = express();

function updateJSON(data) {
    fs.writeFile('./api/data.json', JSON.stringify(data), error => {
        if (error) throw error;
    });
};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/data', (req, res) => {
    res.send(data);
});

app.post('/api/words', (req, res) => {
    const word = {
        id: data[data.length - 1].id + 1,
        eng: req.body.word.eng,
        rus: req.body.word.rus,
        hard: req.body.word.hard,
        translations: req.body.word.translations,
        created_at: new Date().toISOString().slice(0,10)
    };

    console.log(word);

    data.push(word);

    updateJSON(data);

    res.send(word);
});

app.put('/api/words/:id', (req, res) => {
    let word;

    console.log(req.body.word);

    for (let i = 1; i < data.length; i++) {
        if (data[i].id === req.body.word.id) {
            data[i] = req.body.word;
            word = data[i];
        }
    }

    if (!word) return res.sendStatus(404);

    updateJSON(data);

    res.json(word);
});

app.patch('/api/words/:id', (req, res) => {
    let word;

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(req.params.id)) {
            data[i].hard = !data[i].hard;
            word = data[i];
        }
    }

    console.log(`Word №${word.id}, hard: ${word.hard}`);

    if (!word) return res.sendStatus(404);

    updateJSON(data);

    res.json(word);
});

app.delete('/api/words/:id', (req, res) => {
    const index = data.findIndex(word => word.id == req.params.id);

    if (index === -1) return res.sendStatus(404);

    data.splice(index, 1);

    for (let i = index; i < data.length; i++) {
        data[i].id = data[i].id - 1;
    }

    updateJSON(data);

    res.sendStatus(204);
});

app.listen(app.get('port'), () => console.log(`Server is listening: http://localhost:${app.get('port')}`));