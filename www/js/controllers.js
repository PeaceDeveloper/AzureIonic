angular.module('starter.controllers', [])

.controller('HomePageCtrl', function($scope, $window) {
})

.controller('ChecklistCtrl', function($scope, Chats, $window) {
   
     $scope.client = new WindowsAzure.MobileServiceClient('http://testingwithazure.azurewebsites.net/');

     $scope.todoItemTable = $scope.client.getTable('todoitem');
     
     console.log($scope.client);
     console.log('///', $scope.todoItemTable);
     
       $scope.todoItemTable  
            .read()                       
            .then(createTodoItemList, handleError);
            
       function createTodoItemList(items) {
              
              console.log('items', items);
              $scope.items = items;
              $scope.$apply();
    }
    
        function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        console.error(text);
        $('#errorlog').append($('<li>').text(text));
    }
    
    function refreshDisplay() {
         $scope.todoItemTable  
                .read()                       
                .then(createTodoItemList, handleError);
        
    }
    
    $scope.addingMethod = function () {
            $scope.todoItemTable.insert({
                text: 'hey hey',
                complete: false
            }).then(function (response) {
                console.log('here is the repsonse', response);
            });        
    }
    
    $scope.deleting = function(params) {
         $scope.todoItemTable
            .del({ id: itemId })   // Async send the deletion to backend
            .then(refreshDisplay, handleError); // Update the UI                    
    }

    $scope.updating = function() {
              $scope.todoItemTable
            .update({ id: itemId, text: newText })  // Async send the update to backend
            .then(refreshDisplay, handleError); // Update the UI
    }
    
    $scope.itemComplete = function () {
          $scope.todoItemTable
            .update({ id: itemId, text: newText })  // Async send the update to backend
            .then(refreshDisplay, handleError); // Update the UI    
    }
    
 
 $scope.shouldShowDelete = false; 
 
 $scope.toggling = function() {
     $scope.shouldShowDelete = !$scope.shouldShowDelete; 
     console.log('the value is', $scope.shouldShowDelete);
     
 }    

$scope.adding = function (goal) {
       $scope.todoItemTable.insert({
                text: goal,
                complete: false
            }).then(refreshDisplay, handleError);        
}

$scope.checklistChange = function (item) {
    console.log('here we are', item);
    
       $scope.todoItemTable
            .update({ id: item.id, complete: item.complete })  // Async send the update to backend
            .then(refreshDisplay, handleError); // Update the UI    
    
}

$scope.deleteItem = function (item) {
    console.log('deleting', item);
     $scope.todoItemTable
            .del({ id: item.id })   // Async send the deletion to backend
            .then(refreshDisplay, handleError); // Update the UI               
}



  $scope.devList = [
    { text: "HTML5", checked: true },
    { text: "CSS3", checked: false },
    { text: "JavaScript", checked: false }
  ];


});

