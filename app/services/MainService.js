(function() {
  angular.module('dolo')
  .service('mainService', function($http, $q) {
    var deferred = $q.defer();
    $http.get('/data')
    .then(function(data) {
      deferred.resolve(data);
    });

    this.getData = function() {
      return deferred.promise;
    };

  });
})();
