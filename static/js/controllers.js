var snippetsControllers = angular.module('snippetsControllers', ['ngRoute']);

snippetsControllers.controller('SnippetListController', ['$scope', '$routeParams', 'Snippet', 
    function($scope, $routeParams, Snippet) {
        // put all the data receiveing into a signle function to simplify pagination
        function requestPage(page) {
            $scope.page = page;
            Snippet.query({page: $scope.page}, function(data) {
                $scope.data = data;
                if ($scope.data.next) {
                    $scope.nextPage = $scope.page + 1;
                }
                console.log($scope.nextPage);
                if ($scope.data.previous) {
                    $scope.prevPage = $scope.page - 1;
                }
                console.log(data);
                $scope.snippets = data.results;
                $scope.pageCount = Math.ceil(data.count / 5);
            });
        }

        if ($routeParams.page)
            requestPage(parseInt($routeParams.page) || 1);
        else
            requestPage(1); // receive server data initially (first page)

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