angular.module('starter.controller', [])
  //Controller for Introdunction pages, the pages display only once after installing the application
  .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $location, $rootScope) {
    // Lets create a function
    // That will go to state main
    $scope.startApp = function() {
      $location.path('/').replace();
      window.localStorage.didTutorial = 'true';
    };
    // At the start of this controller
    // Lets check local storage for didTutorial
    if (window.localStorage.didTutorial === 'true') {
      // If it we did do the tutorial, lets call
      // $scope.startApp
      $scope.startApp();
    } else {}
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  })

//Controller for BinToBin, We will scan the barcode/QR code or else place the storage unit number and get the bin details
.controller('BinCtrl', function($scope, backcallFactory, $rootScope, $ionicPopup, $http, $location, $cordovaBarcodeScanner, $ionicPlatform, $cordovaToast) {
  backcallFactory.backcallfun();
  //We added the barcode scanner
  $scope.scan = function() {
      cordova.plugins.diagnostic.requestCameraAuthorization(function(status) {
        console.log("Authorization request for camera use was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
        $cordovaToast.showLongBottom("Authorization request for camera use was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied")).then(function(success) {}, function(error) {});
        $cordovaBarcodeScanner.scan().then(function(barcodeData) {
          document.getElementById('sUnit').value = barcodeData.text;
          $cordovaToast.showLongBottom(barcodeData.text).then(function(success) {}, function(error) {});
          $rootScope.barcodeData1 = barcodeData.text;
        }, function(error) {
          alert(JSON.stringify(error));
        });
      }, function(error) {
        console.error(error);
      });
    }
    //Enter the Storage Unit number and get the bin details
  $scope.getList = function() {
    var storageUnit = document.getElementById('sUnit').value;
    $http.get("Storage Unit URL('" + storageUnit + "')").then(function(response) {
      if (response.status == 200) {
        alert(response.status);
        $location.path('/details');
        $rootScope.sUnit = response.data.d.Lenum;
        $rootScope.Lgnum = response.data.d.Lgnum;
        $rootScope.Werks = response.data.d.Werks;
        $rootScope.Lgtyp = response.data.d.Lgtyp;
        $rootScope.Matnr = response.data.d.Matnr;
        $rootScope.lgpla = response.data.d.Lgpla;
        $rootScope.gesme = response.data.d.Gesme;
      } else {
        // invalid response
        console.log("error:" + response.data);
      }
    }, function(error) {
      $ionicPopup.confirm({
        title: "Miracle ME alerts you",
        content: "Invalid username and password."
      })
      console.log('We have an error' + JSON.stringify(error));
    });
  }
})

//Controller for GetBinDetails, we will get the details of particular storage unit number
.controller('DetailsCtrl', function($scope, $http, $rootScope, $ionicPopup, $ionicHistory, $location) {
  $scope.back = function() {
      $ionicHistory.goBack();
    }
    //To select the source bin from this list
  $scope.StorageList = function() {
      $http.get("Storage List URL").then(function(response, error) {
        $location.path('/list');
        $rootScope.lenum = response.data.d.results;
      });
    }
    //Your order will be transfered
  $scope.orderList = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '<b><span>Transfer Order</span></b>',
      template: '<center><span  style="font-size:14px !important;">Are you sure you want Transfer order?</span></center>',
      okText: '<span>Ok</span>',
      cancelText: '<span>Cancel</span>'
    });
    confirmPopup.then(function(res) {
      if (res) {
        var transferorder = document.getElementById('dest').value;
        $http.get("Transfer Order URL").then(function(response) {
          $location.path('/success');
          $rootScope.Etanum = response.data.d.ETanum;
        });
      } else {}
    });
  }
})

//Controller for ResponseList, transfer the source bin to destination bin
.controller('ListInCtrl', function($scope, $rootScope, $location, $ionicHistory) {
  $scope.back = function() {
    $ionicHistory.goBack();
  }
  $scope.getDest = function(dBin) {
    $scope.des = dBin;
    $location.path('/details');
    document.getElementById("dest").value = dBin;
  }
  $scope.success = function() {
    $location.path('/success');
  }
})

//Controller for success, The successfull order number will be displayed
.controller('successCtrl', function($scope, $rootScope, $ionicHistory, $location) {
  $scope.back = function() {
      $ionicHistory.goBack();
    }
    //Again if you want to go to home page hit this
  $scope.goToScan = function() {
    $location.path('/');
  }
})

//Used to exit the application from the home page
.factory('backcallFactory', ['$state', '$ionicPlatform', '$ionicHistory', '$timeout', function($state, $ionicPlatform, $ionicHistory, $timeout) {

  var obj = {}
  obj.backcallfun = function() {
      $ionicPlatform.registerBackButtonAction(function(event) {
        if ($state.current.name == "BinToBin") {
          navigator.app.exitApp(); //<-- remove this line to disable the exit
        } else {
          navigator.app.backHistory();
        }
      }, 100);
    } //backcallfun
  return obj;
}]);
