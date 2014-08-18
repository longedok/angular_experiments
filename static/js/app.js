var snippetsApp = angular.module('snippetsApp', [
    'ngRoute',

    'snippetsControllers',
    'snippetsServices' 
]);

snippetsApp.config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider
            .when('/snippets', {
                templateUrl: 'static/js/partials/snippet_list.html',
                controller: 'SnippetListController'
            })
            .when('/new', {
                templateUrl: 'static/js/partials/snippet_detail.html',
                controller: 'SnippetCreateController'
            })
            .when('/edit/:snippetId', {
                templateUrl: 'static/js/partials/snippet_detail.html',
                controller: 'SnippetDetailController'               
            })
            .otherwise({
                redirectTo: '/snippets'
            });
        }]);