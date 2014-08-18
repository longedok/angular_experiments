var snippetsServices = angular.module('snippetsServices', ['ngResource']);

snippetsServices.factory('Snippet', ['$resource', function ($resource) {
    return $resource('api/snippets/:snippetId\\.json', null, {
        update: {method: 'PUT'},
        query: {method: 'GET', params:{snippetId:''}, isArray: false}
    });
}]);