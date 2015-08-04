'use strict'

require('angular/angular');

//create a module
var myApp = angular.module('board', []);

//controller
var tileController = board.controller('tileController', ['$scope', function($scope){
  $scope.terrain = 'hello world';

  $scope.createTile = function() {
    alert($scope.terrain);
  }

}]);