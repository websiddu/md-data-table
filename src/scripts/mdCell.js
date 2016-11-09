'use strict';

angular.module('md.data.table').directive('mdCell', mdCell);

function mdCell() {

  function compile(tElement) {
    var select = tElement.find('md-select');

    if(select.length) {
      select.addClass('md-table-select').attr('md-container-class', 'md-table-select');
    }

    return postLink;
  }

  // empty controller to be bind properties to in postLink function
  function Controller($scope) {

    numeral.language('en', {
        delimiters: {
            thousands: ' ',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'K',
            million: 'M',
            billion: 'B',
            trillion: 'T'
        },
        currency: {
            symbol: '$'
        }
    });


    $scope.getCurrency = function(number) {
      return numeral(number/1000000).format('$0.0a');
    }

    $scope.getDate = function(date) {
      if(!date) {
        return '–'; 
      }
      var d = new Date(date); 
      return moment(d).format('ll');
    }

  }

  function postLink(scope, element, attrs, ctrls) {
    var select = element.find('md-select');
    var cellCtrl = ctrls.shift();
    var tableCtrl = ctrls.shift();

    if(attrs.ngClick) {
      element.addClass('md-clickable');
    }

    if(select.length) {
      select.on('click', function (event) {
        event.stopPropagation();
      });

      element.addClass('md-clickable').on('click', function (event) {
        event.stopPropagation();
        select[0].click();
      });
    }

    cellCtrl.getTable = tableCtrl.getElement;

    function getColumn() {
      return tableCtrl.$$columns[getIndex()];
    }

    function getIndex() {
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);
    }

    scope.$watch(getColumn, function (column) {
      if(!column) {
        return;
      }

      if(column.numeric) {
        element.addClass('md-numeric');
      } else {
        element.removeClass('md-numeric');
      }
    });
  }

  return {
    controller: Controller,
    compile: compile,
    replace: true,
    require: ['mdCell', '^^mdTable'],
    restrict: 'E',
    templateUrl: 'md-cell.html'
  };
}
