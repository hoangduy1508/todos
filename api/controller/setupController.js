var Todos = require("../models/todomodel");

module.exports = function(app) {
    app.get("/api/setupTodos", function(req, res) {
        // setup seed data
        var seedTodos = [{
                text: "Học node.js",
                isDone: false
            },
            {
                text: "Học angular",
                isDone: false
            },
            {
                text: "viết 1 ứng dụng",
                isDone: false
            }
        ];
        Todos.create(seedTodos, function(err, results) {
            res.send(results);
        });
    });
}