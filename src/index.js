const express = require('express')
const db = require('../db/db')
const body_parser = require('body-parser')

// PORT
const PORT = 8080

// Setup Express App
const app = express()

// Parse incoming req Data
app.use(body_parser.json())
app.use(body_parser.urlencoded({
    extended: false
}))

// Route
app.get('/api/hello', (req, res) => {
    res.status(200).send({
        success: true,
        message: "Hello World, this is Route"
    })
})

// Get All Todo
app.get('/api/todos', (req, res) => {
    res.status(200).send({
        success: true,
        message: "Loaded",
        data: db

    })
})

// Create Todo
app.post('/api/todos', (req, res) => {

    // Validation
    if (!req.body.title) {
        res.status(400).send({
            success: false,
            message: "Title tidak boleh Kosong"
        })
    } else if (!req.body.description) {
        res.status(400).send({
            success: false,
            message: "Description tidak boleh Kosong"
        })
    }

    const todo = {
        id: db[db.length - 1].id + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false
    }
    db.push(todo)

    res.status(201).send({
        success: true,
        message: "Todo ha been Created",
        todo: todo
    })
})

// Get Todo By Id
app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    db.map((todo) => {
        if (todo.id === id) {
            res.status(200).send({
                success: true,
                message: todo
            })
        } else {
            res.status(200).send({
                success: false,
                message: "Todo tidak ditemukan"
            })
        }
    })
})

// Delete Todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    db.find((todo, idx) => {
        if (todo.id === id) {
            splice(idx, 1)
            res.status(200).send({
                success: true,
                message: todo
            })
        } else {
            res.status(404).send({
                success: false,
                message: "Todo tidak ditemukan"
            })
        }
    })
})

// Make todo Done
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    db.find((todo, index) => {
        if (todo.id === id) {
            todo.completed = true
            res.status(200).send({
                success: true,
                message: `${todo.title} Sudah diselesaikan yah`
            })
        } else {
            res.status(404).send({
                success: false,
                message: "Todo tidak ditemukan"
            })
        }
    })
})

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))