  'use strict';

angular.module('md.data.table').directive('mdTableFilterConditionPanel', mdTableFilterConditionPanel);

function mdTableFilterConditionPanel() {

  function Controller($scope) {


    $scope.hidePanel = function() {
      $scope.cleanCurrent();
    }

  }


  Controller.$inject = ['$scope'];

  return {
    controller: Controller,
    restrict: 'E',
    replace: true,
    templateUrl: 'md-table-filter-condition-panel.html'
  };
}
