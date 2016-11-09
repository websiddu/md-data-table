/*
 * Angular Material Data Table
 * https://github.com/daniel-nagy/md-data-table
 * @license MIT
 * v0.10.9
 */
(function (window, angular, undefined) {
'use strict';

angular.module('md.table.templates', ['md-body.html', 'md-cell.html', 'md-column.html', 'md-head.html', 'md-row.html', 'md-table-filter-chips.html', 'md-table-filter-condition-panel.html', 'md-table-filter.html', 'md-table-pagination.html', 'md-table-progress.html', 'md-table.html', 'arrow-up.svg', 'navigate-before.svg', 'navigate-first.svg', 'navigate-last.svg', 'navigate-next.svg']);

angular.module('md-body.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-body.html',
    '<div class="md-body">\n' +
    '    <md-row ng-repeat=\'row in tree_rows | searchFor:$parent.filterString:expandingProperty:cols track by row.branch.uid\' row=\'row\' cols=\'cols\' ng-class="\'level-\' + {{ row.level }} + (row.branch.selected ? \' active\':\'\')" class="tree-grid-row md-row"\n' +
    '    ></md-row>\n' +
    '  </div>\n' +
    '');
}]);

angular.module('md-cell.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-cell.html',
    '<div style="max-width: {{col.width}}px;" class="md-cell">\n' +
    '  <div ng-if="col.type == \'currency microusd\'">\n' +
    '    {{getCurrency(row.branch[col.field])}}\n' +
    '  </div>\n' +
    '  <div ng-if="col.type == \'number\'">\n' +
    '    {{row.branch[col.field]}}\n' +
    '  </div>\n' +
    '  <div ng-if="col.type == \'string\'">\n' +
    '    {{row.branch[col.field]}}\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('md-column.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-column.html',
    '<div class="md-column" ng-click=\'tableSort(col)\' style="max-width: {{col.width}}px;">\n' +
    '  {{col.displayText}}\n' +
    '</div>\n' +
    '');
}]);

angular.module('md-head.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-head.html',
    '<div class="md-head">\n' +
    '    <div class="md-row">\n' +
    '      <md-column>&nbsp;</md-column>\n' +
    '      <md-column ng-repeat="col in $mdHead.cols" col=\'col\' md:order:by="name">\n' +
    '      </md-column>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '');
}]);

angular.module('md-row.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-row.html',
    '<div class="md-row">\n' +
    '  <div class="md-cell" style="width: 48px;">\n' +
    '    <md-button class="indented md-icon-button" ng-click="user_clicks_branch(row.branch)" ng-if="row.branch.children.length > 0">\n' +
    '      <i ng-class="row.tree_icon" ng-click="row.branch.expanded = !row.branch.expanded" class="material-icons">\n' +
    '        {{row.branch.expanded ? \'expand_more\' : \'expand_less\'}}\n' +
    '      </i>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '  <md-cell ng-repeat=\'col in cols\'>\n' +
    '      {{row.branch[col.field]}}\n' +
    '  </md-cell>\n' +
    '</div>\n' +
    '');
}]);

angular.module('md-table-filter-chips.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-filter-chips.html',
    '<div class="md-table-filter-chips">\n' +
    '  <div class="md-table-filter-chip">\n' +
    '    <md-table-filter-condition-panel ng-if=\'selectedItem && selectedItem.isPanelHidden\'></md-table-filter-condition-panel>\n' +
    '    <md-autocomplete\n' +
    '            md-no-cache="noCache"\n' +
    '            md-autoselect="true"\n' +
    '            md-autofocus="true"\n' +
    '            md-selected-item="selectedItem"\n' +
    '            md-search-text-change="searchTextChange(searchText)"\n' +
    '            md-search-text="searchText"\n' +
    '            md-selected-item-change="selectedItemChange(item)"\n' +
    '            md-items="item in querySearch(searchText)"\n' +
    '            md-item-text="item.name"\n' +
    '            md-select-on-match="true"\n' +
    '            md-min-length="0"\n' +
    '            placeholder="">\n' +
    '          <md-item-template>\n' +
    '            <span md-highlight-text="searchText" md-highlight-flags="i">{{item.name}}</span>\n' +
    '          </md-item-template>\n' +
    '          <md-not-found>\n' +
    '            No states matching "{{searchText}}" were found.\n' +
    '            <a ng-click="ctrl.newState(ctrl.searchText)">Create a new one!</a>\n' +
    '          </md-not-found>\n' +
    '        </md-autocomplete>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('md-table-filter-condition-panel.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-filter-condition-panel.html',
    '<div class="md-table-filter-condition-panel">\n' +
    '     <md-toolbar class="md-default">\n' +
    '      <div class="md-toolbar-tools">\n' +
    '        <h2>{{selectedItem.name}}</h2>\n' +
    '        <div class="actions">\n' +
    '          <md-button class="md-icon-button" ng-click="hidePanel()">\n' +
    '            <i class="material-icons">\n' +
    '              close\n' +
    '            </i>\n' +
    '          </md-button>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </md-toolbar>\n' +
    '    <div class="content" flex layout-padding>\n' +
    '      <md-input-container>\n' +
    '        <label>Title</label>\n' +
    '        <input ng-model="user.title">\n' +
    '      </md-input-container>\n' +
    '      <md-button>Apply</md-button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('md-table-filter.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-filter.html',
    '<md-card>\n' +
    '  <div class="md-filters">\n' +
    '    <div class="filtersets">\n' +
    '      <div class="filterset">\n' +
    '        <md-select ng-model="filter.filterset.predefined">\n' +
    '          <md-option ng-value="0" selected>All companies</md-option>\n' +
    '        </md-select>\n' +
    '      </div>\n' +
    '      <div class="filterset">\n' +
    '        <md-input-container>\n' +
    '          <md-select ng-model="filter.filterset.quarter">\n' +
    '            <md-option ng-value="0" selected>Q4 2016</md-option>\n' +
    '            <md-option ng-value="1">Q3 2016</md-option>\n' +
    '          </md-select>\n' +
    '        </md-input-container>\n' +
    '      </div>\n' +
    '      <div class="filterset">\n' +
    '        <md-input-container>\n' +
    '          <md-select ng-model="filter.filterset.companies">\n' +
    '            <md-option ng-value="0" selected>Current</md-option>\n' +
    '            <md-option ng-value="1">Future</md-option>\n' +
    '          </md-select>\n' +
    '        </md-input-container>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div class="filterchips">\n' +
    '      <div class="filterheader">\n' +
    '        <span class="text-label">Filter</span>\n' +
    '      </div>\n' +
    '      <div class="chipscontainer">\n' +
    '        <md-table-filter-chips filters="filters"></md-table-filter-chips>\n' +
    '      </div>\n' +
    '\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</md-card>\n' +
    '');
}]);

angular.module('md-table-pagination.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-pagination.html',
    '<div class="page-select" ng-if="$pagination.showPageSelect()">\n' +
    '  <div class="label">{{$pagination.label.page}}</div>\n' +
    '\n' +
    '  <md-select virtual-page-select total="{{$pagination.pages()}}" class="md-table-select" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" ng-disabled="$pagination.disabled" aria-label="Page">\n' +
    '    <md-content>\n' +
    '      <md-option ng-repeat="page in $pageSelect.pages" ng-value="page">{{page}}</md-option>\n' +
    '    </md-content>\n' +
    '  </md-select>\n' +
    '</div>\n' +
    '\n' +
    '<div class="limit-select" ng-if="$pagination.limitOptions">\n' +
    '  <div class="label">{{$pagination.label.rowsPerPage}}</div>\n' +
    '\n' +
    '  <md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" ng-disabled="$pagination.disabled" aria-label="Rows" placeholder="{{ $pagination.limitOptions[0] }}">\n' +
    '    <md-option ng-repeat="option in $pagination.limitOptions" ng-value="option.value ? $pagination.eval(option.value) : option">{{::option.label ? option.label : option}}</md-option>\n' +
    '  </md-select>\n' +
    '</div>\n' +
    '\n' +
    '<div class="buttons">\n' +
    '  <div class="label">{{$pagination.min()}} - {{$pagination.max()}} {{$pagination.label.of}} {{$pagination.total}}</div>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.first()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="First">\n' +
    '    <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-click="$pagination.previous()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="Previous">\n' +
    '    <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-click="$pagination.next()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Next">\n' +
    '    <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.last()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Last">\n' +
    '    <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '</div>');
}]);

angular.module('md-table-progress.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-progress.html',
    '<tr>\n' +
    '  <th colspan="{{columnCount()}}">\n' +
    '    <md-progress-linear ng-show="deferred()" md-mode="indeterminate"></md-progress-linear>\n' +
    '  </th>\n' +
    '</tr>');
}]);

angular.module('md-table.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table.html',
    '<div class="tree-grid md-table">\n' +
    '  <md-head cols=\'$mdTable.tableData.cols\'></md-head>\n' +
    '  <md-body rows=\'$mdTable.tableData.rows\' cols=\'$mdTable.tableData.cols\'></md-body>\n' +
    '</div>\n' +
    '');
}]);

angular.module('arrow-up.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('arrow-up.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>');
}]);

angular.module('navigate-before.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-before.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>');
}]);

angular.module('navigate-first.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-first.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>');
}]);

angular.module('navigate-last.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-last.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>');
}]);

angular.module('navigate-next.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-next.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>');
}]);


angular.module('md.data.table', ['md.table.templates']);

angular.module('md.data.table').directive('mdBody', mdBody);

function mdBody() {

  function compile(tElement) {
    tElement.addClass('md-body');
  }

  function Controller($scope, $attrs) {

    $scope.expandingProperty = 'name';

    var attrs = {};

    var expand_level = parseInt($attrs.expandLevel, 10);

    var for_each_branch = function(f) {
      var do_f, root_branch, _i, _len, _ref, _results;
      do_f = function(branch, level) {
        var child, _i, _len, _ref, _results;
        f(branch, level);
        if (branch.children != null) {
          _ref = branch.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            _results.push(do_f(child, level + 1));
          }
          return _results;
        }
      };
      _ref = $scope.rows;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        root_branch = _ref[_i];
        _results.push(do_f(root_branch, 1));
      }

      return _results;
    };

    var selected_branch = null;

    var select_branch = function(branch) {
      if (!branch) {
        if (selected_branch != null) {
          selected_branch.selected = false;
        }
        selected_branch = null;
        return;
      }
      if (branch !== selected_branch) {
        if (selected_branch != null) {
          selected_branch.selected = false;
        }
        branch.selected = true;
        selected_branch = branch;
        expand_all_parents(branch);
        if (branch.onSelect != null) {
          return $timeout(function() {
            return branch.onSelect(branch);
          });
        } else {
          if (scope.onSelect != null) {
            return $timeout(function() {
              return scope.onSelect({
                branch: branch
              });
            });
          }
        }
      }
    };

    $scope.on_user_click = function(branch) {
      console.log(branch)
      if (scope.onClick) {
        scope.onClick({
          branch: branch
        });
      }
    };

    $scope.user_clicks_branch = function(branch) {
      if (branch !== selected_branch) {
        return select_branch(branch);
      }
    };



    var get_parent = function(child) {
      var parent;
      parent = void 0;
      if (child.parent_uid) {
        for_each_branch(function(b) {
          if (b.uid === child.parent_uid) {
            return parent = b;
          }
        });
      }
      return parent;
    };

    var for_all_ancestors = function(child, fn) {
      var parent;
      parent = get_parent(child);
      if (parent != null) {
        fn(parent);
        return for_all_ancestors(parent, fn);
      }
    };
    var expand_all_parents = function(child) {
      return for_all_ancestors(child, function(b) {
        return b.expanded = true;
      });
    };



    $scope.tree_rows = [];


    var on_treeData_change = function() {
      var add_branch_to_list, root_branch, _i, _len, _ref, _results;

      for_each_branch(function(b, level) {
        if (!b.uid) {
          return b.uid = "" + Math.random();
        }
      });

      for_each_branch(function(b) {
        var child, _i, _len, _ref, _results;
        if (angular.isArray(b.children)) {
          _ref = b.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            _results.push(child.parent_uid = b.uid);
          }
          return _results;
        }
      });
      $scope.tree_rows = [];
      for_each_branch(function(branch) {
        var child, f;
        if (branch.children) {
          if (branch.children.length > 0) {
            f = function(e) {
              if (typeof e === 'string') {
                return {
                  label: e,
                  children: []
                };
              } else {
                return e;
              }
            };
            return branch.children = (function() {
              var _i, _len, _ref, _results;
              _ref = branch.children;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                child = _ref[_i];
                _results.push(f(child));
              }
              return _results;
            })();
          }
        } else {
          return branch.children = [];
        }
      });

      var add_branch_to_list = function(level, branch, visible) {
        var child, child_visible, tree_icon, _i, _len, _ref, _results;
        if (branch.expanded == null) {
          branch.expanded = false;
        }

        branch.level = level;
        $scope.tree_rows.push({
          level: level,
          branch: branch,
          label: branch[$scope.expandingProperty],
          tree_icon: tree_icon,
          visible: visible
        });
        if (branch.children != null) {
          _ref = branch.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            child_visible = visible && (branch.expanded || branch.level < expand_level);
            _results.push(add_branch_to_list(level + 1, child, child_visible));
          }
          return _results;
        }
      };
      _ref = $scope.rows;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        root_branch = _ref[_i];
        _results.push(add_branch_to_list(1, root_branch, true));
      }
      return _results;
    };

    $scope.$watch('rows', on_treeData_change, true);



  }

  Controller.$inject = ["$scope", '$attrs'];

  return {
    compile: compile,
    restrict: 'E',
    controller: Controller,
    templateUrl: 'md-body.html',
    replace: true,
    scope: {
      rows: "=?",
      cols: '=?',
      config: '=?'
    }
  };
}


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


angular.module('md.data.table').directive('mdColumn', mdColumn);

function mdColumn($compile, $mdUtil) {

    function compile(tElement) {
        tElement.addClass('md-column');
    }

    function Link(scope, element, attrs, ctrl) {
      scope.tableData = ctrl[1].tableData;
      scope.cols = ctrl[1].tableData.cols;
    }



    function Controller($scope) {

        $scope.tableSort = function(col) {
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

        var sort_recursive = function(elements, col, descending) {
            elements.sort(sort_by(col, descending));
            for (var i = 0; i < elements.length; i++) {
                sort_recursive(elements[i].children, col, descending);
            }
        };

        var sort_by = function(col, descending) {

            var direction = !descending ? 1 : -1;

            if (col.sortingType === "custom" && typeof col.sortingFunc === "function") {
                return function(a, b) {
                    return col.sortingFunc(a, b) * direction;
                };
            }

            var key = function(x) {
                return (x[col.field] === null ? "" : x[col.field].toLowerCase());
            };

            switch (col.sortingType) {
                case "number":
                    key = function(x) {
                        return parseFloat(x[col.field]);
                    };
                    break;
                case "date":
                    key = function(x) {
                        return new Date(x[col.field]);
                    };
                    break;
            }

            return function(a, b) {
                return a = key(a), b = key(b), direction * ((a > b) - (b > a));
            };
        }

        var resetSorting = function(sortedCol) {
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


angular.module('md.data.table')
  .decorator('$controller', controllerDecorator)
  .factory('$mdEditDialog', mdEditDialog);

/*
 * A decorator for ng.$controller to optionally bind properties to the
 * controller before invoking the constructor. Stolen from the ngMock.
 *
 * https://docs.angularjs.org/api/ngMock/service/$controller
 */
function controllerDecorator($delegate) {
  return function(expression, locals, later, ident) {
    if(later && typeof later === 'object') {
      var create = $delegate(expression, locals, true, ident);
      angular.extend(create.instance, later);
      return create();
    }
    return $delegate(expression, locals, later, ident);
  };
}

controllerDecorator.$inject = ['$delegate'];
  
function mdEditDialog($compile, $controller, $document, $mdUtil, $q, $rootScope, $templateCache, $templateRequest, $window) {
  /* jshint validthis: true */
  
  var ESCAPE = 27;
  
  var busy = false;
  var body = angular.element($document.prop('body'));
  
  /*
   * bindToController
   * controller
   * controllerAs
   * locals
   * resolve
   * scope
   * targetEvent
   * template
   * templateUrl
   */
  var defaultOptions = {
    clickOutsideToClose: true,
    disableScroll: true,
    escToClose: true,
    focusOnOpen: true
  };
  
  function build(template, options) {
    var scope = $rootScope.$new();
    var element = $compile(template)(scope);
    var backdrop = $mdUtil.createBackdrop(scope, 'md-edit-dialog-backdrop');
    var controller;
    
    if(options.controller) {
      controller = getController(options, scope, {$element: element, $scope: scope});
    } else {
      angular.extend(scope, options.scope);
    }
    
    if(options.disableScroll) {
      disableScroll(element);
    }
    
    body.prepend(backdrop).append(element.addClass('md-whiteframe-1dp'));
    
    positionDialog(element, options.target);
    
    if(options.focusOnOpen) {
      focusOnOpen(element);
    }
    
    if(options.clickOutsideToClose) {
      backdrop.on('click', function () {
        element.remove();
      });
    }
    
    if(options.escToClose) {
      escToClose(element);
    }
    
    element.on('$destroy', function () {
      busy = false;
      backdrop.remove();
    });
    
    return controller;
  }
  
  function disableScroll(element) {
    var restoreScroll = $mdUtil.disableScrollAround(element, body);
    
    element.on('$destroy', function () {
      restoreScroll();
    });
  }
  
  function getController(options, scope, inject) {
    if(!options.controller) {
      return;
    }
    
    if(options.resolve) {
      angular.extend(inject, options.resolve);
    }
    
    if(options.locals) {
      angular.extend(inject, options.locals);
    }
    
    if(options.controllerAs) {
      scope[options.controllerAs] = {};
      
      if(options.bindToController) {
        angular.extend(scope[options.controllerAs], options.scope);
      } else {
        angular.extend(scope, options.scope);
      }
    } else {
      angular.extend(scope, options.scope);
    }
    
    if(options.bindToController) {
      return $controller(options.controller, inject, scope[options.controllerAs]);
    } else {
      return $controller(options.controller, inject);
    }
  }
  
  function getTemplate(options) {
    return $q(function (resolve, reject) {
      var template = options.template;
      
      function illegalType(type) {
        reject('Unexpected template value. Expected a string; received a ' + type + '.');
      }
      
      if(template) {
        return angular.isString(template) ? resolve(template) : illegalType(typeof template);
      }
      
      if(options.templateUrl) {
        template = $templateCache.get(options.templateUrl);
        
        if(template) {
          return resolve(template);
        }
        
        var success = function (template) {
          return resolve(template);
        };
        
        var error = function () {
          return reject('Error retrieving template from URL.');
        };
        
        return $templateRequest(options.templateUrl).then(success, error);
      }
      
      reject('Template not provided.');
    });
  }
  
  function logError(error) {
    busy = false;
    console.error(error);
  }
  
  function escToClose(element) {
    var keyup = function (event) {
      if(event.keyCode === ESCAPE) {
        element.remove();
      }
    };
    
    body.on('keyup', keyup);
    
    element.on('$destroy', function () {
      body.off('keyup', keyup);
    });
  }

  function focusOnOpen(element) {
    $mdUtil.nextTick(function () {
      var autofocus = $mdUtil.findFocusTarget(element);
      
      if(autofocus) {
        autofocus.focus();
      }
    }, false);
  }

  function positionDialog(element, target) {
    var table = angular.element(target).controller('mdCell').getTable();
    
    var getHeight = function () {
      return element.prop('clientHeight');
    };
    
    var getSize = function () {
      return {
        width: getWidth(),
        height: getHeight()
      };
    };
    
    var getTableBounds = function () {
      var parent = table.parent();
      
      if(parent.prop('tagName') === 'MD-TABLE-CONTAINER') {
        return parent[0].getBoundingClientRect();
      } else {
        return table[0].getBoundingClientRect();
      }
    };
    
    var getWidth = function () {
      return element.prop('clientWidth');
    };
    
    var reposition = function () {
      var size = getSize();
      var cellBounds = target.getBoundingClientRect();
      var tableBounds = getTableBounds();
      
      if(size.width > tableBounds.right - cellBounds.left) {
        element.css('left', tableBounds.right - size.width + 'px');
      } else {
        element.css('left', cellBounds.left + 'px');
      }
      
      if(size.height > tableBounds.bottom - cellBounds.top) {
        element.css('top', tableBounds.bottom - size.height + 'px');
      } else {
        element.css('top', cellBounds.top + 1 + 'px');
      }
      
      element.css('minWidth', cellBounds.width + 'px');
    };
    
    var watchWidth = $rootScope.$watch(getWidth, reposition);
    var watchHeight = $rootScope.$watch(getHeight, reposition);
    
    $window.addEventListener('resize', reposition);
    
    element.on('$destroy', function () {
      watchWidth();
      watchHeight();
      
      $window.removeEventListener('resize', reposition);
    });
  }
  
  function preset(size, options) {
    
    function getAttrs() {
      var attrs = 'type="' + (options.type || 'text') + '"';
      
      for(var attr in options.validators) {
        attrs += ' ' + attr + '="' + options.validators[attr] + '"';
      }
      
      return attrs;
    }
    
    return {
      controller: ['$element', '$q', 'save', '$scope', function ($element, $q, save, $scope) {
        function update() {
          if($scope.editDialog.$invalid) {
            return $q.reject();
          }
          
          if(angular.isFunction(save)) {
            return $q.when(save($scope.editDialog.input));
          }
          
          return $q.resolve();
        }
        
        this.dismiss = function () {
          $element.remove();
        };
        
        this.getInput = function () {
          return $scope.editDialog.input;
        };
        
        $scope.dismiss = this.dismiss;
        
        $scope.submit = function () {
          update().then(function () {
            $scope.dismiss();
          });
        };
      }],
      locals: {
        save: options.save
      },
      scope: {
        cancel: options.cancel || 'Cancel',
        messages: options.messages,
        model: options.modelValue,
        ok: options.ok || 'Save',
        placeholder: options.placeholder,
        title: options.title,
        size: size
      },
      template:
        '<md-edit-dialog>' +
          '<div layout="column" class="md-content">' +
            '<div ng-if="size === \'large\'" class="md-title">{{title || \'Edit\'}}</div>' +
            '<form name="editDialog" layout="column" ng-submit="submit(model)">' +
              '<md-input-container md-no-float>' +
                '<input name="input" ng-model="model" md-autofocus placeholder="{{placeholder}} "' + getAttrs() + '>' +
                '<div ng-messages="editDialog.input.$error">' +
                  '<div ng-repeat="(key, message) in messages" ng-message="{{key}}">{{message}}</div>' +
                '</div>' +
              '</md-input-container>' +
            '</form>' +
          '</div>' +
          '<div ng-if="size === \'large\'" layout="row" layout-align="end" class="md-actions">' +
            '<md-button class="md-primary" ng-click="dismiss()">{{cancel}}</md-button>' +
            '<md-button class="md-primary" ng-click="submit()">{{ok}}</md-button>' +
          '</div>' +
        '</md-edit-dialog>'
    };
  }
  
  this.show = function (options) {
    if(busy) {
      return $q.reject();
    }
    
    busy = true;
    options = angular.extend({}, defaultOptions, options);
    
    if(!options.targetEvent) {
      return logError('options.targetEvent is required to align the dialog with the table cell.');
    }
    
    if(!options.targetEvent.currentTarget.classList.contains('md-cell')) {
      return logError('The event target must be a table cell.');
    }
    
    if(options.bindToController && !options.controllerAs) {
      return logError('You must define options.controllerAs when options.bindToController is true.');
    }
    
    options.target = options.targetEvent.currentTarget;
    
    var promise = getTemplate(options);
    var promises = [promise];
    
    for(var prop in options.resolve) {
      promise = options.resolve[prop];
      promises.push($q.when(angular.isFunction(promise) ? promise() : promise));
    }
    
    promise = $q.all(promises);
    
    promise['catch'](logError);
    
    return promise.then(function (results) {
      var template = results.shift();
      
      for(var prop in options.resolve) {
        options.resolve[prop] = results.shift();
      }
      
      return build(template, options);
    });
  };
  
  this.small = function (options) {
    return this.show(angular.extend({}, options, preset('small', options)));
  }.bind(this);
  
  this.large = function (options) {
    return this.show(angular.extend({}, options, preset('large', options)));
  }.bind(this);
  
  return this;
}

mdEditDialog.$inject = ['$compile', '$controller', '$document', '$mdUtil', '$q', '$rootScope', '$templateCache', '$templateRequest', '$window'];


angular.module('md.data.table').directive('mdFoot', mdFoot);

function mdFoot() {

  function compile(tElement) {
    tElement.addClass('md-foot');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdHead', mdHead);

function mdHead($compile) {

  function compile(tElement) {
    tElement.addClass('md-head');
    return postLink;
  }

  // empty controller to be bind scope properties to
  function Controller($scope) {

  }

  function postLink(scope, element, attrs, tableCtrl) {
    // because scope.$watch is unpredictable
    var oldValue = new Array(2);

    function addCheckboxColumn() {
      element.children().prepend('<div class="md-column md-checkbox-column">');
    }

    function attatchCheckbox() {
      element.prop('lastElementChild').firstElementChild.appendChild($compile(createCheckBox())(scope)[0]);
    }

    function createCheckBox() {
      return angular.element('<md-checkbox>').attr({
        'aria-label': 'Select All',
        'ng-click': 'toggleAll()',
        'ng-checked': 'allSelected()',
        'ng-disabled': '!getSelectableRows().length'
      });
    }

    function detachCheckbox() {
      var cell = element.prop('lastElementChild').firstElementChild;

      if(cell.classList.contains('md-checkbox-column')) {
        angular.element(cell).empty();
      }
    }

    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    function mdSelectCtrl(row) {
      return angular.element(row).controller('mdSelect');
    }

    function removeCheckboxColumn() {
      Array.prototype.some.call(element.find('th'), function (cell) {
        return cell.classList.contains('md-checkbox-column') && cell.remove();
      });
    }

    scope.allSelected = function () {
      var rows = scope.getSelectableRows();

      return rows.length && rows.every(function (row) {
        return row.isSelected();
      });
    };

    scope.getSelectableRows = function () {
      return tableCtrl.getBodyRows().map(mdSelectCtrl).filter(function (ctrl) {
        return ctrl && !ctrl.disabled;
      });
    };

    scope.selectAll = function () {
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && !ctrl.isSelected()) {
          ctrl.select();
        }
      });
    };

    scope.toggleAll = function () {
      return scope.allSelected() ? scope.unSelectAll() : scope.selectAll();
    };

    scope.unSelectAll = function () {
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && ctrl.isSelected()) {
          ctrl.deselect();
        }
      });
    };

    scope.$watchGroup([enableRowSelection, tableCtrl.enableMultiSelect], function (newValue) {
      if(newValue[0] !== oldValue[0]) {
        if(newValue[0]) {
          addCheckboxColumn();

          if(newValue[1]) {
            attatchCheckbox();
          }
        } else {
          removeCheckboxColumn();
        }
      } else if(newValue[0] && newValue[1] !== oldValue[1]) {
        if(newValue[1]) {
          attatchCheckbox();
        } else {
          detachCheckbox();
        }
      }

      angular.copy(newValue, oldValue);
    });
  }

  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdHead',
    require: '^^mdTable',
    restrict: 'E',
    templateUrl: 'md-head.html',
    replace: true,
    scope: {
      order: '=?mdOrder',
      onReorder: '=?mdOnReorder',
      cols: '=?'
    }
  };
}

mdHead.$inject = ['$compile'];


angular.module('md.data.table').directive('mdRow', mdRow);

function mdRow() {

  function compile(tElement) {
    tElement.addClass('md-row');
    return postLink;
  }

  function Controller($scope) {

  }

  function postLink(scope, element, attrs, tableCtrl) {
    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    function isBodyRow() {
      return tableCtrl.getBodyRows().indexOf(element[0]) !== -1;
    }

    function isChild(node) {
      return element[0].contains(node[0]);
    }

    if(isBodyRow()) {
      var cell = angular.element('<td class="md-cell">');

      scope.$watch(enableRowSelection, function (enable) {
        // if a row is not selectable, prepend an empty cell to it
        if(enable && !attrs.mdSelect) {
          if(!isChild(cell)) {
            element.prepend(cell);
          }
          return;
        }

        if(isChild(cell)) {
          cell.remove();
        }
      });
    }
  }

  return {
    compile: compile,
    require: '^^mdTable',
    restrict: 'E',
    controller: Controller,
    replace: true,
    scope: {
      row: "=?",
      cols: '=?'
    },
    templateUrl: 'md-row.html'
  };
}


angular.module('md.data.table').filter('searchFor', searchFor);


function searchFor() {
    return function(arr, filterString, expandingProperty, colDefinitions, expand) {
        var filtered = [];
        //only apply filter for strings 3 characters long or more
        if (!filterString || filterString.length < 3) {
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item.visible) {
                    filtered.push(item);
                }
            }
        } else {
            var ancestorStack = [];
            var currentLevel = 0;
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                while (currentLevel >= item.level) {
                    throwAway = ancestorStack.pop();
                    currentLevel--;
                }
                ancestorStack.push(item);
                currentLevel = item.level;
                if (include(item, filterString, expandingProperty, colDefinitions)) {
                    for (var ancestorIndex = 0; ancestorIndex < ancestorStack.length; ancestorIndex++) {
                        ancestor = ancestorStack[ancestorIndex];
                        if (ancestor.visible) {
                            if (expand)
                                ancestor.branch.expanded = true;
                            filtered.push(ancestor);
                        }
                    }
                    ancestorStack = [];
                }
            }
        }
        return filtered;
    };

    function include(item, filterString, expandingProperty, colDefinitions) {
        var includeItem = false;
        var filterApplied = false;
        //first check the expandingProperty
        if (expandingProperty.filterable) {
            filterApplied = true;
            if (checkItem(item, filterString, expandingProperty)) {
                includeItem = true;
            }
        }
        //then check each of the other columns
        var arraySize = colDefinitions.length;
        for (var i = 0; i < arraySize; i++) {
            var col = colDefinitions[i];
            if (col.filterable) {
                filterApplied = true;
                if (checkItem(item, filterString, col)) {
                    includeItem = true;
                }
            }
        }
        if (filterApplied) {
            return includeItem;
        } else {
            return true;
        }
    }

    function checkItem(item, filterString, col) {
        if (col.sortingType === "number") {
            if (item.branch[col.field] != null &&
                parseFloat(item.branch[col.field]) === parseFloat(filterString)) {
                return true;
            }
        } else {
            if (item.branch[col.field] != null &&
                item.branch[col.field].toLowerCase().indexOf(filterString.toLowerCase()) !== -1) {
                return true;
            }
        }
    }
};



angular.module('md.data.table').directive('mdSelect', mdSelect);

function mdSelect($compile, $parse) {

  // empty controller to bind scope properties to
  function Controller() {

  }

  function postLink(scope, element, attrs, ctrls) {
    var self = ctrls.shift();
    var tableCtrl = ctrls.shift();
    var getId = $parse(attrs.mdSelectId);

    self.id = getId(self.model);

    if(tableCtrl.$$rowSelect && self.id) {
      if(tableCtrl.$$hash.has(self.id)) {
        var index = tableCtrl.selected.indexOf(tableCtrl.$$hash.get(self.id));

        // if the item is no longer selected remove it
        if(index === -1) {
          tableCtrl.$$hash.purge(self.id);
        }

        // if the item is not a reference to the current model update the reference
        else if(!tableCtrl.$$hash.equals(self.id, self.model)) {
          tableCtrl.$$hash.update(self.id, self.model);
          tableCtrl.selected.splice(index, 1, self.model);
        }

      } else {

        // check if the item has been selected
        tableCtrl.selected.some(function (item, index) {
          if(getId(item) === self.id) {
            tableCtrl.$$hash.update(self.id, self.model);
            tableCtrl.selected.splice(index, 1, self.model);

            return true;
          }
        });
      }
    }

    self.isSelected = function () {
      if(!tableCtrl.$$rowSelect) {
        return false;
      }

      if(self.id) {
        return tableCtrl.$$hash.has(self.id);
      }

      return tableCtrl.selected.indexOf(self.model) !== -1;
    };

    self.select = function () {
      if(self.disabled) {
        return;
      }

      if(tableCtrl.enableMultiSelect()) {
        tableCtrl.selected.push(self.model);
      } else {
        tableCtrl.selected.splice(0, tableCtrl.selected.length, self.model);
      }

      if(angular.isFunction(self.onSelect)) {
        self.onSelect(self.model);
      }
    };

    self.deselect = function () {
      if(self.disabled) {
        return;
      }

      tableCtrl.selected.splice(tableCtrl.selected.indexOf(self.model), 1);

      if(angular.isFunction(self.onDeselect)) {
        self.onDeselect(self.model);
      }
    };

    self.toggle = function (event) {
      if(event && event.stopPropagation) {
        event.stopPropagation();
      }

      return self.isSelected() ? self.deselect() : self.select();
    };

    function autoSelect() {
      return attrs.mdAutoSelect === '' || self.autoSelect;
    }

    function createCheckbox() {
      var checkbox = angular.element('<md-checkbox>').attr({
        'aria-label': 'Select Row',
        'ng-click': '$mdSelect.toggle($event)',
        'ng-checked': '$mdSelect.isSelected()',
        'ng-disabled': '$mdSelect.disabled'
      });

      return angular.element('<td class="md-cell md-checkbox-cell">').append($compile(checkbox)(scope));
    }

    function disableSelection() {
      Array.prototype.some.call(element.children(), function (child) {
        return child.classList.contains('md-checkbox-cell') && element[0].removeChild(child);
      });

      if(autoSelect()) {
        element.off('click', toggle);
      }
    }

    function enableSelection() {
      element.prepend(createCheckbox());

      if(autoSelect()) {
        element.on('click', toggle);
      }
    }

    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    function onSelectChange(selected) {
      if(!self.id) {
        return;
      }

      if(tableCtrl.$$hash.has(self.id)) {
        // check if the item has been deselected
        if(selected.indexOf(tableCtrl.$$hash.get(self.id)) === -1) {
          tableCtrl.$$hash.purge(self.id);
        }

        return;
      }

      // check if the item has been selected
      if(selected.indexOf(self.model) !== -1) {
        tableCtrl.$$hash.update(self.id, self.model);
      }
    }

    function toggle(event) {
      scope.$applyAsync(function () {
        self.toggle(event);
      });
    }

    scope.$watch(enableRowSelection, function (enable) {
      if(enable) {
        enableSelection();
      } else {
        disableSelection();
      }
    });

    scope.$watch(autoSelect, function (newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }

      if(tableCtrl.$$rowSelect && newValue) {
        element.on('click', toggle);
      } else {
        element.off('click', toggle);
      }
    });

    scope.$watch(self.isSelected, function (isSelected) {
      return isSelected ? element.addClass('md-selected') : element.removeClass('md-selected');
    });

    scope.$watch(tableCtrl.enableMultiSelect, function (multiple) {
      if(tableCtrl.$$rowSelect && !multiple) {
        // remove all but the first selected item
        tableCtrl.selected.splice(1);
      }
    });

    tableCtrl.registerModelChangeListener(onSelectChange);

    element.on('$destroy', function () {
      tableCtrl.removeModelChangeListener(onSelectChange);
    });
  }

  return {
    bindToController: true,
    controller: Controller,
    controllerAs: '$mdSelect',
    link: postLink,
    require: ['mdSelect', '^^mdTable'],
    restrict: 'A',
    scope: {
      model: '=mdSelect',
      disabled: '=ngDisabled',
      onSelect: '=?mdOnSelect',
      onDeselect: '=?mdOnDeselect',
      autoSelect: '=mdAutoSelect'
    }
  };
}

mdSelect.$inject = ['$compile', '$parse'];

angular.module('md.data.table').directive('mdTable', mdTable);

function Hash() {
  var keys = {};

  this.equals = function (key, item) {
    return keys[key] === item;
  };

  this.get = function (key) {
    return keys[key];
  };

  this.has = function (key) {
    return keys.hasOwnProperty(key);
  };

  this.purge = function (key) {
    delete keys[key];
  };

  this.update = function (key, item) {
    keys[key] = item;
  };
}

function mdTable() {

  function compile(tElement, tAttrs) {
    tElement.addClass('md-table');

    if(tAttrs.hasOwnProperty('mdProgress')) {
      var body = tElement.find('.md-tbody')[0];
      var progress = angular.element('<div class="md-table-progress">');

      if(body) {
        tElement[0].insertBefore(progress[0], body);
      }
    }
  }

  function Controller($attrs, $element, $q, $scope) {
    var self = this;
    var queue = [];
    var watchListener;
    var modelChangeListeners = [];

    self.$$hash = new Hash();
    self.$$columns = {};

    function enableRowSelection() {
      self.$$rowSelect = true;

      watchListener = $scope.$watchCollection('$mdTable.selected', function (selected) {
        modelChangeListeners.forEach(function (listener) {
          listener(selected);
        });
      });

      $element.addClass('md-row-select');
    }

    function disableRowSelection() {
      self.$$rowSelect = false;

      if(angular.isFunction(watchListener)) {
        watchListener();
      }

      $element.removeClass('md-row-select');
    }

    function resolvePromises() {
      if(!queue.length) {
        return $scope.$applyAsync();
      }

      queue[0]['finally'](function () {
        queue.shift();
        resolvePromises();
      });
    }

    function rowSelect() {
      return $attrs.mdRowSelect === '' || self.rowSelect;
    }

    function validateModel() {
      if(!self.selected) {
        return console.error('Row selection: ngModel is not defined.');
      }

      if(!angular.isArray(self.selected)) {
        return console.error('Row selection: Expected an array. Recived ' + typeof self.selected + '.');
      }

      return true;
    }

    self.columnCount = function () {
      return self.getRows($element[0]).reduce(function (count, row) {
        return row.cells.length > count ? row.cells.length : count;
      }, 0);
    };

    self.getRows = function (element) {
      return Array.prototype.filter.call(element.rows, function (row) {
        return !row.classList.contains('ng-leave');
      });
    };

    self.getBodyRows = function () {
      return Array.prototype.reduce.call($element.find('.md-tbody'), function (result, tbody) {
        return result.concat(self.getRows(tbody));
      }, []);
    };

    self.getElement = function () {
      return $element;
    };

    self.getHeaderRows = function () {
      return self.getRows($element.prop('tHead'));
    };

    self.enableMultiSelect = function () {
      return $attrs.multiple === '' || $scope.$eval($attrs.multiple);
    };

    self.waitingOnPromise = function () {
      return !!queue.length;
    };

    self.queuePromise = function (promise) {
      if(!promise) {
        return;
      }

      if(queue.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1) {
        resolvePromises();
      }
    };

    self.registerModelChangeListener = function (listener) {
      modelChangeListeners.push(listener);
    };

    self.removeModelChangeListener = function (listener) {
      var index = modelChangeListeners.indexOf(listener);

      if(index !== -1) {
        modelChangeListeners.splice(index, 1);
      }
    };

    if($attrs.hasOwnProperty('mdProgress')) {
      $scope.$watch('$mdTable.progress', self.queuePromise);
    }

    $scope.$watch(rowSelect, function (enable) {
      if(enable && !!validateModel()) {
        enableRowSelection();
      } else {
        disableRowSelection();
      }
    });

  }

  Controller.$inject = ['$attrs', '$element', '$q', '$scope'];

  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdTable',
    replace: true,
    templateUrl: 'md-table.html',
    restrict: 'E',
    scope: {
      progress: '=?mdProgress',
      selected: '=ngModel',
      rowSelect: '=mdRowSelect',
      tableData: '=?tableData'
    }
  };
}


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


angular.module('md.data.table').service('mdTableFilterService', mdTableFilterService);

function mdTableFilterService() {

  return {

  }

}





angular.module('md.data.table').directive('mdTablePagination', mdTablePagination);

function mdTablePagination() {

  function compile(tElement) {
    tElement.addClass('md-table-pagination');
  }

  function Controller($attrs, $mdUtil, $scope) {
    var self = this;
    var defaultLabel = {
      page: 'Page:',
      rowsPerPage: 'Rows per page:',
      of: 'of'
    };

    self.label = angular.copy(defaultLabel);

    function isPositive(number) {
      return parseInt(number, 10) > 0;
    }

    self.eval = function (expression) {
      return $scope.$eval(expression);
    };

    self.first = function () {
      self.page = 1;
      self.onPaginationChange();
    };

    self.hasNext = function () {
      return self.page * self.limit < self.total;
    };

    self.hasPrevious = function () {
      return self.page > 1;
    };

    self.last = function () {
      self.page = self.pages();
      self.onPaginationChange();
    };

    self.max = function () {
      return self.hasNext() ? self.page * self.limit : self.total;
    };

    self.min = function () {
      return isPositive(self.total) ? self.page * self.limit - self.limit + 1 : 0;
    };

    self.next = function () {
      self.page++;
      self.onPaginationChange();
    };

    self.onPaginationChange = function () {
      if(angular.isFunction(self.onPaginate)) {
        $mdUtil.nextTick(function () {
          self.onPaginate(self.page, self.limit);
        });
      }
    };

    self.pages = function () {
      return isPositive(self.total) ? Math.ceil(self.total / (isPositive(self.limit) ? self.limit : 1)) : 1;
    };

    self.previous = function () {
      self.page--;
      self.onPaginationChange();
    };

    self.showBoundaryLinks = function () {
      return $attrs.mdBoundaryLinks === '' || self.boundaryLinks;
    };

    self.showPageSelect = function () {
      return $attrs.mdPageSelect === '' || self.pageSelect;
    };

    $scope.$watch('$pagination.limit', function (newValue, oldValue) {
      if(isNaN(newValue) || isNaN(oldValue) || newValue === oldValue) {
        return;
      }

      // find closest page from previous min
      self.page = Math.floor(((self.page * oldValue - oldValue) + newValue) / (isPositive(newValue) ? newValue : 1));
      self.onPaginationChange();
    });

    $attrs.$observe('mdLabel', function (label) {
      angular.extend(self.label, defaultLabel, $scope.$eval(label));
    });

    $scope.$watch('$pagination.total', function (newValue, oldValue) {
      if(isNaN(newValue) || newValue === oldValue) {
        return;
      }

      if(self.page > self.pages()) {
        self.last();
      }
    });
  }

  Controller.$inject = ['$attrs', '$mdUtil', '$scope'];

  return {
    bindToController: {
      boundaryLinks: '=?mdBoundaryLinks',
      disabled: '=ngDisabled',
      limit: '=mdLimit',
      page: '=mdPage',
      pageSelect: '=?mdPageSelect',
      onPaginate: '=?mdOnPaginate',
      limitOptions: '=?mdLimitOptions',
      total: '@mdTotal'
    },
    compile: compile,
    controller: Controller,
    controllerAs: '$pagination',
    restrict: 'E',
    scope: {},
    templateUrl: 'md-table-pagination.html'
  };
}

angular.module('md.data.table').directive('mdTableProgress', mdTableProgress);

function mdTableProgress() {

  function postLink(scope, element, attrs, tableCtrl) {
    scope.columnCount = tableCtrl.columnCount;
    scope.deferred = tableCtrl.waitingOnPromise;
  }

  return {
    link: postLink,
    require: '^^mdTable',
    restrict: 'C',
    scope: {},
    templateUrl: 'md-table-progress.html'
  };
}

angular.module('md.data.table').directive('virtualPageSelect', virtualPageSelect);

function virtualPageSelect() {

  function Controller($element, $scope) {
    var self = this;
    var content = $element.find('md-content');

    self.pages = [];

    function getMin(pages, total) {
      return Math.min(pages, isFinite(total) && isPositive(total) ? total : 1);
    }

    function isPositive(number) {
      return number > 0;
    }

    function setPages(max) {
      if(self.pages.length > max) {
        return self.pages.splice(max);
      }

      for(var i = self.pages.length; i < max; i++) {
        self.pages.push(i + 1);
      }
    }

    content.on('scroll', function () {
      if((content.prop('clientHeight') + content.prop('scrollTop')) >= content.prop('scrollHeight')) {
        $scope.$applyAsync(function () {
          setPages(getMin(self.pages.length + 10, self.total));
        });
      }
    });

    $scope.$watch('$pageSelect.total', function (total) {
      setPages(getMin(Math.max(self.pages.length, 10), total));
    });

    $scope.$watch('$pagination.page', function (page) {
      for(var i = self.pages.length; i < page; i++) {
        self.pages.push(i + 1);
      }
    });
  }

  Controller.$inject = ['$element', '$scope'];

  return {
    bindToController: {
      total: '@'
    },
    controller: Controller,
    controllerAs: '$pageSelect'
  };
}

})(window, angular);