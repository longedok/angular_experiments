var snippetsServices = angular.module('snippetsServices', ['ngResource']);

snippetsServices.factory('Snippet', ['$resource', function ($resource) {
    return $resource('api/snippets/:snippetId\\.json', null, {
        update: {method: 'PUT'},
        query: {method: 'GET', params:{snippetId:''}, isArray: false}
    });
}]);


var userServices = angular.module('usersServices', ['ngResource']);

userServices.config(['$resourceProvider', function ($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

userServices.factory('User', ['$resource', function($resource) {
        return $resource('users/login/', null, {
            login: {method: 'POST'}
        });
    }]);