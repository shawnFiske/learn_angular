'use strict'

module.exports = function (app) {
  //injections neededs to be reflected in function parameters
  app.controller('boardController', ['$scope', '$http', function($scope, $http){

    $scope.tiles  = [];
    $scope.errors = [];
    $scope.editScope = '';

    $scope.getAll = function() {
      $http.get('/api/tile')
           .then(function(res){
            //success
            $scope.tiles = res.data;

           }, function(res){
            //error
            $scope.errors.push({msg: 'could not retrieve Tiles from server'});
            console.log(res.data);
      });
    };

    $scope.create = function(tile){
      $scope.newTile = null;
      $http.post('/api/tile', tile)
           .then(function(res){
            //success
            $scope.tiles.push(res.data);
            tile = null;
           }, function(res) {
            //error
              console.log(res.data);
              $scope.errors.push(res.data);
           });
    };

    $scope.destroy = function(tile) {
      $http.delete('/api/tile/' + tile._id)
           .then(function(res){
            //success
            $scope.tiles.splice($scope.tiles.indexOf(tile), 1);
           }, function(res){
            //error
            console.log(res.data);
            $scope.errors.push(res.data)
           });
    };

    $scope.update = function(tile) {
      $http.put('/api/tile/' + tile._id, tile)
           .then(function(res) {
            //success
            tile.editing = false;

           }, function(res){
            //error
            tile.editing = false;

           });
    };

    $scope.getTerrainName = function(tile) {
      return tile.terrain[0];
    };

    $scope.edit = function(tile) {
      tile.editing = true;
      console.log('editing: ', $scope.editScope, tile.terrain[0]);
      $scope.editScope = tile.terrain[0];
    };

    $scope.cancel = function(tile) {
      tile.editing = false;
      console.log('cancel: ', $scope.editScope, tile.terrain[0]);
      tile.terrain[0] = $scope.editScope;
    };

  }]);
}