'use strict';

/**
 * @ngdoc function
 * @name mobiqApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mobiqApp
 */
angular.module('mobiqApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
