'use strict';
var controller = ($scope)=>{
    $scope.isIsbn = true;
    $scope.search = (query)=>{
        if ($scope.isIsbn===true){

        }
        else{

        }
    };
};

var app = angular.module('libraryApp',[]);

app.controller('libraryController',
    ['$scope',controller]);