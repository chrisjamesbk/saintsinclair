/*jshint unused: vars */
define([
  'angular',
  'controllers/main',
  'models/model'
], function (
  angular,
  MainCtrl
) {
  'use strict';

  return angular.module('stsinclairApp', ['stsinclairApp.controllers.MainCtrl',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
});
