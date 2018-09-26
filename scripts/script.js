var app = angular.module("myApp", ["ngRoute", "ngAnimate", "mrMr"]);

app.run(function ($rootScope, mesageService) {
    $rootScope.msg = mesageService.message(", Glasgow ");
});

app.config(function($routeProvider) {
    $routeProvider

    .when("/", {
        template : `
<header id='streetBandit' class='mrBox mrBounceIn'>
    <div class='streetOverlay'>
        <h1 class='aqui mrsRed mrH1 mrCenter mrMart2 mrNice'>
            Henriks Portfolio
        </h1>
    </div>
    <div>
        <div class='road'></div>
        <img class='streetLeft'
             alt='Street Left'
             src='media/images/StreetLeft.png'
        />
        <img class='streetRight'
             alt='Street Right'
             src='media/images/StreetRight.png'
        />
        <img class='himSelf'
             alt='Ham Selv'
             src='media/images/Himself.png'
        />
    </div>
</header>
    `,
    controller: "mainController"    
    })

    .when("/about", {
        template : `
<div class='mainBox'>
    <p class='mrCenter'>
        **** COMMODORE 64 BASIC V2 ****
    </p>
    <p class='mrCenter'>
        64K RAM SYSTEM 230481 BASIC BYTES FREE
    </p>
    <p>
        READY.
    </p>
    <div id='writeBox'></div>
    <div id='marker' ng-show='showMarker'></div>
</div>
                    `,
        controller : "aboutController"
    })

    .when("/curriculum", {
        template : `
<header id='topHeader'>
     <h2><span class='firstPart hide4Print'>Curriculum</span><span class='secondPart hide4Print'>Vitae</span></h2>
     <h2 id='smallBox' class='hide4Print'>CV</h2>
     <div id='searchBox' class='mrRight hide4Print'>
        <img id='printer' src='{{printer.Url}}' title='{{printer.Description}}' alt='{{printer.Description}}'/>
        <img id='flag' src='{{flags[0 + Language].Url}}' title='{{flags[0 + Language].Description}}' alt='{{flags[0 + Language].Description}}' ng-click='changeLanguage()' />
        <img id='searchBandit' src='{{spyglass.Url}}' title='{{spyglass.Description}}' alt='{{spyglass.Description}}' />
        <input id='searchField' class='input-md' type='text' ng-model='content' placeholder='Search'/>
     </div>
</header>
        `,
        controller : "cvController"
    })

    .when("/projects", {
        template : `

        `,
        controller : "projectController"
    })

    .when("/contact", {
        template : `

        `,
        controller : "projectController"
    })

});

app.controller("mainController", function ($scope, $rootScope) {

});

app.controller("aboutController", function ($scope, $rootScope, $interval) {
    $scope.showMarker = false; 
    $scope.showAndHideMarker = function() {
        $interval(function() {
            $scope.showMarker = !$scope.showMarker;
        }, 250);
    };
    $scope.showAndHideMarker();
});

app.controller("cvController", function ($scope, $rootScope) {
    $scope.msg = "I love London" + $rootScope.msg;
});

app.controller("projectController", function ($scope, $http, htmlService) {
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

app.controller("contactController", function ($scope, $rootScope) {

});

app.controller("locationController", function ($scope, $location, cssService) {
    $scope.getTitle = function() {
        if($location.path() === "/about") {
            return "Om Henrik";
        }
        else {
            return "Henriks Portfolio";
        }
    };
    $scope.getStyles = function () {
        return cssService.getStyles($location.path());
    };
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


app.service('cssService', function() {
    this.getStyles = function (loc) {
        if(loc === "/about") {
            return `
body {
    background: rgb(165,165,255);
}

#navigation {
    position: -webkit-sticky;
    position: sticky; 
    margin-top: -10vh;
    top: 0;
    text-align: center;
}

        #navigation ul li {
            display: inline-block;
            padding-left: 2vw;
        }
        
            #navigation ul li a {
                font-family: 'c64';
                font-size: 2rem;   
                text-decoration: none;
                color: rgb(165,165,255); 
            }
    


.mainBox { 
    font-family: 'c64'; 
    font-size: 2rem; 
    background: rgb(66,66,231); 
    width: 95vw; 
    min-height: 95vh; 
    color: rgb(165,165,255);
    padding: 5px 5px 5px 5px;
    margin: 20px auto 20px auto;
}

#marker {
    background:rgb(165,165,255); 
    height: 2rem;width: 1.7rem;
    margin-top: -1rem;
}

            `;
        }
        else if (loc === "/curriculum") {
            return `
body {
    background: url('media/images/cvbg.png') snow;
    background-size: 0.3%;
}

#navigation {
    color: GhostWhite;
    font-size: 22px;
    line-height: 0.25;
    font-weight: bold;
    letter-spacing: 0.1px;
    text-shadow: 1px 1px 0 black;
    text-align: center; 
    margin-top: 0vh;
    position: fixed; 
    top: 0;
    z-index: 100;
}

        #navigation ul li {
            display: inline-block;
            padding-left: 2vw;
        }
        
            #navigation ul li a {           
                text-decoration: none;              
            }
            `;
        }
        else if (loc === "/projects") {
            return `
body {
    background: GhostWhite url('media/images/textures/old-map.png');  
}

            `;
        }
        else if (loc === "/contact") {
            return `
body {
    background: BurlyWood url('media/images/textures/wood-pattern.png'); 
}            

            `;
        }
        else {
            return `
body {
background: url('media/images/Cloudy5.png') no-repeat center left, 
            url('media/images/Cloudy4.png') no-repeat center left, 
            url('media/images/Cloudy3.png') no-repeat center left, 
            url('media/images/Cloudy2.png') no-repeat center left, 
            url('media/images/Cloudy1.png') no-repeat center left,
            url('media/images/smurfyblue.png');
 -webkit-animation: backAndForth 45s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-delay: 2s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -webkit-animation-play-state: running;
    animation: backAndForth 30s;
 animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
background-attachment:fixed;
}


#navigation {
    text-align: center; 
    margin-top: -10vh;
    position: -webkit-sticky;
    position: sticky; 
    top: 0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8),
        -1px -1px 2px black,
        -1px 1px 2px black,
        1px -1px 2px black,
        0 1px #808d93,
        1px 0 #cdd2d5,
        1px 2px #808d93,
        2px 1px #cdd2d5,
        2px 3px #808d93,
        3px 2px #cdd2d5,
        3px 4px #808d93,
        4px 3px #cdd2d5,
        4px 5px #808d93,
        5px 4px #cdd2d5,
        5px 6px #808d93,
        6px 5px #cdd2d5,
        6px 7px #808d93;       
}

        #navigation ul li {
            display: inline-block;
            padding-left: 2vw;
        }
        
            #navigation ul li a {
                font-family: 'aqui';                
                text-decoration: none;
                color: gold;                
            }

            `;
        }
    };
});