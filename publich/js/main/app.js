var app = angular.module("app.todos", ["xeditable"]);
app.controller("todoController", ['$scope', "svTodos", function($scope, svTodos) {

    $scope.appName = "To do list";
    $scope.formdata = {};
    $scope.todos = [];
    $scope.loading = true;
    // // get all data from api
    // svTodos.get().success(function(data) {
    //     $scope.todos = data;
    // });

    // load full data from api
    svTodos.get().then(function(response) {

        $scope.todos = response.data;
        $scope.loading = false;
    });
    // load user info
    svTodos.getUserInfo().then(function(response) {

        $scope.user = response.data;

    });

    $scope.createTodo = function() {
        var todo = {
            email: "duy",
            text: $scope.formdata.text,
            isDone: false
        };

        svTodos.create(todo).then(function(response) {

            $scope.todos = response.data;
            $scope.formdata.text = "";
        });

    }
    $scope.updatetodo = function(todo) {
        $scope.loading = true;
        svTodos.update(todo).then(function(response) {
            $scope.loading = false;
            $scope.todos = response.data;

        });
    }
    $scope.deletetodo = function(todo) {
        $scope.loading = true;
        svTodos.delete(todo._id).then(function(response) {
            $scope.loading = false;
            $scope.todos = response.data;
        });
    }
}]);