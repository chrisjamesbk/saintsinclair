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
        $scope.$broadcast('productSelected', product);
        $scope.carouselOpen = true;
      };

      $scope.$on('carouselOpen', function (evt, open) {
        $scope.carouselOpen = open;
      });

      $scope.style = function () {
        return {
          'display': ($scope.carouselOpen) ? 'none' : 'block'
        };
      };
    })

    // carousel directive
    .directive('carousel', function () {
      var CarouselCtrl = function ($scope) {
        $scope.carousel = {
          images: {},
          color: '',
          show: false
        };

        $scope.$on('productSelected', function (evt, product) {
          angular.extend(
            $scope.carousel,
            {
              images: product.images,
              color: product.color,
              show: true
            }
          );

          $scope.carousel.images.back.active = true;

        });

        $scope.close = function () {
          $scope.carousel.show = false;
          $scope.$emit('carouselOpen', false);
        };
      };

      var linkFn = function (scope) {
        function getWindowHeight() {
          var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

          return window.innerHeight * zoomLevel;
        }

        scope.height = function () {
          var headerHeight = 100;

          return {
            'height': (getWindowHeight() - headerHeight) + 'px'
          };
        };
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