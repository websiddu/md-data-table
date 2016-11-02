'use strict';

angular.module('md.data.table').directive('mdTableFilter', mdTableFilter);

function mdTableFilter() {

  function compile(tElement) {
    tElement.addClass('md-table-filter');
  }

  function Controller($scope) {
    console.log($scope.filters);


  }


  function Link(scope, element, attrs, ctrl) {

  }


  Controller.$inject = ['$scope'];

  return {
    compile: compile,
    controller: Controller,
    controllerAs: '$filter',
    restrict: 'E',
    link: Link,
    scope: {
      filters: '=?'
    },
    templateUrl: 'md-table-filter.html'
  };
}
