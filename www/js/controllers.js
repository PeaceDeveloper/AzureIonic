angular.module('starter.controllers', [])

.controller('HomePageCtrl', function($scope, $window) {
    
     $scope.client = new WindowsAzure.MobileServiceClient('https://testingwithazure.azurewebsites.net');

     // Create a table reference
     $scope.todoItemTable = $scope.client.getTable('todoitem');
    //  .then(function(items) {
    //     // Assigin the results to a $scope variable
    //     $scope.items = items;
    //     console.log($scope.items);

    // }, function(err) {
    //     console.error('There was an error quering Azure ' + err);
    // });
     
     console.log($scope.client);
     console.log('///', $scope.todoItemTable);
     
       $scope.todoItemTable  
            .read()                       
            .then(createTodoItemList, handleError);
            
          function createTodoItemList(items) {
              
              console.log('items', items);
              $scope.items = items;
        // Cycle through each item received from Azure and add items to the item list
        // var listItems = $.map(items, createTodoItem);
        // $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
        // $('#summary').html('<strong>' + items.length + '</strong> item(s)');

        // // Wire up the event handlers for each item in the list
        // $('.item-delete').on('click', deleteItemHandler);
        // $('.item-text').on('change', updateItemTextHandler);
        // $('.item-complete').on('change', updateItemCompleteHandler);
    }
    
        function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        console.error(text);
        $('#errorlog').append($('<li>').text(text));
    }
    
    $scope.adding = function () {
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
       
})

.controller('ChecklistCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

