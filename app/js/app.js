var njwtApp = angular.module('njwtApp', ['ngMaterial','ui.router']);

njwtApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: '../../views/signup.html',
            controller: 'signUpCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: '../../views/login.html',
            controller: 'loginCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: '../../views/home.html'
        })
});

njwtApp.controller('signUpCtrl', ['$scope', '$http',function($scope, $http){
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

njwtApp.controller('loginCtrl', ['$scope', '$http','$state', function($scope, $http, $state){
    $scope.user = {};
    
    $scope.login = function(){
        $http({
            method: 'POST',
            url: 'http://localhost:8080/api/authenticate',
            data: $scope.user
        }).then(function(success){
            $scope.user = {};
            $scope.token = success.data.token;
            $state.transitionTo('home');
        }),function (error){
                console.log(error, 'Cannot POST the Data');
        }
    }
}]);