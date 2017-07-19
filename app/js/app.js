var njwtApp = angular.module('njwtApp', ['ngMaterial']);

njwtApp.controller('njwtCtrl', ['$scope', '$http',function($scope, $http){
    $scope.user = {
        role: 'Administrator'
    };
    
    $scope.roleList = ('Administrator User').split(' ').map(function(roles) {
        return {role: roles};
    });

    $scope.createAccount = function(){
        $http({
            method: 'POST',
            url: 'http://localhost:8080/api/signup',
            data: $scope.user
        }).then(function(success){
            $scope.user = {},
            console.log('a new user successfully created');
        }), function(error){
            console.log('failed to create a new user');
        }
    }
}]);