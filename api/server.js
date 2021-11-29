const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

/* SCHEMA
{
  id: "a_unique_id", // String, required
  name: "Jane Doe",  // String, required
  bio: "Having fun", // String, required
}
*/

// BUILD YOUR SERVER HERE

// [GET] /api/users          -   find
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved",
                error: err.message
            })
        })
})

// [GET] /api/users/:id      -   findById
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be retrieved",
                error: err.message
            })
        })
})

// [POST] /api/users         -   insert { name, bio }
server.post('/api/users', (req, res) => {
    const info = req.body
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
    }
    else {
        User.insert(info)
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the user to the database",
                    error: err.message
                })
            })
    }
})
// [PUT] /api/users/:id      -   update { name, bio }
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { body } = req
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
    }
    else {
        User.update(id, body)
            .then(upUser => {
                if (!upUser) {
                    res.status(404).json({ message: "The user with the specified ID does not exist" })
                }
                else {
                    res.status(200).json(upUser)
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "The user information could not be modified",
                    error: err.message
                })
            })
    }
})
// [DELETE] /api/users/:id   -   remove
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.remove(id)
        .then(delUser => {
            if (!delUser) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            else {
                res.json(delUser)
            }
        }) 
        .catch(err => {
            res.status(500).json({
                message: "The user could not be removed",
                error: err.message
            })
        })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
