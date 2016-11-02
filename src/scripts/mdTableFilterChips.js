  'use strict';

angular.module('md.data.table').directive('mdTableFilterChips', mdTableFilterChips);

function mdTableFilterChips() {


  function Controller($scope) {

    $scope.searchText = '';
    $scope.chip = '';
    $scope.filter = null;

    $scope.querySearch = function(query) {
      return query ? $scope.filters.available.filter( createFilterFor(query) ) : $scope.filters.available;
    }

    $scope.selectedItemChange = function(item) {
      if(item) {
        item.isPanelHidden = true;
      }
    }

    $scope.cleanCurrent = function() {
      $scope.selectedItem = null;
    }


    var createFilterFor = function(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (angular.lowercase(item.name).indexOf(lowercaseQuery) === 0);
      };

    }

  }


  function Link(scope, element, attrs, ctrl) {

  }

  Controller.$inject = ['$scope'];

  return {
    controller: Controller,
    restrict: 'E',
    link: Link,
    scope: {
      filters: '=?'
    },
    templateUrl: 'md-table-filter-chips.html'
  };
}
