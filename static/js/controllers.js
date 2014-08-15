var snippetsControllers = angular.module('snippetsControllers', ['ngRoute']);

snippetsControllers.controller('SnippetListController', ['$scope', 'Snippet', 
    function($scope, Snippet) {
        $scope.snippets = Snippet.query();

        $scope.sort = function(orderProp) {
            if (!$scope.orderProp) {
                $scope.orderProp = orderProp;
            } else {
                if ($scope.orderProp[0] == '-') {
                    $scope.orderProp.substr(1, orderProp.length);
                }

                if (orderProp == $scope.orderProp) {
                    $scope.orderProp = '-' + orderProp;
                } else {
                    $scope.orderProp = orderProp;
                }
            }
        }

        $scope.deleteSnippet = function(_snippetId) {
            Snippet.delete({snippetId: _snippetId}, function () {
                $scope.snippets.forEach(function(snippet, index) {
                    if (_snippetId == snippet.id) {
                        $scope.snippets.splice(index, 1);
                    }
                });
            })
        }
    }]);

snippetsControllers.controller('SnippetDetailController', ['$scope', '$routeParams', 
    '$location', 'Snippet', function($scope, $routePararms, $location, Snippet) {
        var snippetId_ = $routePararms.snippetId;
        $scope.snippet = Snippet.get({snippetId:snippetId_}, null);

        $scope.saveSnippet = function() {
            Snippet.update($scope.snippet, function(data) {
                $location.path('/');
            });
        }
    }]);

snippetsControllers.controller('SnippetCreateController', ['$scope', '$routeParams', 
    '$location', 'Snippet', function($scope, $routePararms, $location, Snippet) {
        $scope.saveSnippet = function() {
            Snippet.save($scope.snippet, function(data) {
                $location.path('/');
            });
        }
    }]);