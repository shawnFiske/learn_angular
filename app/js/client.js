'use strict'

require('angular/angular');

//create a module
var board = angular.module('board', []);
require('./game/board')(board);