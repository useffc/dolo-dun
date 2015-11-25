(function() {
  angular.module('dolo')
  .controller('MainController', [
    '$scope',
    'mainService',
    function($scope, mainService) {
      var promise = mainService.getData();
      promise.then(function(response) {
        $scope.data = response.data;
      });
    }
  ]);

})();
