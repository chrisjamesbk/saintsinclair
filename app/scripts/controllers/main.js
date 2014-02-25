define([
  'angular',
  'models/model'
], function (
  angular,
  StSinclairModel
) {
  'use strict';

  angular.module('stsinclairApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function ($scope) {
      $scope.products = StSinclairModel.products;

      console.log($scope.products);
    });
});