'use strict';

var editController = ($scope,$http)=>{
    $scope.editMode = true;
    $scope.submit = () =>{
      
    };

    $scope.title;
    $scope.ISBN;
    $scope.author;

    $scope.cancelBtn_click = ()=>{
      window.location.href = '/';
    };

    $scope.deleteRecord=()=>{
      let toBeDeleted = {
        title: $scope.title,
        ISBN: $scope.ISBN
      };

      console.dirxml(toBeDeleted);

      $http({
        method: 'DELETE',
        url:'/delete',
        data: toBeDeleted        
      }).then(data=>{
        alert('Delete request submitted');
        console.log(data.data);
        if (data.data.status)
          window.location.href = '/';
        else{
          $scope.editMode = false;
        }
      });
    };
  };
  
  angular.module('libraryApp')
  .controller('editController',['$scope','$http',editController]);

jQuery(document).ready(()=>{
  let $ = jQuery;
  $('#deleteBtn').click(event=>{
    event.preventDefault();
    $.ajax('delete',{
      method:'DELETE'
    }).done(result=>{
      if(result.status){
        window.location.href = '/'
      }
      else{
        $('#deleteFailed').prop('hidden','false');
      }
    });
  });
});