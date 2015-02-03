'use strict';

/**
 * @ngdoc function
 * @name mobiqApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mobiqApp
 */
angular.module('mobiqApp')
.config(function(googleLoginProvider) {
    googleLoginProvider.configure({
        clientId: 'Add valid google clientId',
        scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/plus.login"]
    });
  })
  .controller('MainCtrl', [ '$scope', 'googleLogin', 'googleCalendar', 'googlePlus', function ($scope, googleLogin, googleCalendar, googlePlus) {

    $scope.login = function () {
        googleLogin.login();
    };

    $scope.$on("googlePlus:loaded", function() {
      googlePlus.getCurrentUser().then(function(user) {
        $scope.currentUser = user;
      });
      $scope.loadEvents();
    });
    $scope.currentUser = googleLogin.currentUser;


    $scope.loadEvents = function() {
      var d = new Date($scope.dt);
      var curr_date = d.getDate();
      var next_date = d.getDate() + 1;
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      var datemin = curr_year + "-" + curr_month + "-" + curr_date + "T00:00:00Z"  ;
      var datemax = curr_year + "-" + curr_month + "-" + next_date + "T00:00:00Z"  ;
      gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': datemin,
          'timeMax': datemax
        });
        request.execute(function(resp) {


          $scope.calendars = "";
          $scope.calendars = resp.items;
          $scope.$apply();
        })

      })
    };

    $scope.summary = "Hire Michael";
    $scope.createEvent = function() {
      var d = new Date($scope.dt);
      var curr_date = d.getDate();
      var next_date = d.getDate() + 1;
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      var time = "T"+ $scope.mytime.getHours() +":"+ $scope.mytime.getMinutes()+":00Z";
      var date = curr_year + "-" + curr_month + "-" + curr_date + time;
      var vm = $scope.mytime.getMinutes()+30;
      var vh = $scope.mytime.getHours();
      var time = "T"+ vh+":"+ vm+":00Z";
      var enddate = curr_year + "-" + curr_month + "-" + curr_date + time  ;

      gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': {
            'start': {
              'dateTime':date
            },
            'end': {
              'dateTime':enddate
            },
            'summary': $scope.summary
          }
          

        });
        request.execute(function(resp) {


          $scope.loadEvents();
        })

      })
    };

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

   $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
   // $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
  }]);
