var Todos = require("../models/todomodel");

function getTodos(res) {
    Todos.find(function(err, todos) {

        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
}

module.exports = function(app) {
    // get all
    app.get("/api/todos", function(req, res) {
        getTodos(res);
    });

    // get by id
    app.get("/api/todos/:id", function(req, res) {
        Todos.findById({ _id: req.params.id }, function(err, todo) {
            if (err) {
                throw err;
            } else {
                res.json(todo);
            }
        });
    });

    // create a todo

    app.post("/api/todos", function(req, res) {
        var todo = {
            email: req.body.email,
            text: req.body.text,
            isDone: req.body.isDone
        }

        Todos.create(todo, function(err, todo) {
            if (err) throw err;
            else getTodos(res);
        });
    });


    // update a todo
    app.put("/api/todos", function(req, res) {
        if (!req.body._id) {
            return res.status(500).send("id is required");
        } else {
            Todos.update({
                _id: req.body._id
            }, {

                text: req.body.text,
                isDone: req.body.isDone
            }, function(err, todo) {
                if (err) throw err;
                else getTodos(res);
            });
        }
    });


    // delete
    app.delete("/api/todos/:id", function(req, res) {
        Todos.remove({
            _id: req.params.id
        }, function(err, todo) {
            if (err) throw err;
            else getTodos(res);
        });
    });
}