const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

var todos = []

class Todo {
    constructor(id, title, complete) {
        this.id = id
        this.title = title
        this.complete = complete
    }
}

function addTodo(id, title, complete) {
    return new Todo(id, title, complete)
}

function findCompleteTitle() {
    let completeTodo = []
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].complete === true) {
            completeTodo.push(todos[i])
        }
    }
    return completeTodo
}

function findUnCompleteTitle() {
    let completeTodo = []
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].complete === false) {
            completeTodo.push(todos[i])
        }
    }
    return completeTodo
}

function clearAllTitleComplete() {
    let result = todos.filter(function (todos) {
        return todos.complete === false
    })
    todos = result
}

function removeTitle(id) {
    let result = todos.filter(function (todos) {
        return todos.id.toString() !== id
    })
    todos = result
    return todos
}
app.get('/todos', (req, res) => {
    res.send(todos)
})

app.post('/addTodo', (req, res) => {
    let id = todos.length + 1
    let title = req.body.title
    let complete = false


    let t = addTodo(id, title, complete)
    todos.push(t)

    res.status(201).send(todos)
})

app.put('/titleComplete/:id', (req, res) => {
    let id = req.params.id

    todos[id - 1].complete = true

    res.status(200).send({ message: 'change complete complete' })
})

app.put('/editTitle/:id', (req, res) => {
    let id = req.params.id
    let title = req.body.title

    todos[id - 1].title = title
    res.status(200).send(todos[id - 1])
})

app.get('/completeTitle', (req, res) => {
    let completeTodo = findCompleteTitle()

    res.status(200).send(completeTodo)
})

app.get('/unCompleteTitle', (req, res) => {
    let completeTodo = findUnCompleteTitle()

    res.status(200).send(completeTodo)
})

app.delete('/removeTitle/:id', (req, res) => {
    let id = req.params.id
    removeTitle(id)
    res.status(200).send(todos)
})

app.delete('/clearAllTitleComplete', (req, res) => {
    clearAllTitleComplete()
    res.send(todos)
})

app.listen(port, () => {
    console.log(`Todo app start at port ${port}`)
})
