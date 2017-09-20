'use strict';

var controller = ($scope,$http)=>{
    $scope.booksResult=[];
    $scope.showBookTable = false;

    let searchErrorHandler = (error)=>{
        console.warn('Cannot search data',error);
    };

    let searchAll = ()=>{
        $scope.showBookTable=!$scope.showBookTable;
        $http.get('/books')
        .then((response)=>{
            $scope.booksResult = response.data;
            console.log($scope.booksResult);
        },searchErrorHandler);
    };

    $scope.onlaod = searchAll;
    $scope.Query = '';
    $scope.isIsbn = false;

    $scope.search = ()=>{
        console.log('Search button clicked',$scope.Query,$scope.isIsbn);
        if ($scope.Query===''){
            searchAll();
        }
        else if ($scope.isIsbn===true){
            $http.get('/books/search?isbn='+$scope.Query+'&title=')
            .then(response=>{
                console.dirxml(response);
            },searchErrorHandler);
        }
        else{
            $http.get('/books/search?title='+$scope.Query+'&isbn=')
            .then(response=>{
                console.dir(response);
            },searchErrorHandler);
        }
    };

    searchAll();
};

var app = angular.module('libraryApp',[]);

app.controller('libraryController',
    ['$scope','$http',controller]);