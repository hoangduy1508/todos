var app = angular.module("app.todos");

app.factory("userInfor", ["$http", function($http) {
    return {
        getUserInfo: function() {
            return $http.get("/user");
        }
    }
}]);