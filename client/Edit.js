'use strict';

var editController = ($scope,$http)=>{
    $scope.submit = () =>{
      
    };

    $scope.title;
    $scope.ISBN;
    $scope.author;

    $scope.cancelBtn_click = ()=>{
      window.location.href = '/';
    };
  };
  
  angular.module('libraryApp')
  .controller('editController',['$scope','$http',editController]);