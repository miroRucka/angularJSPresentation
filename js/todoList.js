/**
 * Created with JetBrains WebStorm.
 * User: Mito
 * Date: 22.11.2012
 * Time: 19:55
 * To change this template use File | Settings | File Templates.
 */
angular.module('ToDo', ['mongolab']);

function BaseController($scope, Project) {
    $scope.items = Project.query();

    $scope.dbItems = function () {
        return Project.query();
    }

    $scope.ostava = function () {
        var result = 0;
        angular.forEach($scope.items, function (item) {
            if (!item.done) {
                result++;
            }
        })
        return result;
    }

    $scope.addNewItem = function () {
        var newItemText = $scope.newItem;
        $scope.items.push({text:newItemText, done:false});
        Project.save({text:newItemText, done:false}, function(){});
        $scope.newItem = '';

    }

    $scope.vymazVyriesene = function () {
        var oldItems = $scope.items;
        $scope.items = [];
        angular.forEach(oldItems, function (oldItem) {
            if (!oldItem.done) {
                $scope.items.push(oldItem);
            }
            else
            {
                Project.destroyItems(oldItem);
            }
        });
    }

    $scope.update = function (item) {
        Project.updateItems(item, function(){alert('done');});
    }
}


