'use strict';
var addNewApp = angular.module('addNewApp',[]);
var years = [];

for (let i =1899; i<=new Date().getFullYear();i++){
    years.push(i);
}

var addNewController = ($scope)=>{
    $scope.title = '';
    $scope.ISBN = '';
    $scope.author ='';
    $scope.year;
    $scope.years = years;
    $scope.submit = ()=>{
        if($scope.title.trim()==='')
            alert('Enter all required fields');
    };
};

addNewApp.controller('addNewController',['$scope','$http',addNewController]);
