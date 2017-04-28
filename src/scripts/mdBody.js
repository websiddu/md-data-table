'use strict';

angular.module('md.data.table').directive('mdBody', mdBody);

function mdBody() {

  function compile(tElement) {
    tElement.addClass('md-body');
  }

  function Controller($scope, $attrs) {

    $scope.expandingProperty = 'name';

    var attrs = {};

    var expand_level = parseInt($attrs.expandLevel, 10);

    var for_each_branch = function (f) {
      var do_f, root_branch, _i, _len, _ref, _results;
      do_f = function (branch, level) {
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

    var select_branch = function (branch) {
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
          return $timeout(function () {
            return branch.onSelect(branch);
          });
        } else {
          if (scope.onSelect != null) {
            return $timeout(function () {
              return scope.onSelect({
                branch: branch
              });
            });
          }
        }
      }
    };

    $scope.on_user_click = function (branch) {

      if (scope.onClick) {
        scope.onClick({
          branch: branch
        });
      }
    };

    $scope.user_clicks_branch = function (branch) {
      if (branch !== selected_branch) {
        return select_branch(branch);
      }
    };



    var get_parent = function (child) {
      var parent;
      parent = void 0;
      if (child.parent_uid) {
        for_each_branch(function (b) {
          if (b.uid === child.parent_uid) {
            return parent = b;
          }
        });
      }
      return parent;
    };

    var for_all_ancestors = function (child, fn) {
      var parent;
      parent = get_parent(child);
      if (parent != null) {
        fn(parent);
        return for_all_ancestors(parent, fn);
      }
    };
    var expand_all_parents = function (child) {
      return for_all_ancestors(child, function (b) {
        return b.expanded = true;
      });
    };



    $scope.tree_rows = [];


    var on_treeData_change = function () {
      var add_branch_to_list, root_branch, _i, _len, _ref, _results;

      for_each_branch(function (b, level) {
        if (!b.uid) {
          return b.uid = "" + Math.random();
        }
      });

      for_each_branch(function (b) {
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

      for_each_branch(function (branch) {
        var child, f;
        if (branch.children) {
          if (branch.children.length > 0) {
            f = function (e) {
              if (typeof e === 'string') {
                return {
                  label: e,
                  children: []
                };
              } else {
                return e;
              }
            };
            return branch.children = (function () {
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

      var add_branch_to_list = function (level, branch, visible) {
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
      config: '=?',
      options: "=?"
    }
  };
}
