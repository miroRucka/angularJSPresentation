var mongoModule = angular.module('mongolab', ['ngResource']);

mongoModule.factory('Project', function ($resource) {
    var Project = $resource('https://api.mongolab.com/api/1/databases/testdbangularapp/collections/todo-items/:id',
        { apiKey:'50aa9414e4b0c97193006de8' },
        { update:{ method:'PUT' }}
    );

    Project.updateItems = function (item, callback) {
        var newObject = angular.extend({}, item, {_id:undefined});
        return Project.update({id:item._id.$oid}, newObject, callback);
    }

    Project.destroyItems = function(item, cb) {
        return Project.remove({id: item._id.$oid}, cb);
    };

    return Project;
});