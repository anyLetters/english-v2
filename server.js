'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const data = require('./api/data');

const app = express();

// let nextId = 5;

// function updateTodosFile(data) {
//     fs.writeFile('./api/todos.json', JSON.stringify(data), (err) => {
//         if (err) throw err;
//     });
// };

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

app.post('/api/todos', (req, res) => {
    const todo = {
        id: nextId++,
        title: req.body.title,
        completed: false
    };

    todos.push(todo);

    updateTodosFile(todos);

    res.send(todo);
});

app.put('/api/todos/:id', (req, res) => {
    let todo;

    for (let i = 1; i < todos.length; i++) {
        if (todos[i].id == req.params.id) {
            todos[i].title = req.body.title || todos[i].title;
            todo = todos[i];
        }
    }

    if (!todo) return res.sendStatus(404);

    updateTodosFile(todos);

    res.json(todo);
});

app.patch('/api/todos/:id', (req, res) => {
    let todo;

    for (let i = 1; i < todos.length; i++) {
        if (todos[i].id == req.params.id) {
            todos[i].completed = !todos[i].completed;
            todo = todos[i];
        }
    }

    if (!todo) return res.sendStatus(404);

    updateTodosFile(todos);

    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(todo => todo.id == req.params.id);

    if (index === -1) return res.sendStatus(404);

    todos.splice(index, 1);

    updateTodosFile(todos);

    res.sendStatus(204);
});

app.listen(app.get('port'), () => console.log(`Server is listening: http://localhost:${app.get('port')}`));