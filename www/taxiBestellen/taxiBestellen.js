'use strict';

angular.module('taxiApp.taxiBestellen', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/taxiBestellen', {
    templateUrl: 'taxiBestellen/taxiBestellen.html',
    controller: 'taxiBestellenCtrl'
  });
}])

.controller('taxiBestellenCtrl', [function() {

}]);