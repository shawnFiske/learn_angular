'use strict'

require('angular/angular');

//create a module
var board = angular.module('board', []);

//controller
var tileController = board.controller('tileController', ['$scope', function($scope){
  $scope.description = 'Create board game tiles with the ability to indicate if the tile has a player(s) and or encouter(s) associated.';
  $scope.terrain = 'hello world';

  $scope.createTile = function() {
    alert($scope.terrain);
  }

}]);