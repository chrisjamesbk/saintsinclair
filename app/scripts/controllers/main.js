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
      $scope.selectedProduct = {};

      $scope.select = function (product) {
        $scope.selectedProduct = product;
        console.log('select');
        console.log(product);
        $scope.$broadcast('productSelected', product);
      };
    })

    // carousel directive
    .directive('carousel', function () {
      var CarouselCtrl = function ($scope) {
        $scope.carousel = {
          images: {},
          color: ''
        };

        $scope.$on('productSelected', function (evt, product) {
          console.log('on');
          console.log(product);
          $scope.carousel = {
            images: product.images,
            color: product.color
          };
        });
      };

      var linkFn = function (scope) {
        console.log(scope);
      };

      return {
        restrict: 'A',
        scope: true,
        templateUrl: '/views/carousel.tpl.html',
        controller: CarouselCtrl,
        link: linkFn
      };
    })

    // prevent default directive
    .directive('pd', function () {
      var linkFn = function (scope, iElem, iAttrs) {
        if (iAttrs.ngClick || iAttrs.href === '' || iAttrs.href === '#') {
          iElem.on('click', function (e) {
            e.preventDefault();
          });
        }
      };

      return {
        restrict: 'A',
        link: linkFn
      };
    });
});