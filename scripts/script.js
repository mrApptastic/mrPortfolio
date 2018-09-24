var app = angular.module("myApp", ["ngRoute", "ngAnimate", "mrMr"]);

app.run(function ($rootScope, mesageService) {
    $rootScope.msg = mesageService.message(", Glasgow ");
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        template : "<header id='streetBandit' class='mrBox mrBounceIn'>" +
"<div class='streetOverlay'>" +
"<h1 class='aqui mrsRed mrH1 mrCenter mrMart2 mrNice'>" +
"Henriks Portfolio" +
"</h1>" +
"</div>" +
"<div>" +
    "<div class='road'></div>" +
"<img class='streetLeft'" + 
     "alt='Street Left'" + 
     "src='media/images/StreetLeft.png'" + 
     "/>" +
"<img class='streetRight'" + 
     "alt='Street Right'" + 
     "src='media/images/StreetRight.png'" +  
     "/>" +
"<img class='himSelf'" + 
     "alt='Ham Selv'" + 
     "src='media/images/Himself.png'" + 
     "/>" +
"</div>" +
"</header>",
    controller: "mainController"    
    })
    .when("/london", {
        template : "<h2>Hello. {{msg}}</h2>",
        controller : "londonController"
    })
    .when("/paris", {
        template : "<h2>Hi there. <span ng-bind='msg'></span></h2><h1>Hide the DIV: <input type='checkbox' ng-model='myCheck'></h1><div ng-hide='myCheck' class='theDiv'></div>" +
		"<ul><li ng-repeat='p in persons' ng-bind='p.Name'></ul>",
        controller : "parisController"
    });
});

app.controller("mainController", function ($scope, $rootScope) {

});

app.controller("londonController", function ($scope, $rootScope) {
    $scope.msg = "I love London" + $rootScope.msg;
});

app.controller("parisController", function ($scope, $http, htmlService) {
    $scope.msg = "I love Paris" + htmlService.hello("<h1>Hej hej</h1>") +
	htmlService.getAll()
	        .then(function (result) {
				console.log(result);
                $scope.persons = result;
            })
            .catch(function (result) {
				console.log(result);
                alert("Totalt øv fejl!");
            });
});

app.controller("locationController", function ($scope, $location) {
    $scope.location = $location.path();
});

app.service('mesageService', function() {
    this.message = function (x) {
        return x + " and Berlin";
    }
});

app.service('htmlService', function($http) {
    this.getSite = function () {
        return $http.get("http://www.thorvejgaard.dk/test/friends.php")
            .then(function (result) {
                return result;
            })
            .catch(function (result) {
				console.log(result);
                alert("Totalt øv fejl!");
            });
    };
	this.getAll = function () {
        return $http.get("../Data/Projects/All.json")
            .then(function (result) {
                return result;
            })
            .catch(function (result) {
				console.log(result);
                alert("Totalt øv fejl!");
                //ErrorService.handleError(result);
            });
    };
	this.hello = function (license) {
        return license;
    };
});