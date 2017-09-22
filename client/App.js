'use strict';

var searchErrorHandler = (error)=>{
    console.warn('Cannot search data',error);
};

var controller = ($scope,$http)=>{
    $scope.booksResult=[];
    $scope.showBookTable = false;

    let searchAll = ()=>{
        $scope.showBookTable=!$scope.showBookTable;
        $http.get('/books')
        .then((response)=>{
            $scope.booksResult = response.data;
            console.log($scope.booksResult);
        },searchErrorHandler);
    };

    $scope.onlaod = searchAll();
    $scope.Query = '';
    $scope.isIsbn = false;

    $scope.setIsIsbn = (value)=>{
        $scope.isIsbn = value;
    };

    let updateBookList = (results)=>{
        console.dirxml(results);
        $scope.booksResult = results;
    };

    $scope.search = ()=>{
        console.log('Search button clicked',$scope.Query,$scope.isIsbn);
        if ($scope.Query===''){
            searchAll();
        }
        else if ($scope.isIsbn===true){
            $http.get('/books/search?isbn='+$scope.Query+'&title=')
            .then(response=>{
                updateBookList(response.data);
            },searchErrorHandler);
        }
        else{
            $http.get('/books/search?title='+$scope.Query+'&isbn=')
            .then(response=>{
                updateBookList(response.data);
            },searchErrorHandler);
        }
    };

    // $scope.edit = (b)=> {
    //     $http.post('/books/details',b)
    //     .then((response,status,header,config)=>{
    //         console.log(response);
    //         },
    //         (data, status, headers, config)=>{
    //             console.log(status);
    //         });
    //   };
};

var app = angular.module('libraryApp',[]);

app.controller('libraryController',
    ['$scope','$http',controller]);