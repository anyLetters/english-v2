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
}

app.get('/api/download', (req, res) => {
    let str = '';
    const id = data.last_export;
    const index = data.words.findIndex(word => word.id === id);
    const words = data.words.slice(index + 1, data.words.length);

    words.forEach(word => {
        let trans = [];
        str += `\n${word.eng};`;
        for (let key in word.translations) {
            trans.push(...word.translations[key]);
        }
        str += trans.join(', ');
    });
    fs.writeFile('./api/export.txt', str, 'utf8', err => {
        if (err) throw err;
        data.last_export = data.words[data.words.length - 1].id;
        str = '';
        updateJSON(data);
        res.download('./api/export.txt');
    });
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/words', (req, res) => {
    res.send(data.words);
});

app.get('/api/export', (req, res) => {
    const id = data.last_export;
    const index = data.words.findIndex(word => word.id === id);
    if (index >= 1) {
        const wordsLength = data.words.slice(index + 1, data.words.length).length;
        res.send({
            toExport: wordsLength,
            lastWord: data.words[index]
        });
    } else {
        res.send({
            toExport: 0,
            lastWord: null
        });
    }
});

app.post('/api/words', (req, res) => {
    const word = {
        id: data.words[data.words.length - 1].id + 1,
        eng: req.body.word.eng,
        rus: req.body.word.rus,
        hard: req.body.word.hard,
        translations: req.body.word.translations,
        created_at: new Date().toISOString().slice(0,10)
    };

    console.log(word);

    data.words.push(word);

    updateJSON(data);

    res.send(word);
});

app.put('/api/words/:id', (req, res) => {
    let word;

    console.log(req.body.word);

    for (let i = 1; i < data.words.length; i++) {
        if (data.words[i].id === req.body.word.id) {
            data.words[i] = req.body.word;
            word = data.words[i];
        }
    }

    if (!word) return res.sendStatus(404);

    updateJSON(data);

    res.json(word);
});

app.patch('/api/words/:id', (req, res) => {
    let word;

    for (let i = 0; i < data.words.length; i++) {
        if (data.words[i].id === parseInt(req.params.id)) {
            data.words[i].hard = !data.words[i].hard;
            word = data.words[i];
        }
    }

    console.log(`Word №${word.id}, hard: ${word.hard}`);

    if (!word) return res.sendStatus(404);

    updateJSON(data);

    res.json(word);
});

app.delete('/api/words/:id', (req, res) => {
    const index = data.words.findIndex(word => word.id == req.params.id);

    if (index === -1) return res.sendStatus(404);

    data.words.splice(index, 1);

    for (let i = index; i < data.words.length; i++) {
        data.words[i].id = data.words[i].id - 1;
    }

    updateJSON(data);

    res.sendStatus(204);
});

app.listen(app.get('port'), () => console.log(`Server is listening: http://localhost:${app.get('port')}`));