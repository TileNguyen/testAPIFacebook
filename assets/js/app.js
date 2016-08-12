'use strict';

var CampApp =  angular.module('CampaignsApp',['ngRoute']);
CampApp.service('campService', function ($http, $q) {
    return {
    'getAllCampaigns': function(){
      var defer = $q.defer();
      $http.get('/campaigns')
      .success(function(resp){
        defer.resolve(resp);
      }).error(function(err){
        defer.reject(err);
      });
      return defer.promise;
    },
    'createCampaigns': function (camp) {
      var defer = $q.defer();
      $http.post('/campaigns', camp)
      .success(function(resp){
        defer.resolve(resp);
      }).error(function(err){
        defer.reject(err);
      });
      return defer.promise;
    }
  };
});

CampApp.controller('CampaignsCtrl',['$scope', '$location', 'campService',
    function ($scope, $location, $campService) {
    $scope.camps = [];
    $scope.objectives = ['BRAND_AWARENESS', 'PAGE_LIKES', 'LOCAL_AWARENESS',
        'MOBILE_APP_ENGAGEMENT', 'POST_ENGAGEMENT'];
    $scope.objective = '';
    $scope.camp = {
      name: '',
      status: 'PAUSED',
      objective: ''
    };
    $scope.camps = $campService.getAllCampaigns().then(function (res) {
      console.log(res);
      $scope.camps = res.data;
      return res.data;
    });
    $scope.addCamp = function(){
      $scope.camp.objective = $scope.objective;
      if (!$scope.camp.objective) return;
      $campService.createCampaigns($scope.camp).then(function(res){
        $scope.camps.push($scope.camp);
        $scope.camp = {};
        // $window.location.href = 'http://localhost:1337/';
        $location.path('/');
      });
    };
  }]);
  // .config(['$routeProvider',function($routeProvider) {
  //   var resolveProjects = {
  //     projects: function (Projects) {
  //       return Projects.fetch();
  //     }
  //   };
  //   $routeProvider
  //     .when('/', {
  //       controller:'CampaignsCtrl as allCamp',
  //       templateUrl:'',
  //       resolve: resolveProjects
  //     })
  //     .otherwise({
  //       redirectTo:'/'
  //     })
  //   }])
