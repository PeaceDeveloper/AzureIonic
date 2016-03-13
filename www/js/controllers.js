angular.module('starter.controllers', [])

.controller('HomePageCtrl', function($scope, $window) {
    $scope.openInBrowser = function (URL) {
          $window.open(URL, '_system')
    }
})

.controller('ChecklistCtrl', function($scope, $window, List) {
    $scope.shouldShowDelete = false;
    
    $scope.doRefresh = function() {
        List.all().then(function(newList) {
            $scope.items = newList;
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        });
    };

    $scope.toggling = function() {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
    };

    $scope.adding = function(goal) {
        if(goal){
            List.addItem(goal).then(function(newList) {
                $scope.items = newList;
                $scope.$apply();
            });    
        }
    };

    $scope.checklistChange = function(item) {
        List.checklistChange(item).then(function(newList) {
            $scope.items = newList;
            $scope.$apply();
        });
    }

    $scope.deleteItem = function(item) {
        List.deleteItem(item).then(function(newList) {
            $scope.items = newList;
            $scope.$apply();
        });
    }

    $scope.doRefresh();
});