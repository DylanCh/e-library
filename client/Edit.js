'use strict';

var toBeDeleted = new Object();

var deleteSuccess = (result)=>{
  if(result.status===true){
    $('.container').html('').prepend(
      `<div>Deletion Succeed</div>`
    );
  }
  else{
    $('#deleteFailed').prop('hidden','false');
  }
};

var deleteFail = err=>{
  console.error(err);
  $('div#deleteFailed').removeAttr('hidden');
};

var editController = ($scope,$http)=>{
    $scope.editMode = true;
    $scope.submit = () =>{
      
    };

    $scope.title;
    $scope.ISBN;
    $scope.author;

    $scope.cancelBtn_click = ()=>{
      window.history.back();
    };

    $scope.deleteRecord=()=>{
      toBeDeleted = {
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

    toBeDeleted = {
      title : $('#title').val(),
      ISBN : $('#ISBN').val()
    };

    fetch('/delete',{
      method : 'POST',
      body : toBeDeleted,
      headers : {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(result=>{
      if(result.status!=200){
        console.log('Request',result.ok);
      }
      return result.json();
    })
    .then(result=>{
      console.log(result);
      deleteSuccess(result);
    })
    .catch(err=>{
      deleteFail(err);
    });
  });
});