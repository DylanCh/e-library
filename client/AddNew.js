'use strict';
var addNewApp = angular.module('addNewApp',[]);

var addNewController = ($scope)=>{
    $scope.title = '';
    $scope.ISBN = '';
    $scope.author ='';
    $scope.submit = ()=>{
        if($scope.title.trim()==='')
            alert('Enter all required fields')
    };
};

addNewApp.controller(['$scope','$http',addNewController]);
