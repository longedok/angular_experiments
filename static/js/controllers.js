var snippetsControllers = angular.module('snippetsControllers', ['ngRoute']);

snippetsControllers.controller('SnippetListController', ['$scope', 'Snippet', 
    function($scope, Snippet) {
        // put all the data receiveing into a signle function to simplify pagination
        function requestPage(page) {
            $scope.page = page;
            Snippet.query({page: $scope.page}, function(data) {
                $scope.data = data;
                console.log(data);
                $scope.snippets = data.results;
                $scope.pageCount = Math.ceil(data.count / 5);
            });
        }

        // receive server data initially (first page)
        requestPage(1);

        $scope.orderProp = '-created';

        $scope.sort = function(orderProp) {
            // reverse the sorting order when user clicks on a column title again 
            if (orderProp == $scope.orderProp) {
                $scope.orderProp = '-' + orderProp;
            } else {
                $scope.orderProp = orderProp;
            }
        }

        $scope.deleteSnippet = function(_snippetId) {
            Snippet.delete({snippetId: _snippetId}, function () {
                // remove snippet from the table after a successfull xhr delete request 
                $scope.snippets.forEach(function(snippet, index) {
                    if (_snippetId == snippet.id) {
                        $scope.snippets.splice(index, 1);
                    }
                });
            })
        }

        $scope.nextPage = function() {
            if ($scope.data.next) {
                requestPage($scope.page + 1);
            }
        }

        $scope.previousPage = function() {
            if ($scope.data.previous) {
                requestPage($scope.page - 1);
            }
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