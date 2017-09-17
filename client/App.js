'use strict';

var controller = ($scope,$http)=>{
    $scope.booksResult=[];
    $scope.showBookTable = false;
    let searchAll = ()=>{
        $scope.showBookTable=!$scope.showBookTable;
        $http.get('/books')
        .then((response)=>{
            $scope.booksResult = response.data;
            console.log($scope.booksResult);
        },
        (error)=>{
            console.warn('Cannot search data',error);
        });
    };

    $scope.onlaod = searchAll;
    $scope.Query = '';
    $scope.isIsbn = true;

    $scope.search = ()=>{
        console.log('Search button clicked',$scope.Query);
        if ($scope.Query===''){
            searchAll();
        }
        if ($scope.isIsbn===true){

        }
        else{

        }
    };

    searchAll();
};

var app = angular.module('libraryApp',[]);

app.controller('libraryController',
    ['$scope','$http',controller]);