angular.module('starter.services', [])

.factory('List', function($ionicPopup) {
    var url = 'ADD AZURE URL HERE';
    var client = new WindowsAzure.MobileServiceClient(url);
    var todoItemTable = client.getTable('todoitem');

    function refreshDisplay() {
        return todoItemTable
            .read()
            .then(createTodoItemList, handleError);
    }

    function createTodoItemList(items) {
        return items;
    }

    function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        console.error(text);
        console.log('error', error.request.status);
        if(error.request.status == '0') {
            $ionicPopup.alert({
                title: 'Connection Failure',
                template: 'Connection with Backend can not be established.'
           }); 
        }       
    }

    function deleteItem(item) {
        return todoItemTable
            .del({
                id: item.id
            })                                  // Async send the deletion to backend
            .then(refreshDisplay, handleError); // Update the UI        
    }

    function addItem(goal) {
        return todoItemTable.insert({
            text: goal,
            complete: false
        }).then(refreshDisplay, handleError);
    }

    function checklistChange(item) {
        return todoItemTable
            .update({
                id: item.id,
                complete: item.complete
            })                                  // Async send the update to backend
            .then(refreshDisplay, handleError); // Update the UI    
    }

    return {
        all: function() {
            return refreshDisplay();
        },
        deleteItem: function(item) {
            return deleteItem(item)
        },
        addItem: function(goal) {
            return addItem(goal);
        },
        checklistChange: function(item) {
            return checklistChange(item)
        }
    }
});