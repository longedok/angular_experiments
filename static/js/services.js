var snippetsServices = angular.module('snippetsServices', ['ngResource']);

snippetsServices.config(['$resourceProvider', function ($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

snippetsServices.factory('Snippet', ['$resource', function ($resource) {
    return $resource('api/snippets/:snippetId/\\.json', null, {
        update: {method: 'PUT'}
    });
}]);