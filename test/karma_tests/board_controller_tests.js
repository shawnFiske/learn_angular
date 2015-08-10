'use strict'
require('../../app/js/client.js');
require('angular-mocks');

describe('board controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;
  
  beforeEach(angular.mock.module('board'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function(){
    var boardController = $ControllerConstructor('boardController', {$scope: $scope});
    expect(typeof boardController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
    expect(Array.isArray($scope.tiles)).toBe(true);
  });

  describe('Rest functionality', function(){
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope){
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('boardController', {$scope: $scope});
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll is called', function () {
      $httpBackend.expectGET('/api/tile').respond(200, [{terrain: ['new terrain'], _id:1}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.tiles[0].terrain[0]).toBe('new terrain');
      expect($scope.tiles[0]._id).toBe(1);
    });

    it('should make a post request when create is called', function(){
      var testTile = {terrain: ['test terrain']};
      $scope.newTile = testTile;
      $httpBackend.expectPOST('/api/tile').respond(200, {terrain: ['test create terrain'], _id: 1});
      $scope.create({terrain: ['test terrain']});
      expect($scope.newTile).toBe(null);
      $httpBackend.flush();
      expect($scope.tiles.length).toBe(1);
      expect($scope.tiles[0].terrain[0]).toBe('test create terrain');
    });

    it('should make a put request when update is called', function(){
      var tile = {_id: 1, editing: true};
      $httpBackend.expectPUT('/api/tile/1').respond(200);
      $scope.update(tile);
      $httpBackend.flush();
      expect(tile.editing).toBe(false);
    });

    it('should make a delete request when destroy is called', function(){
      var tile = {_id: 1, terrain:['test terrain']};
      $scope.tiles = [{terrain: ['some terrain'], _id: 2}, tile, {terrain: ['another terrain'], _id: 3}]
      $httpBackend.expectDELETE('/api/tile/1').respond(200);
      $scope.destroy(tile);
      $httpBackend.flush();
      expect($scope.tiles.length).toBe(2);
      expect($scope.tiles.indexOf(tile)).toBe(-1);
      expect($scope.tiles[0].terrain[0]).toBe('some terrain');
      expect($scope.tiles[1].terrain[0]).toBe('another terrain');
    });
  });
});