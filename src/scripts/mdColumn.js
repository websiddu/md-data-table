'use strict';

angular.module('md.data.table').directive('mdColumn', mdColumn);

function mdColumn($compile, $mdUtil) {

  function compile(tElement) {
    tElement.addClass('md-column');
  }

  function Link(scope, element, attrs, ctrl) {
    if (ctrl[1].tableData) {
      scope.tableData = ctrl[1].tableData;
      scope.cols = ctrl[1].tableData.cols;
    }
  }



  function Controller($scope) {

    $scope.tableSort = function (col) {
      if (col.sortDirection === "asc") {
        sort_recursive($scope.tableData.rows, col, true);
        col.sortDirection = "desc";
      } else {
        sort_recursive($scope.tableData.rows, col, false);
        col.sortDirection = "asc";
      }
      col.sorted = true;
      resetSorting(col);
    };

    var sort_recursive = function (elements, col, descending) {
      elements.sort(sort_by(col, descending));
      for (var i = 0; i < elements.length; i++) {
        sort_recursive(elements[i].children, col, descending);
      }
    };

    var sort_by = function (col, descending) {

      var direction = !descending ? 1 : -1;

      if (col.sortingType === "custom" && typeof col.sortingFunc === "function") {
        return function (a, b) {
          return col.sortingFunc(a, b) * direction;
        };
      }

      var key = function (x) {
        return (x[col.field] === null ? "" : x[col.field].toLowerCase());
      };

      switch (col.sortingType) {
        case "number":
          key = function (x) {
            return parseFloat(x[col.field]);
          };
          break;
        case "date":
          key = function (x) {
            return new Date(x[col.field]);
          };
          break;
      }

      return function (a, b) {
        return a = key(a), b = key(b), direction * ((a > b) - (b > a));
      };
    }

    var resetSorting = function (sortedCol) {
      var arraySize = $scope.cols.length;
      for (var i = 0; i < arraySize; i++) {
        var col = $scope.cols[i];
        if (col.field != sortedCol.field) {
          col.sorted = false;
          col.sortDirection = "none";
        }
      }
    }

  }

  Controller.$inject = ['$scope']

  return {
    // compile: compile,
    require: ['^^mdHead', '^^mdTable'],
    restrict: 'E',
    replace: true,
    controller: Controller,
    link: Link,
    templateUrl: 'md-column.html',
    scope: {
      numeric: '=?mdNumeric',
      orderBy: '@?mdOrderBy',
      col: '=?'
    }
  };
}

mdColumn.$inject = ['$compile', '$mdUtil'];
