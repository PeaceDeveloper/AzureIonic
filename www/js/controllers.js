angular.module('starter.controllers', [])

.controller('HomePageCtrl', function($scope, $window) {})

.controller('ChecklistCtrl', function($scope, Chats, $window) {
    $scope.client = new WindowsAzure.MobileServiceClient('http://testingwithazure.azurewebsites.net/');
    $scope.todoItemTable = $scope.client.getTable('todoitem');
    $scope.shouldShowDelete = false;

    $scope.todoItemTable
        .read()
        .then(createTodoItemList, handleError);

    function createTodoItemList(items) {
        $scope.items = items;
        $scope.$broadcast('scroll.refreshComplete');
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

    $scope.updating = function() {
        $scope.todoItemTable
            .update({
                id: itemId,
                text: newText
            })                                  // Async send the update to backend
            .then(refreshDisplay, handleError); // Update the UI
    }
    
    $scope.doRefresh = function() {
        refreshDisplay()
    };

    $scope.toggling = function() {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
    };

    $scope.adding = function(goal) {
        $scope.todoItemTable.insert({
            text: goal,
            complete: false
        }).then(refreshDisplay, handleError);
    };

    $scope.checklistChange = function(item) {
        $scope.todoItemTable
            .update({
                id: item.id,
                complete: item.complete
            })                                  // Async send the update to backend
            .then(refreshDisplay, handleError); // Update the UI    
    }

    $scope.deleteItem = function(item) {
        $scope.todoItemTable
            .del({
                id: item.id
            })                                  // Async send the deletion to backend
            .then(refreshDisplay, handleError); // Update the UI               
    }
});