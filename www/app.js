'use strict';
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


angular.module('taxiApp.service',[]).
    factory('DataSource', ['$http',function($http){
       return {
           get: function(file,callback,transform){
           	console.log("file " + file);
                $http.get(
                    file,
                    {transformResponse:transform}
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                });
           }
       };
    }]);




// Declare app level module which depends on views, and components
angular.module('taxiApp', [
  'ngRoute',
  'taxiApp.service',
  'taxiApp.view1',
  'taxiApp.taxiBestellen',
  'taxiApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('AppController', ['$scope','DataSource', function($scope,DataSource) {
     
    var SOURCE_URL = "http://api.openweathermap.org/data/2.5/weather?q={bottrop}&mode=xml";
    
    
    var xmlTransform = function(data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json( data );
        console.log(json.current);
        return json.current;
    };
    
    var setData = function(data) {
        $scope.dataSet = data;
    };
        
    DataSource.get(SOURCE_URL,setData,xmlTransform);
    
     
}]);
// Custom filter for Temperature
// .filter('temp', function($filter) {
//     return function(input, precision) {
//         if (!precision) {
//             precision = 1;
//         }
//         var numberFilter = $filter('number');
//         return numberFilter(input, precision) + '\u00B0C';
//     };
// });

