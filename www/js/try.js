angular.module("demo", ["ionic", "ion-datetime-picker"])
    .run(function($rootScope){
        $rootScope.dateValue = new Date();
        $rootScope.timeValue = new Date();
        $rootScope.datetimeValue = new Date();

        $rootScope.go = function() {
            window.open("https://github.com/katemihalikova/ion-datetime-picker", "_blank");
        };
    });