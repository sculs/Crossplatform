angular.module('starter', ['ionic'])

    .run(function ($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
        $rootScope.data = {};
        $rootScope.data["adult"] = 0;
        $rootScope.data["child"] = 0;
        $rootScope.data["persons"] = 0;
        $rootScope.data["checkIn"] = "";
        $rootScope.data["checkInText"] = "";
        $rootScope.data["checkOut"] = "";
        $rootScope.data["checkOutText"] = "";
        $rootScope.data["days"] = 0;
        $rootScope.data["price"] = 0;
        $rootScope.data["roomtype"] = "";
        $rootScope.data["userid"] = "";
        $rootScope.data["breakfast"] = false;
        $rootScope.data["showbreakfast"] = "not included";
        $rootScope.data["casenumber"] = (new Date()).valueOf().toString();

    })

    // Create own controllers here;

    // .controller("DataCtrl", function ($scope, $http, $state, $stateParams) {
    //     // This is an object which add info from user;
    //     $scope.data0 = {};
    //
    //     // The data is sent here
    //     var url = "http://liusong.xyz/database.php";
    //     var url2 = "http://liusong.xyz/database2.php";
    //
    //     // Submit is a method which accept formula by "submit-button" & "ng-submit";
    //     $scope.submit = function () {
    //         // The data is send by email
    //         $http.post(url, $scope.data0)
    //             .then(function (response0) {
    //                 $scope.response0 = response0;
    //                 console.log($scope.response0);
    //             })
    //     }
    //
    //
    //     $http.get(url2)
    //         .success(function (response) {
    //             $scope.rooms = response;
    //             console.log(response);
    //             console.log("This is the DataCtrl 1");
    //
    //             $scope.whichType = $state.params.rID;
    //             console.log($scope.whichType);
    //
    //         })
    //
    // })

    .controller("aboutTabCtrl", function () {

        console.log("aboutTabCtrl");
    })
    .controller("contactTabCtrl", function () {
        console.log("contactTabCtrl");
    })

    .controller("sendCtrl", function ($scope, $http, $ionicPopup, $rootScope) {
        $scope.data = {};

        $scope.data["adult"] = $rootScope.data.adult;
        $scope.data["child"] = $rootScope.data.child;
        $scope.data["persons"] = $rootScope.data.persons;
        $scope.data["checkIn"] = $rootScope.data.checkInText;
        $scope.data["checkOut"] = $rootScope.data.checkOutText;
        $scope.data["days"] = $rootScope.data.days;
        $scope.data["price"] = $rootScope.data.price;
        $scope.data["roomtype"] = $rootScope.data.roomtype;
        $scope.data["userid"] = $rootScope.data.myEmail;
        $scope.data["breakfast"] = $rootScope.data.showbreakfast;
        $scope.data["casenumber"] = (new Date()).valueOf().toString();

        console.log($scope.data);

        $scope.isSend = false;
        var url = "http://liusong.xyz/senddata.php";
        $scope.submit = function () {
            // The data is send by email
            $http.post(url, $scope.data)
                .then(function (response) {
                    $scope.isSend = true;
                    $scope.response = response;
                    console.log($scope.response);
                })
        }

        // An alert dialog
        $scope.showAlert = function () {
            //if ($scope.isSend) {
            var alertPopup = $ionicPopup.alert({
                title: '<h3>Successfully</h3>',
                template: 'A confirmation is sending to your registered email address.'
            });
            alertPopup.then(function (res) {
                console.log('Booked successfully');
                // window.location = 'html/contact.html';
                // window.location = '/contact';
            });
            //}
        };

    })

    .controller("getCtrl", function ($scope, $http, $state, $rootScope) {
        var url2 = "http://liusong.xyz/getdata.php";
        $scope.data = $rootScope.data;
        $http.get(url2)
            .success(function (response) {
                $scope.rooms = response;
                console.log(response);
                $scope.data["price"] = $scope.rooms.price;

                $scope.whichType = $state.params.rID;
                console.log("$state.params: " + $state.params);
                console.log("$scope.whichType: " + $scope.whichType);
                console.log($scope.whichType);
            })

        // console.log("price1:" + $scope.data.price);
        // console.log("price2:" + $rootScope.data.persons);

        $rootScope.data.price = ($scope.data.price + ($rootScope.data.persons * 20));

        // console.log("price3:" + $rootScope.data.price);

    })

    .controller("homeTabCtrl", function ($scope, $http, $state, $ionicPopup, $rootScope) {
        $scope.data = $rootScope.data;
        $scope.count1 = 0;
        $scope.count2 = 0;
        $scope.range = 0;

        $scope.setMinDate=function(){
            var today = new Date();
            return today;
        }


        // $scope.showBtn = function(){
        //     $scope.showSubmit = false;
        //     if ($scope.data.checkId == undefined) {
        //         $scope.showWarn("Type in check in date");
        //     } else if ($scope.data.checkOut == undefined) {
        //         $scope.showWarn("Type in check out date");
        //     } else if ($scope.adult == undefined || $scope.adult == 0) {
        //         $scope.showWarn("Add guests, at least 1 adult is required");
        //     } else {
        //         $scope.warntext = "";
        //         $scope.showSubmit = true;
        //     }
        //     return $scope.showSubmit;
        // };

        var url = "http://liusong.xyz/senddata.php";
        $scope.submit = function () {
            // The data is send by email
            $http.post(url, $scope.data)
                .then(function (response) {
                    $scope.response2 = response;
                    console.log($scope.response2);
                    console.log($scope.response2.data);
                })
        }

        $scope.dualFunc = function () {
            $scope.getType();
            $scope.data["adult"] = $scope.count1;
            $scope.data["child"] = $scope.count2;
            $scope.data["persons"] = $scope.count1 + $scope.count2;
            console.log("Adult: " + $scope.data.adult);
            console.log("Child: " + $scope.data.child);
            console.log("Persons: " + $scope.data.persons);

            $scope.range = $scope.dateDiff($scope.data.checkIn, $scope.data.checkOut);
            $scope.data["range"] = $scope.range;
            console.log("Range: " + $scope.range);
            if ($scope.data.breakfast) {
                $rootScope.data.showbreakfast = "included";
            } else {
                $rootScope.data.showbreakfast = "not included";
            }

            // $scope.temp = $scope.formatDate($scope.data.checkIn);
            $rootScope.data.checkInText = $scope.formatDate($scope.data.checkIn);
            console.log("checkin: " + $rootScope.data.checkInText);

            // $scope.temp = $scope.formatDate($scope.data.checkOut);
            $rootScope.data.checkOutText = $scope.formatDate($scope.data.checkOut);
            console.log("checkout: " + $rootScope.data.checkOutText);

            $rootScope.data.adult = $scope.count1;
            $rootScope.data.child = $scope.count2;
            $rootScope.data.persons = $scope.count1 + $scope.count2;
            $rootScope.data.checkIn = $scope.data.checkIn;
            $rootScope.data.checkOut = $scope.data.checkOut;
            $rootScope.data.days = $scope.range;
            // $rootScope.data.price = $scope.data.price;
            $rootScope.data.roomtype = $scope.data.roomtype;
            // $rootScope.data.userid =
            $rootScope.data.breakfast = $scope.data.breakfast;
            $rootScope.data.casenumber = (new Date()).valueOf().toString();
            console.log("$rootScope(child): " + $rootScope.data.child);
            console.log("$rootScope(checkin): " + $rootScope.data.checkIn);
            console.log("$rootScope(persons): " + $rootScope.data.persons);
            console.log("$rootScope(breakfast): " + $rootScope.data.breakfast);

            // $scope.submit();
        }


        // var url2 = "http://liusong.xyz/getdata.php";
        // $http.get(url2)
        //     .success(function (response) {
        //         $scope.rooms = response;
        //         console.log(response);
        //
        //         $scope.whichType = $state.params.rID;
        //         console.log("$scope.whichType: " + $scope.whichType);
        //         console.log($scope.whichType);
        //     })

        $scope.getType = function () {
            console.log("$scope.whichType: " + $scope.whichType);
        }

        // animation
        $scope.myActiveSlide = 1;

        $scope.checknumber = function () {
            console.log($scope.data);
            if ($scope.data.roomtype == "single") {
                return 1;
            } else if ($scope.data.roomtype == "double") {
                return 2;
            } else if ($scope.data.roomtype == "family") {
                return 5;
            } else {
                return 0;
            }
        };

        $scope.minus1 = function () {
            if ($scope.count1 > 0) {
                $scope.count1 = $scope.count1 - 1;
            } else {
                $scope.count1 = 0;
            }
            // $scope.data.adult = $scope.count1;
            // console.log("data.adult: " + $scope.data.adult);
        };

        $scope.plus1 = function () {
            if (($scope.count1 + $scope.count2) >= $scope.checknumber()) {
                if ($scope.checknumber() == 0) {
                    $scope.showChooseRoom();
                } else {
                    $scope.showNote();
                }
            } else {
                console.log("Plus2()");
                $scope.count1 = $scope.count1 + 1;
            }
            // $scope.data.adult = $scope.count1;
            // console.log("data.adult: " + $scope.data.adult);
        };

        $scope.minus2 = function () {
            if ($scope.count2 > 0) {
                $scope.count2 = $scope.count2 - 1;
            } else {
                $scope.count2 = 0;
            }
            // $scope.data.child = $scope.count2;
            // console.log("data.child: " + $scope.data.child);
        };

        $scope.plus2 = function () {
            if (($scope.count1 + $scope.count2) >= $scope.checknumber()) {
                if ($scope.checknumber() == 0) {
                    $scope.showChooseRoom();
                } else {
                    $scope.showNote();
                }
            } else {
                $scope.count2 = $scope.count2 + 1;
            }
            // $scope.data.child = $scope.count2;
            // console.log("data.child: " + $scope.data.child);
        };

        // $scope.data.adult = $scope.count1;
        // $scope.data.child = $scope.count2;
        // console.log('Data:' + data);

        // $scope.dateDiff = function($from, $to) {
        //     $scope.dateTemp, $scope.dateFrom, $scope.dateTo, $scope.days;
        //     $scope.dateTemp = $scope.from.split("-");
        //     // Change to format: 12-18-2017
        //     $scope.dateFrom = new Date($scope.dateTemp[1] + '-' + $scope.dateTemp[2] + '-' + $scope.dateTemp[0]);
        //     $scope.dateTemp = $scope.to.split("-");
        //     $scope.dateTo = new Date($scope.dateTemp[1] + '-' + $scope.dateTemp[2] + '-' + $scope.dateTemp[0]);
        //     // Change milliseconds to days
        //     $scope.days = parseInt(Math.abs($scope.dateFrom - $scope.dateTo) / 1000 / 60 / 60 / 24);
        //     return $scope.days;
        // };

        $scope.formatDate = function (date) {
            var y = date.getUTCFullYear();
            var m = date.getUTCMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getUTCDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        };

        $scope.dateDiff = function (from0, to0) {
            var dateTemp, dateFrom, dateTo, days, from, to;
            from = $scope.formatDate(from0);
            to = $scope.formatDate(to0);
            // from, to are format: 2018-01-01;
            dateTemp = from.split("-");
            dateFrom = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]);    // Change to format: 12-18-2017
            dateTemp = to.split("-");
            dateTo = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]);
            days = parseInt(Math.abs(dateFrom - dateTo) / 1000 / 60 / 60 / 24);    // Change milliseconds to days
            return days;
        };

        $scope.showWarn = function (showContent) {
            var alertPopup = $ionicPopup.alert({
                title: 'Note',
                template: showContent
            });
            alertPopup.then(function (res) {
                console.log('showContent');
            });
        };

        $scope.showNote = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Note',
                template: $scope.data.roomtype + ' room allows max ' + $scope.checknumber() + ' person(s).'
            });
            alertPopup.then(function (res) {
                console.log('group');
            });
        };

        $scope.showChooseRoom = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Note',
                template: 'Please choose a room type!'
            });
            alertPopup.then(function (res) {
                console.log('choose room type first');
            });
        };
        console.log("This is the HomeTabCtrl");
    })


    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.platform.android.tabs.position("bottom");
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state("tabs", {
                url: "/tab",
                templateUrl: "html/tabs.html",
                abstract: true
            })

            .state("tabs.home", {
                url: "/home",
                views: {
                    "home-tab": {
                        templateUrl: "html/home.html",
                        controller: "homeTabCtrl"
                    }
                }
            })

            .state("tabs.contact", {
                url: "/contact",
                views: {
                    "contact-tab": {
                        templateUrl: "html/contact.html",
                        controller: "contactTabCtrl"
                    }
                }
            })

            .state("tabs.about", {
                url: "/about",
                views: {
                    "about-tab": {
                        templateUrl: "html/about.html",
                        controller: "aboutTabCtrl"
                    }
                }
            })

            .state("tabs.list", {
                url: "/list",
                views: {
                    "home-tab": {
                        templateUrl: "html/list.html",
                        controller: "getCtrl"
                    }
                }
            })

            .state("tabs.detail", {
                url: "/home/:rID",
                views: {
                    "home-tab": {
                        templateUrl: "html/detail.html",
                        controller: "getCtrl"
                    }
                }
            })

            .state("tabs.confirm", {
                url: "/confirm",
                views: {
                    "home-tab": {
                        templateUrl: "html/confirm.html",
                        controller: "sendCtrl"
                    }
                }
            })
        $urlRouterProvider.otherwise("/tab/home");
    })


