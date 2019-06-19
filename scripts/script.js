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
<div class='mrCon75' style='padding-top: 120px;'>
     <div class='cvBox'>
          <div class='mrBox'>
               <div class='mr1.5'>
                    <img src='media/images/Me.png' alt='Henrik' title='Henrik'/>
                </div>
           <div class='mr3'>
                 <h2 class='cvSuperHeader'>{{stuff[0 + Language].Name}}</h2>
                 <h3 class='cvSecondaryHeader'>{{stuff[0 + Language].Title}}</h3>
                  <h4 class='cvTertiaryHeader'>{{stuff[0 + Language].Region}} | {{stuff[0 + Language].Branch}}</h4>
                  <table>
                       <tr>
                            <td class='cvLabel' ng-show='(0 + Language) == 1'>Current</td>
                            <td class='cvLabel' ng-show='(0 + Language) == 0'>Nuv&aelig;rende</td>
                            <td class='cvPar'>{{getCurrent()}}</td>
                       </tr>
                       <tr>
                            <td class='cvLabel' ng-show='(0 + Language) == 1'>Last</td>
                            <td class='cvLabel' ng-show='(0 + Language) == 0'>Forrige</td>
                            <td class='cvPar'>{{getJobs()}}</td>
                       </tr>
                       <tr>
                            <td class='cvLabel' ng-show='(0 + Language) == 1'>Education</td>
                            <td class='cvLabel' ng-show='(0 + Language) == 0'>Uddannelse</td>
                            <td class='cvPar'>{{getEducations()}}</td>
                       </tr>
                  </table>
                  
           </div>
          </div>
     </div>    
</div>
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

app.controller("cvController", function ($scope, $rootScope, cvService) {
    $scope.Language = 0;
    $scope.stuff = [
    {"Name" : "Henrik Beske", "Title" : "Softwareudvikler", "Region" : "Nordjylland, Danmark", "Branch" : "Software", "Headings" : [
    "Kort Beskrivelse",
    "Erfaring",
    "Kompetencer",
    "Uddannelse",
    "Projekter",
    "Certifikater",
    "Sprog",
    "Interesser",
    "Beskrivelse",
    "År",
    "Detailler",
    "Uddannelsessted",
    "Niveau",
    "Sted",
    "Periode",
    "Titel"
    ]},
    {"Name" : "Henrik Beske", "Title" : "Application Developer", "Region" : "Northern Jutland, Denmark", "Branch" : "Software", "Headings" : [
    "Short Description",
    "Experience",
    "Qualifications",
    "Education",
    "Projects",
    "Certificates",
    "Languages",
    "Interests",
    "Description",
    "Year",
    "Details",
    "Place of Education",
    "Skill Level",
    "Place",
    "Period",
    "Title"
    ]}
    ];
    $scope.cvText = cvService.getText();
    $scope.getCurrent = function () {
        var s = "";
        var ex = $scope.cvText[0 + $scope.Language].Experience;
        for (var i = 0; i < ex.length; i++) {
            if (ex[i].Active == true) {
                if (s.indexOf(ex[i].Place) == -1) {
                    s += ex[i].Place;   
                    s += ", ";      
                }
            }
        }
        return s.slice(0, s.length - 2);
    };
    $scope.getJobs = function () {
        var s = "";
        var ex = $scope.cvText[0 + $scope.Language].Experience;
        for (var i = 0; i < ex.length; i++) {
            if (ex[i].Active != true) {
                if (s.indexOf(ex[i].Place) == -1) {
                    s += ex[i].Place;   
                    s += ", ";      
                }                   
            }
        }
        return s.slice(0, s.length - 2);
    };
    $scope.getEducations = function () {
        var s = "";
        var ed = $scope.cvText[0 + $scope.Language].Education;
        for (var i = 0; i < ed.length; i++) {
                if (s.indexOf(ed[i].Place) == -1) {
                    s += ed[i].Place;   
                    s += ", ";      
                }   
        }
        return s.slice(0, s.length - 2);
    };
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
    margin-top: 20px;
    position: fixed; 
    top: 0;
    z-index: 100;
}

        #navigation ul li {
            display: inline-block;
            padding-left: 2vw;
        }
        
            #navigation ul li a {
                color: GhostWhite;         
                text-decoration: none;              
            }
            `;
        }
        else if (loc === "/projects") {
            return `
body {
    background: BurlyWood url('media/images/textures/wood-pattern.png');  
}

            `;
        }
        else if (loc === "/contact") {
            return `
body {
    background: GhostWhite url('media/images/textures/old-map.png'); 
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
margin: 0;
padding: 0;
overflow: hidden;
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
				position: relative;
				bottom: 30px;
            }

            `;
        }
    };
});

app.service('cvService', function() {
    this.getText = function () {
        return [{
        "Description": [{
                "Content": "Jeg er en kompetent softwareudvikler med en præference i retning af webudvikling samt udvikling til mobile enheder. Endvidere har jeg erfaring fra flere andre områder - såsom desktop applikationsudvikling, og udvikling til indlejrede enheder."
            },
            {
                "Content": "Desuden er jeg af den opfattelse, at jeg er en innovativ person med mange idéer. Jeg er en teknisk kompetent, dedikeret person, som bliver ved med at arbejde indtil arbejdet er gjort. Jeg arbejder fint både i grupper og individuelt. Kort sagt er jeg en type person, der ser muligheder fremfor barrierer foran mig."
            }
        ],
        "Experience": [{
                "Name": "Udvikler",
                "Place": "AutoPilot ApS",
                "Description": "Webudvikling til cloud-løsning.",
                "Started": 2016,
                "Ended": "",
                "Active": true,
                "Details": "Udvikler primært indenfor applikations- og webudvikling, men også indenfor anden softwareudvikling, grafisk design samt kommunikationsrelaterede opgaver. De førnævnte områder er alle nogle, jeg besidder betragtelige færdigheder indenfor.",
                "Icon": ""
            },
            {
                "Name": "Udvikler",
                "Place": "CodeCreator ApS",
                "Description": "Softwareudvikling for kunder på opgavebasis.",
                "Started": 2016,
                "Ended": "",
                "Active": true,
                "Details": "Udvikler primært indenfor applikations- og webudvikling, men også indenfor anden softwareudvikling, grafisk design samt kommunikationsrelaterede opgaver. De førnævnte områder er alle nogle, jeg besidder betragtelige færdigheder indenfor.",
                "Icon": ""
            },
            {
                "Name": "Applications, Software- og Webudvikler",
                "Place": "Freelancer",
                "Description": "Udvikler af websites, applikationer og kommunikationsmateriale på opgavebasis",
                "Started": 2015,
                "Ended": "",
                "Active": true,
                "Details": "Udvikler primært indenfor applikations- og webudvikling, men også indenfor anden softwareudvikling, grafisk design samt kommunikationsrelaterede opgaver. De førnævnte områder er alle nogle, jeg besidder betragtelige færdigheder indenfor.",
                "Icon": ""
            },
            {
                "Name": "Slagterimedarbejder",
                "Place": "Tulip Food Company",
                "Description": "Arbejdede hos Tulip Food Company, Svenstrup",
                "Started": 2008,
                "Ended": 2009,
                "Details": "Arbejdede indenfor forskellige områder på sliceriet, en afdeling for udskæring af pålæg.",
                "Icon": ""
            },
            {
                "Name": "Rengøringsassistent",
                "Place": "Jammerbugt Erhvervsrengøring",
                "Description": "Arbejdede hos Jammerbugt Erhvervsrengøring",
                "Started": 2007,
                "Ended": 2007,
                "Details": "Arbejdede i en kort periode som rengøringsassistent på Jensens Bøfhus.",
                "Icon": ""
            },
            {
                "Name": "Konstabel",
                "Place": "Hæren",
                "Description": "Arbejdede som konstabel i hæren.",
                "Started": 2005,
                "Ended": 2006,
                "Details": "Soldat hos sanitetsenhed ved Jyske Dragon Regiment i Holstebro. Jeg arbejdede som behandlerassistent på en pansret ambulance som en del af Nato Response Force 10.",
                "Icon": ""
            },
            {
                "Name": "Værnepligtig",
                "Place": "Hæren",
                "Description": "Aftjente værnepligt.",
                "Started": 2000,
                "Ended": 2001,
                "Details": "Panserinfanterist hos Gardehusarregimentet i Slagelse. Tjente som let maskingeværsskytte i en infanterienhed og deltog i Nato-øvelsen Strong Resolve i Drawsko Pomorskie, Polen.",
                "Icon": ""
            }
        ],
        "Projects": [{
                "Name": "Website, Grafisk Arbejde og Kommunikation",
                "Place": "Brydeklubben Thor",
                "Description": "<p>Jeg har som frivillig leder i Brydeklubben Thor nyudviklet og opgraderet et website med custom PHP back-end med bl.a. krypteret brugersystem, medlemsregisteringssystem, resultdatabase og dokumenteksport. Endvidere har jeg stået for pressekommunikation samt udviklet grafiske materialer; herunder et 100 års jubilæumsskrift.</p><p><a target='_blank' href='http://www.thorvejgaard.dk/'>Se Website</a></p><p><a target='_blank' href='http://www.thorvejgaard.dk/skrift/thorjubi2016.pdf'>Se Jubilæumsskrift</a></p>",
                "Started": 2005,
                "Ended": "",
                "Active": true,
                "Details": "",
                "Icon": ""
            },
            {
                "Name": "Website",
                "Place": "Maxi Grill",
                "Description": "<p>Website udviklet som freelanceprojekt i Umbraco. Jeg har udviklet og designet fronten fra bunden og implementeret Umbraco til nem opdatering af oplysninger som menukort m.v.</p><p><a target='_blank' href='http://www.maxigrill.dk/'>Se Website</a></p>",
                "Started": 2015,
                "Ended": 2018,
                "Active": true,
                "Details": "",
                "Icon": ""
            },
            {
                "Name": "Cloud løsning for AutoPilot",
                "Place": "AutoPilot ApS",
                "Description": "<p>Et timesagsstyringsprogram med mange og store kunder indenfor arkitekt- og ingeniørbranchen. Består af en desktopapplikation, der har små 20 år på bagen samt en cloud løsning. Jeg har udelukkende arbejdet på sidstnævnte, der er en kombination af scheduled services, der for den enkelte kunde kan afvikles efter et individuelt tidsskema samt et sæt af web applikationer. Den er udviklet i ASP.NET og Microsoft AZURE og fronten består overvejende af HTML5-webapplikationer. Jeg har udviklet på følgende applikationer:</p><p><ul><li>Manage Site: Tilføjet samt tilrettet diverse CRUD til community database.</li><li>Upload Site: Omskrivning af front fra DurandalJS til AngularJS.</li><li>Login Site: Implementering af to-faktor login-system samt bug ixes.</li><li>Behovsliste: Omskrivning af Windows Forms applikation til AngularJS-applikation med ASP-Net MVC back-end samt re-mapping og overførsel af data.</li><li>Project Site, Integration Site, Company Site og Concern Site: Implementering af grafer. Oprydning, bugfixes samt implementering af delte directives, filters og services.</li></ul></p><p><a target='_blank' href='https://autopilot.dk/produktet/'>Mere om produktet (desktopapplikationen)</a></p>",
                "Started": 2016,
                "Ended": "",
                "Active": true,
                "Details": "",
                "Icon": ""
            },
            {
                "Name": "Applikation og Website til beregning af fordelingsregnskaber",
                "Place": "Casi Technology A/S",
                "Description": "<p>Applikation og Website til beregning af fordelingsregnskaber. Udviklet Windows Forms desktopapplikation til generering af fordelingsregnskaber for boligforeninger o.l. samt Web Forms Applikation til visning og generering af fordelingsregnskaber:</p><p><ul><li>Lagring af versioner af regnskaber.</li><li>Visning af rapporter på web samt sikkerhed her.</li><li>Debugging og rettelser til beregningsrutiner.</li><li>Design samt rettelser til telerik reporting items vedr. f.eks. skønsberegning.</li><li>Implementering af rapportgenerering, skøn samt grafisk visning af målerdata på website.</li><li>Implementeret acontoindlæsning fra bl.a. textfiler og excel-ark på webløsning.</li><li>Rettet i konsolapplikation til automatiseret indlæsning af data fra zip-filer og xml-filer.</li><li>Indlæsningsrutine til datafiler fra temperatur- og fugtmålere samt grafisk visning af data på webside.</li></p></ul><p><a target='_blank' href='http://www.casi.dk/casi-web-beboer/'>Om webapplikationen</a></p>",
                "Started": 2016,
                "Ended": 2018,
                "Active": true,
                "Details": "",
                "Icon": ""
            },
            {
                "Name": "EU Socialfondsprojekt",
                "Place": "AMU Nordjylland",
                "Description": "<p>MVC Applikation med en AngularJS front app udviklet til projektstyring af et EU Socialfondsprojekt. Jeg har udført rettelser i front, implementering af CRUD samt bug fixes.</p>",
                "Started": 2017,
                "Ended": 2017,
                "Active": true,
                "Details": "",
                "Icon": ""
            },
            {
                "Name": "Mentorrolle",
                "Place": "CodeCreator ApS",
                "Description": "<p>Mentor for samt oplæring af ung mand med Asbergers syndrom.</p>",
                "Started": 2017,
                "Ended": "",
                "Active": true,
                "Details": "",
                "Icon": ""
            },
            {
                "Name": "Turabs Online",
                "Place": "Dong Energy",
                "Description": "<p>En web forms applikation skrevet i ASP (Classic) med det formål at overvåge og indsamle statistik fra 4 kraftvarmeværker i Syddanmark. Jeg har foretaget designændringer i forbindelse med navneskriftet til Orsted.</p>",
                "Started": 2017,
                "Ended": 2017,
                "Active": true,
                "Details": "",
                "Icon": ""
            },
            {
                "Name": "Sundhed og Træning SÅ LETTER VI",
                "Place": "Mariager Fjord Kommune",
                "Description": "<p>MVC-applikation med AngularJS front, som er udviklet til projektet SÅ LETTER VI, der er et tilbud i Mariager Fjord Kommune for overvægtige børn og unge. Jeg har implementeret grafer, statistik, data export, CRUD samt anomymisering af data på denne applikation.</p>",
                "Started": 2018,
                "Ended": 2018,
                "Active": true,
                "Details": "",
                "Icon": ""
            },
            {
                "Name": "Opdatering af website",
                "Place": "AKU Aalborg",
                "Description": "<p>Umbraco-website for kollegielejligheds-udlejningsfond. Har foretaget implementering af MapKit (Google Maps plug-in) og samt cookie advarsel.</p><a target='_blank' href='http://www.aku-aalborg.dk/'>Se websitet</a></p>",
                "Started": 2017,
                "Ended": 2017,
                "Active": true,
                "Details": "",
                "Icon": ""
            },
            {
                "Name": "Booking System",
                "Place": "Vos ApS",
                "Description": "<p>Specielt udviklet booking system for virksomhed, der opretter og sælger rejsepakker til udenlandske rejsebureauer. Det er udviklet i MVC med AngularJS front, og jeg har deltaget i følgende:</p><p><ul><li>Søgning samt export af statistik.</li><li>Automatisering af booking og beskeder til samarbejdspartnere.</li><li>Optimering af informationer til medarbejdere på bl.a. dashboard.</li></ul></p>",
                "Started": 2018,
                "Ended": "",
                "Active": true,
                "Details": "",
                "Icon": ""
            }
        ],
        "Qualifications": [{
                "Id": 0,
                "Name": "CSS3",
                "Description": "Cascading Style Sheets (CSS) er en simpel mekanisme til at tilføje udseende (f.eks. skrifttyper, farver og linieafstand) til websites.",
                "Experience": "Jeg har erhvervet et stort kendskab til CSS; herunder grundlæggende styling af tekster og elementer, placering og transformation af elementer, media queries og keyframe animationer",
                "Versions": "3.0, 2.1",
                "Icon": ""
            },
            {
                "Id": 1,
                "Name": "HTML 5",
                "Description": "Den 5. større revision af internettets kernesprog: Hypertext Markup Language (HTML).",
                "Experience": "Omend ikke professionelt har jeg arbejdet med HTML siden dengang, hvor layouts til websider blev placeret i tabeller, og alt blev gjort inline. Så jeg føler, at jeg har stor erfaring med HTML.",
                "Versions": "HTML 5, XHTML",
                "Icon": ""
            },
            {
                "Id": 2,
                "Name": "Umbraco",
                "Description": "Umbraco er et open source content management system baseret på ASP.NET",
                "Experience": "Jeg har brugt Umbraco til opbygning små, simple websider med Razor scripts, og generelt finder jeg det let at bygge websider med Umbraco CMS-Systemet.",
                "Versions": "7.16, 6.2.4, 6.1.2",
                "Icon": ""
            },
            {
                "Id": 3,
                "Name": "Webudvikling",
                "Description": "Webudvikling er en bred betegnelse for arbejde vedrørende udvikling af websites. Begrebet kan spænde fra udviklingen af den simpleste, statiske side til de mest komplekse web-baserede internetapplikationer, webshops og sociale netværkstjenester.",
                "Experience": "Jeg har udviklet applikationer til web og mobile enheder i flere år. Det er min personlige opfattelse, at jeg er en meget dygtig webudvikler i stand til at skabe spændende brugergrænseflader ved hjælp HTML5, CSS3 og JavaScript. Jeg er også en dygtig back-endudvikler med både PHP og C#-erfaring.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 4,
                "Name": "jQuery",
                "Description": "jQuery er et hurtigt, lille, og indholdsrigt JavaScript-bibliotek .",
                "Experience": "Jeg har mest brugt jQuery i tilfælde, hvor det var lettere at anvende end at skrive de ønskede scripts selv, og mine evner er betragtelige i forbindelse med anvendelsen af denne kodeudvidelse.",
                "Versions": "1.11.1,Mobile 1.4.3",
                "Icon": ""
            },
            {
                "Id": 5,
                "Name": "PHP",
                "Description": "Et server-side, typesvagt, HTML-indlejret programmeringssprog.",
                "Experience": "Jeg har brugt PHP i næsten et årti nu - omend mest i forbindelse med PHP-baserede CMS-systemer, når jeg havde brug for noget ud over det sædvanlige . Jeg er både i stand til at skabe avancerede scripts fra bunden samt ændre eksisterende kode til forskellige formål.",
                "Versions": "5.6, 5.5, 5.2, 5.1",
                "Icon": ""
            },
            {
                "Id": 6,
                "Name": "JavaScript",
                "Description": "JavaScript er et højniveau, dynamisk, typesvagt programmeringssprog. Det understøttes af alle moderne webbrowsere.",
                "Experience": "I øjeblikket mit favorit-programmeringssprog - mest fordi jeg elsker at udvikle til webbrowsere. Desuden mener jeg, HTML 5-applikationer er fremtiden, fordi mange enheder er og flere vil være i stand til at køre dem på sigt. Jeg er i stand til at skabe et væld af forskellige applikationer med JavaScript og forstå mange af funktionaliteterne i de moderne webbrowsere. Mine færdigheder omfatter dynamisk datavisualisering, HTML 5 Canvas, Google Maps API, AJAX, AngularJS og jQuery/jQuery Mobile.",
                "Versions": "EMCA 6, 5.1, 3",
                "Icon": ""
            },
            {
                "Id": 7,
                "Name": "CMS",
                "Description": "Et CMS-system er et computerprogram, der giver mulighed for udgivelse, redigering, ændring, organisering, sletning samt vedligeholdelse af indhold fra et centralt interface. Et CMS-system anvendes ofte til at køre websteder med blogs, nyheder, e-handel eller lignende.",
                "Experience": "Jeg har en rimelig viden om moderne CMS-systemer; herunder Umbraco, Joomla og PHP Fusion. Desuden er jeg i stand til at skabe mine egne sikre CMS-systemer fra bunden af samt at tilpasse eksisterende.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 8,
                "Name": "Frontend",
                "Description": "Frontendudvikling, også kendt som udvikling til klientsiden, er en praksis, der går ud på at producere HTML, CSS og JavaScript for et websted eller webapplikation, således en bruger kan se og interagere med det direkte.",
                "Experience": "Som jeg ser det, er jeg en meget dygtig frontendudvikler i stand til at skabe et væld af brugervenlige funktionaliteter på klientsiden af et website. Mine færdigheder omfatter dynamisk datavisualisering, HTML 5 Canvas, Google Maps API, AJAX, AngularJS og jQuery/jQuery Mobile.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 9,
                "Name": "SEO",
                "Description": "Søgemaskineoptimering er en gruppe af strategier, teknikker og taktikker, der anvendes til at øge mængden af ​​besøgende på et website ved at opnå en høj placering i søgeresultaterne hos en af en søgemaskine (f.eks. Google).",
                "Experience": "Generelt har jeg en god forståelse af søgemaskineoptimering, som omfatter SEO-venligt design, metatags, sitemaps, fejlsider og Google Analytics/Console.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 10,
                "Name": "MySQL",
                "Description": "Populært open source SQL-databasestyringssystem .",
                "Experience": "Oftest har jeg arbejdet med MySQL i PHP-baserede webprojekter, og jeg føler mig tryg ved at bruge alle former for relationsdatabaser samt SQL-Queries.",
                "Versions": "5.5, 5.6, 5.7",
                "Icon": ""
            },
            {
                "Id": 11,
                "Name": "Webdesign",
                "Description": "Webdesign omfatter mange forskellige færdigheder og discipliner indenfor produktion og vedligeholdelse af websider.",
                "Experience": "Jeg er en dygtig webdesigner i stand til at skabe og tilpasse mange former for designs; herunder moderne flat, bootstrap designs med forskellige scroll effekter samt særlige designs med f.eks. HTML 5 Canvas, forskellige CSS-effekter, animationer eller billeder, der tiler.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 12,
                "Name": "Webstandarder",
                "Description": "Webstandarder er de formelle, ikke-proprietære standarder samt andre tekniske specifikationer, der definerer og beskriver aspekter af internettet.",
                "Experience": "Som en dedikeret webudvikler tilstræber jeg altid at holde trit med W3Cs standarder, da de tegner nutiden såvel som fremtiden for moderne webbrowsere.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 13,
                "Name": "AJAX",
                "Description": "AJAX er et sæt af webudviklingsteknikker, der anvender adskillige teknologier på klientsiden til at skabe asynkrone webapplikationer. Med AJAX-webapplikationer kan man sende data til og hente data fra en server uden at ændre sidens udseende eller adfærden på klientens webside.",
                "Experience": "Jeg er rimeligt kompetent i forbindelse med anvendelsen af AJAX-teknikker, både ved brug af JavaScript, jQuery, AngularJS og Knockout.js.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 14,
                "Name": "ASP.NET",
                "Description": "ASP.NET er en samlet webudviklingsplatform, der omfatter tjenester til opbygning af webapplikationer til forretningsbrug med et minimum af kodning. ASP.NET er en del af .NET Framework, og igennem udvikling af ASP.NET-applikationer, har man også adgang til klasserne i .NET Framework.",
                "Experience": "Jeg er kompetent inden for de seneste generationer af ASP.NET applikationer; herunder ASP.NET MVC, Razor webpages og Web Forms.",
                "Versions": "4.6, 4.5, 4.0, 3.5",
                "Icon": ""
            },
            {
                "Id": 15,
                "Name": "C#",
                "Description": "C# er et typestærkt, objektorienteret programmeringsprog, der gør det muligt for udviklere at bygge en lang række applikationer, der kører på .NET-platformen.",
                "Experience": "Jeg er i stand til at anvende C# til forskellige formål, herunder desktop applikationer og websider.",
                "Versions": "4, 3",
                "Icon": ""
            },
            {
                "Id": 16,
                "Name": "OOP",
                "Description": "Objektorienteret programmering er et programmeringsmønster organiseret omkring objekter fremfor handlinger og data i højere grad end logik.",
                "Experience": "Jeg har erfaring med dette workflow fra udvikling af Java- og C#-projekter samt arbejde med Den Forende Proces (UP) og UML2 til analyse og design.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 17,
                "Name": "Programmering",
                "Description": "Programmering er en proces, der går ud på at udvikle og implementere forskellige nstruktionssæt, der får en computer til at udføre en bestemt opgave ",
                "Experience": "Jeg er i stand til at skabe software med flere højniveau programmeringssprog som f.eks. Java, C#, PHP, C og JavaScript. Desuden har jeg en god forståelse af binære data og datakommunikation.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 18,
                "Name": "Visual Studio",
                "Description": "Visual Studio er en omfattende samling af udviklingsværktøjer og tjenester til .NET-platformen m.v.",
                "Experience": "Jeg har anvendt Visual Studio til flere formål, som inkluderer Windows Forms, websites og konsolapplikationer, og jeg føles mig tilpas med at arbejde med dets debugger .",
                "Versions": "2013, 2010, 2007",
                "Icon": ""
            },
            {
                "Id": 19,
                "Name": "Webapplikationer",
                "Description": "En webapplikation er et stykke klient-/server-software, hvori klienten kører i en webbrowser.",
                "Experience": "Jeg har på nuværende tidspunkt udviklet flere web-apps og hybride apps, der kører på mine Androidenheder ved hjælp af HTML, CSS, JavaScript, Java og XML. For nuværende er mine bedste applikationer nok min babyalarms-applikation og min Location Manager.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 20,
                "Name": "Databasedesign",
                "Description": "Databasedesign er en bred betegnelse, der indeholder flere fremgangsmåder til fremstilling af en detaljeret datamodel af en database.",
                "Experience": "Jeg har en rimelig erfaring med at designe relationsdatabaser af alle slags og er desudsen af den opfattelse, ​​at jeg ved hvad der er et godt design.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 21,
                "Name": "Usability",
                "Description": "Usability (også kaldet brugervenlighed) dækker over letheden med hvilken et menneskeskabt system kan anvendes samt tillæres. ISO har standardiseret usability til kerneområder: Tillæring, Effektivitet, Memorabilitet, Fejl og Tilfredshed.",
                "Experience": "I min tid på universitetet lærte jeg problembaserede metoder, og jeg er god til at analysere data fra både interviews og spørgeskemaer. Jeg kan lave en analyse af et systems brugervenlighed når som helst.",
                "Versions": "ISO 9241",
                "Icon": ""
            },
            {
                "Id": 22,
                "Name": "GUI Design",
                "Description": "I datalogiens verden er en grafisk brugergrænseflade et interface, der giver brugerne mulighed for at interagere med elektroniske enheder ",
                "Experience": "På nuværende tidspunkt har jeg desginet adskillige grafiske brugergrænseflader til både desktopapplikationer og websites. I den forbindelse er det min fornemmelse, at jeg har en god forståelse af hvad der er vigtigt, og hvad der ikke er.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 23,
                "Name": "Microsoft SQL Server",
                "Description": "MS SQL Server er et relatiosdatabasestyringssystem udviklet af Microsoft.",
                "Experience": "Generelt har jeg en god forståelse af SQL-databaser, og jeg er i stand til at designe dem ved hjælp af Entity Framework såvel som T-SQL.",
                "Versions": "2014, 2012, 2008 R2",
                "Icon": ""
            },
            {
                "Id": 24,
                "Name": "XML",
                "Description": "XML er en enkelt, meget fleksibelt tekstformat. Oprindeligt blev det designet til at imødekomme de udfordringer, som store mængder af elektronisk publicering medførte, men i dag spiller XML en stadigt større rolle i forbindelse med udvekslingen af en lang række data på internettet og andre steder.",
                "Experience": "Jeg har både erfaring med XML som et datasprog i forbindelse med desktopapplikationer og websites, og som et GUI- Markup-sprog. med Android-enheder.",
                "Versions": "1.1, 1.0",
                "Icon": ""
            },
            {
                "Id": 25,
                "Name": "Adobe Photoshop",
                "Description": "Adobe Photoshop er et udviklingsprogram til rastergrafik, som er udviklet og udgivet af Adobe Systems. Det kan redigere og skabe rasterbilleder i flere lag og understøtter masker, alphakanaler samt flere farvemodeller; herunder RGB, CMYK, Lab Color Space, Spot Color og Duotone. Photoshop understøtter mange forskellige filformater.",
                "Experience": "Jeg er i stand til de fleste nyttige ting i Photoshop, så som basis retouschering og reparation af billeder og fritlægning med pen tool. Desuden arbejder jeg ikke-destruktivt med lagmasker.",
                "Versions": "CC, CS6, CS5",
                "Icon": ""
            },
            {
                "Id": 26,
                "Name": "Adobe Illustrator",
                "Description": "Adobe Illustrator er et vektorgrafikudviklingsprogram, der kan bruges til at skabe digital grafik, illustrationer og typografi til alle former for medier: print, web, interaktive medier, video samt mobile enheder.",
                "Experience": "Mine frihåndstegningsfærdigheder er rimelige, og jeg mener, at ​​jeg er ganske god til at skabe grafik til web og Canvas ved hjælp af vektorudviklingsværktøjer som f.eks. Adobe Illustrator. Desuden er jeg god til at rentegne billeder ved hjælp af pen tool.",
                "Versions": "CC, CS6, CS5",
                "Icon": ""
            },
            {
                "Id": 27,
                "Name": "Adobe InDesign",
                "Description": "Adobe InDesign er et publiceringsprogram produceret af Adobe Systems. Det kan bruges til at skabe f.eks. plakater, flyers, brochurer, magasiner, aviser og bøger.",
                "Experience": "Jeg har lavet en en del flyers, plakater og brochurer til private formål, og er af den opfattelse, ​​at jeg er ret god til det.",
                "Versions": "CC, CS6, CS5",
                "Icon": ""
            },
            {
                "Id": 28,
                "Name": "Java",
                "Description": "Java er et programmeringssprog og en softwareplatform, som oprindeligt blev udviklet af Sun Microsystems og i dag udvikles af Oracle Corporation. Java er et objektorienteret programmeringsprog, som er specielt designet til at have så få implementeringsafhængigheder som muligt.",
                "Experience": "Jeg begyndte at udvikle Java for et par år siden, da Android var en temmelig ny platform. Jeg har lavet nogle applets, desktopapplikationer samt enkelte Android-applikationer. De mest avancerede er nok en FFT-baseret babyalarms-applikation samt en Location Manager.",
                "Versions": "SE 7 (Dolphin), SE 6 (Mustang), SE 5 (Tiger)",
                "Icon": ""
            },
            {
                "Id": 29,
                "Name": "OOAD",
                "Description": "Objektorienteret analyse og design (OOAD) er en populær teknisk tilgang til analyse, design, implementering og test af kildekode til forskellige formål. OOAD gennemføres på en iterativ måde som formuleret i Den Forende Proces (UP).",
                "Experience": "Jeg har brugt UML og den iterative arbejdstilgang fra UP i et stykke tid nu, og tidligere også struktureret programudvikling og -dokumentation.",
                "Versions": "UML 2",
                "Icon": ""
            },
            {
                "Id": 30,
                "Name": "Android",
                "Description": "Softwareplatform udviklet af Google, der er baseret på Linux-kernen og designet til forskellige touchscreen-enheder .",
                "Experience": "Jeg har fiflet med Android-platformen siden v. 1.6 (Donut), og har både arbejdet med GUI og hardware; herunder GPS, lyd og telefontjenester. Jeg er en kompetent javaprogrammør, har en god forståelse af Androids XML, og jeg er i stand til at bygge både native apps, hybride apps og samt webapplikationer. På nuværende tidspunkt er mine mest fremtrædende apps min babyalarm-applikation og min Location Manager.",
                "Versions": "4.4 (KitKat), 4.2 (Jelly Bean), 2.2 (Froyo), 1.6 (Donut)",
                "Icon": ""
            },
            {
                "Id": 31,
                "Name": "Microsoft Office",
                "Description": "Microsoft Office er en kontorpakke, udviklet af Microsoft, bestående af applikationer, server-software samt andre tjenester.",
                "Experience": "Jeg har arbejdet med flere forskellige programmer til skrivning, beregning, præsentation og lignende. Jeg er meget dygtig indenfor alle aspekter af MS Office.",
                "Versions": "2013, 2010, 2007, 2003",
                "Icon": ""
            },
            {
                "Id": 32,
                "Name": "AngularJS",
                "Description": "Superheroisk open source JavaScript-udvidelse udviklet og vedligeholdt af Google. Angular tilpasser og udvider den traditionelle HTML til at fremstille dynamisk indhold gennem tovejsdatabinding, der giver mulighed for automatisk synkronisering mellem datamodeller og views.",
                "Experience": "Efterhånden har jeg opnået stor erfaring med Angular og befinder mig godt med at udvikle med det, og jeg ved både en del om hvad, der en en god idé at gøre samt ikke at gøre, når man arbejder med Angular. Det er min personlige mening, at tovejsdatabindingen er revolutionerende indenfor applikationsudvikling, da den sparer masser af kode, hvilket både hurtiggør udviklingen og giver en udvikler muligheden for at skabe noget større end ellers muligt. Mine evner indenfor AngularJS omfatter routing, animationer og brugerdefinerede filtre.",
                "Versions": "1.48, 1.229",
                "Icon": ""
            },
            {
                "Id": 33,
                "Name": "Google Maps API",
                "Description": "Google Maps API giver mulighed for indlejring af Google Maps på websider ved hjælp af et simpelt JavaScript-interface eller et Flash-interface. Det er designet til at fungere på både mobile enheder og i traditionelle browserapplikationer.",
                "Experience": "Jeg har en rimelig erfaring med denne JavaScript-udvidelse med flere succesfulde implementeringer bag mig. Den bedste er nok min Location Manager, hvis klientapplikation er i stand til dynamisk at tegne ruter, etiketter og diagrammer alt efter hvilke GPS-data, der er logget og hvilke søgninger, der er indtastet.",
                "Versions": "3.23, 3.22, 3.21, 3.19",
                "Icon": ""
            },
            {
                "Id": 34,
                "Name": "RESTful Webtjenester",
                "Description": "RESTful Webtjenester  kommunikerer typisk via Hypertext Transfer Protocol (HTTP) med de samme HTTP-funktioner (GET, POST, PUT, DELETE, etc.), som webbrowsere bruger til at hente websider og til at sende data til eksterne servere.",
                "Experience": "Jeg kender det grundlæggende i RESTful Web Services og ved hvordan man bruger dem.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 35,
                "Name": "Google Search Console",
                "Description": "En webservice fra Google for webmastere. Den giver mulighed for at kontrollere indekseringsstatus og optimere synligheden af et website.",
                "Experience": "Jeg har rimelig erfaring med denne service, og jeg ved hvordan man bruger den til søgemaskineoptimering (SEO).",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 36,
                "Name": "WebMatrix",
                "Description": "Microsoft WebMatrix er et gratis, Windows-baseret, cloud-hosted program til webudvikling.",
                "Experience": "Jeg kender dette IDE ganske godt, og jeg har begge brugt det til Umbraco, ASP.NET og PHP-webapplikationer.",
                "Versions": "3.0",
                "Icon": ""
            },
            {
                "Id": 37,
                "Name": "Google Analytics",
                "Description": "Google Analytics er en webanalyse-service fra Google, der sporer og rapporterer om trafikken på et website.",
                "Experience": "Jeg har rimelig erfaring med denne service, og jeg ved hvordan man bruger den til søgemaskineoptimering (SEO).",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 38,
                "Name": "JSON",
                "Description": "JSON er et letvægts-dataudvekslingsformat. Det er let for mennesker at læse og skrive, og det er nemt for maskiner at analysere og generere. Det er baseret på en standard af JavaScript, ECMA - 262 3. Udgave.",
                "Experience": "Jeg arbejder godt med JSON og har ingen problemer med at arbejde med bl.a. dybt indlejrede data eller for den sags skyld en syntaks, der afviger fra den gængse.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 39,
                "Name": "Bootstrap",
                "Description": "Bootstrap er et open source kodebibliotek til websider og webapplikationer. Det indeholder HTML- og CSS-baserede designskabeloner til typografi, formularer, knapper, navigation og andre interfacekomponenter, samt valgfrie JavaScript-udvidelser.",
                "Experience": "Jeg arbejder rimeligt godt med dette front-end framework, hvis kolonnebaserede layout er blevet en naturlighed for mig, når jeg udvikler. Jeg ved hvordan man bruger det korrekt, er i stand til at bruge de fleste af dets funktionaliteter, og så kan jeg også finde ud af at få Bootstrap til ikke at ligne Bootstrap...",
                "Versions": "3:36, 3.35, 3.34, 3.32, 3.31, 3.30, 3.20",
                "Icon": ""
            },
            {
                "Id": 40,
                "Name": "Entity Framework",
                "Description": "Entity Framework (EF) er en objekt-relationel mapper, der gør det muligt for .NET-udviklere at arbejde med relationelle data ved hjælp af domænespecifikke objekter.",
                "Experience": "Jeg har arbejdet med Entity Framework i ASP.NET-baserede web-systemer, og det passer mig godt.",
                "Versions": "6.12, 6.11, 6.02",
                "Icon": ""
            },
            {
                "Id": 41,
                "Name": "Digital Signalbehandling",
                "Description": "Digital signalbehandling (DSP) er en numerisk manipulation af signaler, som regel med den hensigt at måle, filtrere, producere eller komprimere kontinuerlige analoge signaler.",
                "Experience": "Jeg har designet både IIR- og FIR-filtre, der kørte på PIC-mikroprocessorer ved hjælp af Z-transformation. Desuden har jeg brugt FFT-algoritmen til lydanalyse i i forbindelse med min Babyalarmapplikation til Android.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 42,
                "Name": "Indlejrede Systemer",
                "Description": "Et indlejret system er et computersystem med en dedikeret funktion i et større mekanisk eller elektrisk system. Det er indlejret som en del af en komplet enhed, herunder ofte  hardware og mekaniske dele.",
                "Experience": "Jeg har arbejdet med flere PIC-processorer fra Microchip og implementeret C-kode til forskellige projekter; herunder en reaktionstidstester, en GPS-baseret køreskive og et overvågningssystem.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 43,
                "Name": "VHDL",
                "Description": "VHDL (Very High Speed Hardware Description Language) er et hardwarebeskrivelsessprog, der anvendes indenfor elektronisk designautomation til at beskrive digitale og mixed-signal systemer såsom Field-Programmable Gate Arrays og integrerede kredsløb.",
                "Experience": "Som studerende jeg brugte VHDL for flere projekter, herunder en multiplexer og en videokonverter implementeret på en Spartan 3E-board.",
                "Versions": "VHDL 1076-2002",
                "Icon": ""
            },
            {
                "Id": 44,
                "Name": "Eclipse",
                "Description": "Eclipse er en IDE, som indeholder et workspace med et omfattende plug-in-system til at tilpasse det. Eclipse er primært skrevet i Java og det er primært beregnet til at udvikle Java-programmer, men det kan også bruges til at udvikle applikationer i andre programmeringssprog.",
                "Experience": "I årevis efterhånden har Eclipse været min primære IDE til Java- og Android-projekter.",
                "Versions": "Juno, Indigo, Gallileo",
                "Icon": ""
            },
            {
                "Id": 45,
                "Name": "Xilinx",
                "Description": "Xilinx ISE er et udviklingsoftware produceret af Xilinx til udvikling og analyse af HDL-designs, der gør det muligt for en udvikler at samle designet, udføre timingsanalyse, se RTL-diagrammer, simulere et designs reaktion på forskellige stimuli, og konfigurere enheden.",
                "Experience": "Jeg har brugt Xilinx ISE til FPGA-udvikling i VHDL samt fejlfinding og simulation.",
                "Versions": "ISE 11.1, 10.1",
                "Icon": ""
            },
            {
                "Id": 46,
                "Name": "FPGA",
                "Description": "Et Field-Programmable Gate Array (FPGA) er et integreret kredsløb beregnet til at blive konfigureret efter dets fremstilling. FPGA-konfiguration bliver generelt foretaget med et hardwarebeskrivelsessprog (HDL) tilsvarende dem, der anvendes til  applikationsspecifikke integrerede kredsløb (ASICs).",
                "Experience": "Jeg har en god forståelse af arbejde med FPGAer med VHDL eller C-kode. Da jeg var studerende lavede jeg en multiplexer til et syvsegmentsdisplay og en videokonverter til et overvågningssystem, som blev implementeret på et Spartan 3E-Board.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 47,
                "Name": "Analog Kredsløbsdesign",
                "Description": "Analog elektronik er elektroniske systemer med variable signaler i modsætning til digital elektronik, hvor signalerne normalt kun antager to niveauer (0 og 1). Udtrykket analog beskriver det proportionale forhold mellem signal og en spænding eller strøm, der repræsenterer signalet.",
                "Experience": "Jeg kender det grundlæggende indenfor både analog og digital elektronik og har designet flere elektroniske systemer, mens jeg var studerende.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 48,
                "Name": "Joomla",
                "Description": "Joomla er et gratis, open source CMS-system til udgivelse af webindhold. Det bygger på et Model-View-Controller-framework (MVC), der kan anvendes uafhængigt af CMS-systemet.",
                "Experience": "Jeg ved hvordan man implementerer websider ved hjælp af Joomla CMS-systemet, samt hvordan man tilpasser det.",
                "Versions": "3.4, 3.3, 1.7",
                "Icon": ""
            },
            {
                "Id": 49,
                "Name": "OrCAD",
                "Description": "OrCAD er en softwareværktøjspakke, der primært anvendes til elektronisk designautomatisering. Softwaren bruges primært til at skabe elektroniske diagrammer og elektroniske udskrifter til fremstilling af printplader.",
                "Experience": "Jeg har både beregnet, planlagt og simuleret elektroniske kredsløb og printplader (PCB) med denne software.",
                "Versions": "16.0, 10.5",
                "Icon": ""
            },
            {
                "Id": 50,
                "Name": "Linux",
                "Description": "Linux er et operativsystem, der fungerer under open source-softwareudviklingsmodellen. Den definerende i komponent Linux er Linux-kernen, en operativsystemskerne, der oprindeligt blev udgivet den 5. oktober 1991 af Linus Torvalds.",
                "Experience": "Jeg ved hvordan man bruger Linux-baserede systemer samt det grundlæggende om Linux-kernen.",
                "Versions": "Pinguy OS 14.04.3, Puppy 6, 5, Ubunto 16.04 (Xenial Xerus), 14.10 (Utopic Unicorn)",
                "Icon": ""
            },
            {
                "Id": 51,
                "Name": "C",
                "Description": "C er et uafhængigt, hierarkisk computerprogrammeringssprog",
                "Experience": "Min ANSI-C er rimeligt - selvom jeg for det meste har skrevet C-kode til specifikke mikroprocessorer.",
                "Versions": "ANSI C-11, Embedded C PIC32, PIC24, PIC18, PIC16",
                "Icon": ""
            },
            {
                "Id": 52,
                "Name": "Windows",
                "Description": "Windows er en gruppe af grafiske operativsystemer, der udvikles, markedsføres og sælges af Microsoft.",
                "Experience": "Jeg har arbejdet med Windows i mange år, og jeg kender også en del til Windows Server-software.",
                "Versions": "Server 2012, 2008 R2, 2003 R2, Client Versions 10, 8, 7, Vista, XP, ME, 2000, 98, 95 ",
                "Icon": ""
            },
            {
                "Id": 53,
                "Name": "Subversion",
                "Description": "",
                "Experience": "",
                "Versions": "",
                "Icon": ""
            },
            {
                "Id": 54,
                "Name": "Git",
                "Description": "",
                "Experience": "",
                "Versions": "",
                "Icon": ""
            },
            {
                "Id": 55,
                "Name": "Team Foundation Server",
                "Description": "",
                "Experience": "",
                "Versions": "",
                "Icon": ""
            },
            {
                "Id": 56,
                "Name": "Scrum",
                "Description": "",
                "Experience": "",
                "Versions": "",
                "Icon": ""
            }
        ],
        "Education": [{
                "Name": "Web-Integrator",
                "Place": "Media College Aalborg",
                "Description": "Bestået med svendebrev fra Media College Aalborg",
                "Started": 2014,
                "Ended": 2015,
                "Details": "Kort erhvervsuddannelse koncentreret omkring webudvikling. Består af følgende fag (niveauer i parentes):  Iværksætteri og Innovation (E), Informationsteknologi  (D),  Navigationsdesgin (D), CMS (A), Praktisk Web-integration (A), E-Handel  (C), Webserver (B), Digital Fotografering og billedbehandling (B), Frontend-udvikling (B), Afsluttende svendeprøve (A).",
                "Icon": ""
            },
            {
                "Name": "Gymnasial Supplering",
                "Place": "Aalborg Studenterkursus",
                "Description": "Læste Matematik og Fysik hos Aalborg Studenterkusus.",
                "Started": 2012,
                "Ended": 2013,
                "Details": "Supplerende kurser på gymnasialt niveau (niveauer i parentes): Fysik (C), Matematik (A).",
                "Icon": ""
            },
            {
                "Name": "IT-Teknolog (AK)",
                "Place": "University College Nordjylland",
                "Description": "Bestået som IT-Teknolog (AK) hos University College Nordjylland",
                "Started": 2009,
                "Ended": 2011,
                "Details": "Kort videregående uddannelse indenfor udvikling samt anvendelse af elektronik og computerteknologier. Mine specialiseringer var FPGA- samt Androidudvikling.  I alt 120 ECTS: Teknologi (75 ECTS), Virksomheden (15 ECTS), Specialisering (15 ECTS), Afgangsprojekt (15 ECTS).",
                "Icon": ""
            },
            {
                "Name": "Sproglig Student",
                "Place": "Aalborg Studenterkursus",
                "Description": "Bestået som sproglig student.",
                "Started": 2001,
                "Ended": 2003,
                "Details": "Adgangsgivende studentereksamen med følgende fag (niveauer i parentes): Biologi (C), Dansk (A), Engelsk (A), Italiensk (B), Geografi (C), Historie (A), Latin (C), Naturfag (C), Oldtidskundskab (C), Tysk (B), Dramatik (C), Matematik (C).",
                "Icon": ""
            }
        ],
        "Certificates": [{
            "Name": "Adobe CS5",
            "Place": "University College Nordjylland",
            "Description": "Opnåede certificering på 6-ugers kursusforløb i grafisk design samt Adobe CS5 Photoshop, Illustrator og InDesign.",
            "Started": 2011,
            "Ended": 2011,
            "Details": "Kompetencer indenfor Adobe CS5 samt designparametre som formgivning og farvelære i forhold til logo-, folder- og plakatdesign. I alt 10 ECTS: Teknologi (5,5 ECTS). Designprocessen (1,5 ECTS), Kommunikation (1,5 ECTS), Værdifilosofi (0,5 ECTS), Æstetik (0,5 ECTS), Virksomheden (0,5 ECTS).",
            "Icon": ""
        }],
        "Languages": [{
                "Name": "Dansk",
                "Description": "Flydende",
                "Details": "Naturligvis er mit modersmål mit bedste sprog, og jeg har en glimrende forståelse af sprogets grammatik samt et stort ordforråd.",
                "Icon": ""
            },
            {
                "Name": "Engelsk",
                "Description": "Flydende",
                "Details": "Personligt opfatter jeg Engelsk som mit andet sprog. Desuden mener jeg, at mit engelsk er flydende i såvel talesprog som skriftsprog.",
                "Icon": ""
            },
            {
                "Name": "Tysk",
                "Description": "Grundlæggende",
                "Details": "Jeg havde tysk i skolen og gymnasiet. Selvom det ikke er mit foretrukte sprog, så forstår jeg det glimrende, og kan også tale lidt tysk.",
                "Icon": ""
            },
            {
                "Name": "Italiensk",
                "Description": "Grundlæggende",
                "Details": "Jeg lærte italiensk i gymnasiet og bestod det med fornuftige karakterer. Selvom jeg ikke har brugt mit italiensk i en årrække, så mener jeg godt, at jeg vil være i stand til at genlære det.",
                "Icon": ""
            },
            {
                "Name": "Latin",
                "Description": "Grundlæggende",
                "Details": "Jeg havde latin i gymnasiet, og dette sprog udgør i et stort omfang min tværsproglige forståelse i forhold til europæiske sprog.",
                "Icon": ""
            }
        ],
        "Interests": [{
                "Name": "Litteratur",
                "Description": "Læsning er en af mine store interesser. Det gælder såvel skønlitteratur som faglitteratur. Jeg læser alt fra store klassiske forfattere (f.eks. Robert Louis Stevenson og Victor Hugo) til bøger eller artikler om stjernehimlen – så længe det er noget der udfordrer og udvikler mig.",
                "Icon": ""
            },
            {
                "Name": "Brydning",
                "Description": "I teenageårene dyrkede jeg græsk/romersk brydning på højt plan og opnåede 3 danmarksmesterskaber. Selvom jeg ikke var noget hundredeårstalent, tillærte jeg nogle vigtige vaner i forbindelse med træning og målrettethed, som jeg sidenhen har draget stor nytte af. Efter min aktive karriere var jeg i mange år også leder i klubben. Jeg har siddet i bestyrelsen i 4 år, været PR-mand og træner. Min tilknytning til klubben er fortsat intakt, da to af mine børn går til brydning, og jeg deltager i udvalgsarbejde samt fungerer som brydedommer ved begynderstævner.",
                "Icon": ""
            },
            {
                "Name": "Ukulele",
                "Description": "I mine barndomsår spillede jeg lidt guitar uden at det blev prangende. Sidenhen har jeg valgt, at slå mig på ukulelespil, som jeg øver flere gange ugentligt, da jeg synes ukulelen er et helt fantastisk instrument.",
                "Icon": ""
            },
            {
                "Name": "Løb",
                "Description": "Ligesom de fleste mennesker har jeg brug for at træne lidt, for at passe på min krop. Siden jeg var 15 har løb været en af mine foretrukne træningsformer.",
                "Icon": ""
            },
            {
                "Name": "Familie",
                "Description": "Det er ganske vist, at jeg tilbringer det meste af min fritid sammen med mine børn, og derfor er et familiemenneske en passende betegnelse at bruge om mig. I 2008 arbejdede jeg på Fabrikken Tulip i Svenstrup efter skrinlagt militærkarriere og universitetsuddannelse, men så mødte jeg Signe. I 2009 blev jeg gift med Signe, som jeg arvede 3 børn fra, og i oktober samme år føjede vi endnu en til flokken. Når jeg tænker tilbage, var det faktisk ingen større omvæltning i mit liv, at gå fra 0 til 4 børn i løbet af mindre end 2 år. Det havde længe ligget i kortene, at det var den vej jeg ville, og det faldt mig helt naturligt at tage skridtet. Faktisk mener jeg at denne forandring i hvert henseende har været god for mig, da jeg blev nødt til at fokusere mere langsigtet end hidtil, fordi jeg fik min egen familie at sørge for.",
                "Icon": ""
            },
            {
                "Name": "Historie",
                "Description": "Jeg er særdeles interesseret i historie – både på makroplanet og den helt nære historie, og læser en del kildemateriale fra mange forskellige perioder og steder. Jeg går endvidere meget op i lokalhistorie og idrætshistorie, og kunne godt forestille mig, at det bliver noget jeg kommer til at gå meget mere op i, når børnene bliver lidt ældre… ",
                "Icon": ""
            },
            {
                "Name": "DosBox",
                "Description": "Jeg besidder stor lidenskab for gamle spil fra DOS-æraen samt de tidlige Windows-år. Herunder klassikere som the Secret of Monkey Island, Ufo, Moonstone samt en hel masse andre. Når der er tid til det nyder jeg gerne lidt ældre spils selskab.",
                "Icon": ""
            },
            {
                "Name": "Rejser",
                "Description": "Det har altid betydet meget for mig at komme ud og opleve noget nyt, og færdes i naturen. Det er sikkert derfor jeg har rejst rundt i det meste af Europa, og opleve de små forskelle, der er mellem Danmark og de andre steder.",
                "Icon": ""
            },
            {
                "Name": "Møntsamling",
                "Description": "Here goes description",
                "Icon": ""
            },
            {
                "Name": "Elektronik",
                "Description": "Here goes description",
                "Icon": ""
            },
            {
                "Name": "Software",
                "Description": "Here goes description",
                "Icon": ""
            },
            {
                "Name": "Liverpool F.C.",
                "Description": "Here goes description",
                "Icon": ""
            }
        ]
    },
    {
        "Description": [{
                "Content": "I am a talented software developer with a preference towards mobile devices. Still, I have experience from several other areas - such as desktop application development, web development and development on embedded devices."
            },
            {
                "Content": "Furthermore, I like to believe that I am an innovative kind of person with many ideas. I am a technically competent, dedicated person, who works continuously until the work is done. I work fine in groups but am generally capable of keeping the speed up by myself. In short, I am the kind of person who sees opportunities rather than barriers in front of me. "
            },
            {
                "Content": "I look forward to hear from you."
            }
        ],
        "Experience": [{
                "Name": "Military Service",
                "Place": "AutoPilot ApS",
                "Description": "Served in the Danish Army.",
                "Started": 2016,
                "Ended": "",
                "Active": true,
                "Details": "Armoured Infantrist at the Guard Hussar Regiment, Slagelse. Served as a light machine gunner in an infantry unit and participated in the NATO Exercise Strong Resolve in Drawsko Pomorskie, Poland.",
                "Icon": ""
            },
            {
                "Name": "Military Service",
                "Place": "CodeCreator ApS",
                "Description": "Served in the Danish Army.",
                "Started": 2016,
                "Ended": "",
                "Active": true,
                "Details": "Armoured Infantrist at the Guard Hussar Regiment, Slagelse. Served as a light machine gunner in an infantry unit and participated in the NATO Exercise Strong Resolve in Drawsko Pomorskie, Poland.",
                "Icon": ""
            },
            {
                "Name": "Application, Software and Web Developer",
                "Place": "Freelance",
                "Description": "Developer of web sites, applications and marketing related projects on a task based basis",
                "Started": 2015,
                "Ended": "",
                "Active": true,
                "Details": "Primarily, developing projects related to application and web development. However, projects which include other kinds of software development, graphics design as well as communication are just as interesting to me. The afore mentioned are all areas in which I am very skilled.",
                "Icon": ""
            },
            {
                "Name": "Slaughterhouse Worker",
                "Place": "Tulip Food Company",
                "Description": "Worked at Tulip Food Company, Svenstrup",
                "Started": 2008,
                "Ended": 2009,
                "Details": "Worked in various areas of the slicery, a department for slicing meat and sausages.",
                "Icon": ""
            },
            {
                "Name": "Cleaner",
                "Place": "Jammerbugt Erhvervsrengøring",
                "Description": "Worked at Jammerbugt Erhvervsrengøring",
                "Started": 2007,
                "Ended": 2007,
                "Details": "Worked for a short while as a cleaner in Jensens Bøfhus.",
                "Icon": ""
            },
            {
                "Name": "Lance Corporal",
                "Place": "The Danish Army",
                "Description": "Worked as Lance Corporal in the Danish Army.",
                "Started": 2005,
                "Ended": 2006,
                "Details": "Medic at Jutlands Dragoon Regiment in Holstebro. I worked as a paramedic on an armoured ambulance as part of the Nato Response Force 10.",
                "Icon": ""
            },
            {
                "Name": "Military Service",
                "Place": "The Danish Army",
                "Description": "Served in the Danish Army.",
                "Started": 2000,
                "Ended": 2001,
                "Details": "Armoured Infantrist at the Guard Hussar Regiment, Slagelse. Served as a light machine gunner in an infantry unit and participated in the NATO Exercise Strong Resolve in Drawsko Pomorskie, Poland.",
                "Icon": ""
            }
        ],
        "Projects": [{
            "Name": "Udvikler",
            "Place": "AutoPilot ApS",
            "Description": "Webudvikling til cloud-løsning.",
            "Started": 2016,
            "Ended": "",
            "Active": true,
            "Details": "Udvikler primært indenfor applikations- og webudvikling, men også indenfor anden softwareudvikling, grafisk design samt kommunikationsrelaterede opgaver. De førnævnte områder er alle nogle, jeg besidder betragtelige færdigheder indenfor.",
            "Icon": ""
        }],
        "Qualifications": [{
                "Id": 0,
                "Name": "CSS3",
                "Description": "Cascading Style Sheets (CSS) is a simple mechanism for adding style (e.g., fonts, colors, spacing) to Web documents.",
                "Experience": "I have acquired a vast knowledge of CSS which includes basic styling of texts and boxes, placing elements, transforming elements, media queries and keyframe animations.",
                "Versions": "3.0, 2.1",
                "Icon": ""
            },
            {
                "Id": 1,
                "Name": "HTML 5",
                "Description": "The 5th major revision of the core language of the World Wide Web: the Hypertext Markup Language (HTML).",
                "Experience": "Although not professionally, I have worked with HTML since the days when the layouts of websites were placed in tables and everything was done inline. So I feel that I have extensive experience with HTML.",
                "Versions": "HTML 5, XHTML",
                "Icon": ""
            },
            {
                "Id": 2,
                "Name": "Umbraco",
                "Description": "Umbraco is a fully-featured open source content management system based on ASP.Net",
                "Experience": "I have used Umbraco for building small simple websites with razor scripts and generally I find it easy to build web sites with the Umbraco Content Management System.",
                "Versions": "7.16, 6.2.4, 6.1.2",
                "Icon": ""
            },
            {
                "Id": 3,
                "Name": "Web Development",
                "Description": "Web development is a broad term for the work involved in developing a web site. Web development can range from developing the simplest static single page of plain text to the most complex web-based internet applications, electronic businesses, and social network services.",
                "Experience": "I have been developing applications for web and mobile devices for several years. It is my personal opinion that I am a very skilled web developer capable of creating exciting user interfaces using HTML5,CSS3 and JavaScript. I am also a procifient back-end developer with both PHP- and C#-experience. ",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 4,
                "Name": "jQuery",
                "Description": "jQuery is a fast, small, and feature-rich JavaScript library.",
                "Experience": "Mostly, I have used jQuery in cases when it was easier to implement than writing the scripts by myself and my skills are considerable with this frame work.",
                "Versions": "1.11.1,Mobile 1.4.3",
                "Icon": ""
            },
            {
                "Id": 5,
                "Name": "PHP",
                "Description": "A server-side HTML embedded scripting language.",
                "Experience": "I have used PHP for almost a decade by now - although mostly with PHP-based content management systems whenever I needed something out of the ordinary. I am both capable of creating advanced scripts from scratch and altering existing code for many purposes.",
                "Versions": "5.6, 5.5, 5.2, 5.1",
                "Icon": ""
            },
            {
                "Id": 6,
                "Name": "JavaScript",
                "Description": "JavaScript is a high-level, dynamic, loosely typed programming language. It is supported by all modern web browsers.",
                "Experience": "Currently my favourite programming language - mostly because I love developing for web browsers. Furthermore, I believe HTML 5-applications are the future because many devices are and more will be capable of running them. I am capable of creating a wealth of different applications with JavaScript and understand many of the capabilities of the modern web browsers. My proficiencies include dynamic data visualisation, HTML 5 Canvas, Google Maps API, AJAX, AngularJS and jQuery/jQuery Mobile.",
                "Versions": "EMCA 6, 5.1, 3",
                "Icon": ""
            },
            {
                "Id": 7,
                "Name": "CMS",
                "Description": "A content management system is a computer application that allows publishing, editing and modifying content, organizing, deleting as well as maintenance from a central interface. A CMS is often used to run websites containing blogs, news, shopping or the likes.",
                "Experience": "I have reasonable knowledge of modern content management systems including Umbraco, Joomla and PHP Fusion. Furthermore, I am capable of creating my own secure CMS systems from scratch as well as modifying existing ones.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 8,
                "Name": "Front-End",
                "Description": "Front end development, also known as client side development is the practice of producing HTML, CSS and JavaScript for a website or web application so that a user can see and interact with them directly.",
                "Experience": "The way I see it, I am a very skilled front-end developer capable of creating a wealth of user-friendly fuctions on the client-side of a web site. My proficiencies include dynamic data visualisation, HTML 5 Canvas, Google Maps API, AJAX, AngularJS and jQuery/jQuery Mobile.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 9,
                "Name": "SEO",
                "Description": "Search engine optimization is a methodology of strategies, techniques and tactics used to increase the amount of visitors to a website by obtaining a high-ranking placement in the search results page of a search engine (e.g. Google).",
                "Experience": "In general, I have a good notion about search engine optimisation which includes SEO-friendly design, metatags, site maps, error pages and Google Analytics / Web Master Tools.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 10,
                "Name": "MySQL",
                "Description": "Popular open source structured query language database management system.",
                "Experience": "Mostly, I have worked with MySQL in PHP-based web projects and I feel comfortable using any kinds of relational databases as well as SQL queries.",
                "Versions": "5.5, 5.6, 5.7",
                "Icon": ""
            },
            {
                "Id": 11,
                "Name": "Web Design",
                "Description": "Web design encompasses many different skills and disciplines in the production and maintenance of websites.",
                "Experience": "I am a skilled web designer capable of creating and implementing many sorts of designs including modern flat, bootstrap designs with various scroll effects as well as special designs with e.g. HTML 5 Canvas, various CSS-effects, animations or tiling images.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 12,
                "Name": "Web Standards",
                "Description": "Web standards are the formal, non-proprietary standards and other technical specifications that define and describe aspects of the World Wide Web.",
                "Experience": "As a dedicated web developer I am always looking to keep up with standards of the W3C since they govern the present as well as future of modern web browsers.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 13,
                "Name": "AJAX",
                "Description": "AJAX is a set of web development techniques utilising many web technologies used on the client-side to create asynchronous Web applications. With AJAX web applications can send data to and retrieve from a server without interfering with the display and behavior of the existing page.",
                "Experience": "I am reasonably proficient with AJAX techniques both using JavaScript, jQuery, AngularJS and Knockout.js.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 14,
                "Name": "ASP.NET",
                "Description": "ASP.NET is a unified Web development model that includes the services necessary for you to build enterprise-class Web applications with a minimum of coding. ASP.NET is part of the .NET Framework, and when coding ASP.NET applications you have access to classes in the .NET Framework.",
                "Experience": "I am competent within the latest generations of ASP.NET applications including ASP.NET MVC, Razor Web Pages and Web Forms.",
                "Versions": "4.6, 4.5, 4.0, 3.5",
                "Icon": ""
            },
            {
                "Id": 15,
                "Name": "C#",
                "Description": "C# is a strongly typed object-oriented language that enables developers to build a variety of applications that run on the .NET Framework.",
                "Experience": "I am capable of utilising C# for various purposes including desktop applications and web sites.",
                "Versions": "4, 3",
                "Icon": ""
            },
            {
                "Id": 16,
                "Name": "OOP",
                "Description": "Object-oriented programming is a programming paradigm organized around objects rather than actions and data rather than logic.",
                "Experience": "I have experience with this work flow from developing Java and C# projects as well as using the Unified Process and UML2 language for analysis and design.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 17,
                "Name": "Programming",
                "Description": "The process of developing and implementing various sets of instructions to enable a computer to do a certain task.",
                "Experience": "I am capable of creating software using several high level programming languages like Java, C#, PHP, C and JavaScript. Furthermore, I have a good understanding of binary data and datacommunication.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 18,
                "Name": "Visual Studio",
                "Description": "Visual Studio is a comprehensive collection of developer tools and services for the .NET-platform and beyond.",
                "Experience": "I have worked in Visual Studio for multiple purposes which include Windows Forms, Web Sites and console applications, and I feel comfortable working with its debugger.",
                "Versions": "2013, 2010, 2007",
                "Icon": ""
            },
            {
                "Id": 19,
                "Name": "Web Applications",
                "Description": "A web application is a client-server software application in which the client runs in a web browser.",
                "Experience": "I have at this point created several web apps and hybrid apps running on my Android devices using HTML, CSS, JavaScript, Java and XML. At this point my most prolific apps are my baby monitor application and my Location Manager.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 20,
                "Name": "Database Design",
                "Description": "Database design is the process of producing a detailed data model of a database.",
                "Experience": "I have reasonable experience with designing relational databases of all sorts and think that I have a fine notion of what is a good design.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 21,
                "Name": "Usability",
                "Description": "Usability is the ease of use and learnability of a human-made object. ISO has standardised usability into 5 elements: Learnability, Efficiency, Memorability, Errors and Satisfaction.",
                "Experience": "During my time at university, I learned problem-based methods and I am good at analysing data both from interviews and questionnaires. I can make an analysis concerning the usability of a system anytime.",
                "Versions": "ISO 9241",
                "Icon": ""
            },
            {
                "Id": 22,
                "Name": "GUI Design",
                "Description": "In computer science, a graphical user interface is a type of interface that allows users to interact with electronic devices.",
                "Experience": "Currently, I have desgined many graphical user interfaces both in desktop applications and web sites. I feel that I have a good understanding of what is important and what is not.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 23,
                "Name": "Microsoft SQL Server",
                "Description": "MS SQL Server is a relational database management system developed by Microsoft.",
                "Experience": "In general, I have a good understanding of SQL databases and I am capable of designing them using Entity Framework as well as T-SQL Queries.",
                "Versions": "2014, 2012, 2008 R2",
                "Icon": ""
            },
            {
                "Id": 24,
                "Name": "XML",
                "Description": "Extensible Markup Language (XML) is a simple, very flexible text format. Originally designed to meet the challenges of large-scale electronic publishing, XML is also playing an increasingly important role in the exchange of a wide variety of data on the Web and elsewhere.",
                "Experience": "I have both experience with XML as a data language with desktop applications and web sites and as a GUI mark up language with Android devices.",
                "Versions": "1.1, 1.0",
                "Icon": ""
            },
            {
                "Id": 25,
                "Name": "Adobe Photoshop",
                "Description": "Adobe Photoshop is a raster graphics editor developed and published by Adobe Systems. It can edit and compose raster images in multiple layers and supports masks, alpha compositing and several color models including RGB, CMYK, Lab color space, spot color and duotone. Photoshop has vast support for file formats.",
                "Experience": "I am capable of most useful things like the basic retouschering and repairing images, removing backgrounds using pen tool as well as working non-destructively with layer masks.",
                "Versions": "CC, CS6, CS5",
                "Icon": ""
            },
            {
                "Id": 26,
                "Name": "Adobe Illustrator",
                "Description": "Adobe Illustrator is a vector graphics software used to create digital graphics, illustrations, and typography for all kinds of media: print, web, interactive, video, and mobile.",
                "Experience": "My free hand drawing skills are reasonable, and I believe I am quite good at creating graphics for web and canvas using vector graphics tools like e.g. Adobe Illustrator. Furthermore, I am good at re-drawing images using pen tool.",
                "Versions": "CC, CS6, CS5",
                "Icon": ""
            },
            {
                "Id": 27,
                "Name": "Adobe InDesign",
                "Description": "Adobe InDesign is a desktop publishing software application produced by Adobe Systems. It can be used to create works such as posters, flyers, brochures, magazines, newspapers, and books.",
                "Experience": "I have made a lot of flyers, posters and booklets for private purposes and think that I am quite good at it.",
                "Versions": "CC, CS6, CS5",
                "Icon": ""
            },
            {
                "Id": 28,
                "Name": "Java",
                "Description": "Java is a programming language and computing platform first released by Sun Microsystems and currently developed by Oracle Corporation. It is an object-oriented language which has been specifically designed to have as few implementation dependencies as possible.",
                "Experience": "I started developing with Java a few years back when Android was a rather new platform. I have created some applets, desktop applications as well as a few Android applications. The most advanced are probably an FFT-based Baby Monitor and a Location Manager.",
                "Versions": "SE 7 (Dolphin), SE 6 (Mustang), SE 5 (Tiger)",
                "Icon": ""
            },
            {
                "Id": 29,
                "Name": "OOAD",
                "Description": "Object-oriented analysis and design (OOAD) is a popular technical approach for analysing, designing, implementing and testing source code for various purposes. OOAD is conducted in an iterative manner as formulated by the Unified Process.",
                "Experience": "I have been using UML and the iterative work flow from the unified process for some time now and prior to that structured program development and documentation.",
                "Versions": "UML 2",
                "Icon": ""
            },
            {
                "Id": 30,
                "Name": "Android",
                "Description": "Software platform developed by Google, based on the Linux kernel and designed for various touchscreen devices.",
                "Experience": "I have dabbled with the Android platform since v. 1.6 (Donut) and have both been working with the GUI and hardware including GPS, Audio and Phone Services. I am a competent java programmer, have a good understanding of Android XML and I am capable of building both native, hybrid and web applications. At this point my most prolific apps are my baby monitor application and my Location Manager.",
                "Versions": "4.4 (KitKat), 4.2 (Jelly Bean), 2.2 (Froyo), 1.6 (Donut)",
                "Icon": ""
            },
            {
                "Id": 31,
                "Name": "Microsoft Office",
                "Description": "Microsoft Office is an office suite of applications, servers, and services developed by Microsoft.",
                "Experience": "I have been working with various software for writing, calculating, presentation and the likes. I am very skilled in any aspect of MS Office.",
                "Versions": "2013, 2010, 2007, 2003",
                "Icon": ""
            },
            {
                "Id": 32,
                "Name": "AngularJS",
                "Description": "Superheroic open-source web application framework developed and maintained by Google. The framework adapts and extends traditional HTML to present dynamic content through two-way data-binding that allows for the automatic synchronization of models and views.",
                "Experience": "By now I have great deal of experience with Angular, feel quite comfortable developing with it and I know of lots of dos and donts with this frame work. It is my personal opinion that two-way data binding is revolutionary to application development as it saves loads of code which both quickens development and gives a developer the possibility of creating something great. My skills with Angular include routing, animations and custom filters.",
                "Versions": "1.48, 1.229",
                "Icon": ""
            },
            {
                "Id": 33,
                "Name": "Google Maps API",
                "Description": "The Google Maps API allows the embedding of Google Maps onto web pages, using a simple JavaScript interface or a Flash interface. It is designed to work on both mobile devices as well as traditional desktop browser applications.",
                "Experience": "I have reasonable experience with this JavaScript-based frame work with several successful implementations behind me. The best one is probably my Location Manager Interface which draws overlays, labels and diagrams according to logged GPS data and changes dynamically with several sort functions.",
                "Versions": "3.23, 3.22, 3.21, 3.19",
                "Icon": ""
            },
            {
                "Id": 34,
                "Name": "RESTful APIs",
                "Description": "Representational state transfer typically communicate over Hypertext Transfer Protocol (HTTP) with the same HTTP verbs (GET, POST, PUT, DELETE, etc.) that web browsers use to retrieve web pages and to send data to remote servers.",
                "Experience": "I know the basics of RESTful Web Services and knows how to use them.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 35,
                "Name": "Google Search Console",
                "Description": "A web service by Google for webmasters. It allows webmasters to check indexing status and optimise visibility of their web sites.",
                "Experience": "I have reasonable experience with this service and I know how to use it for Search Optimisation (SEO).",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 36,
                "Name": "WebMatrix",
                "Description": "Microsoft WebMatrix is a free, cloud-connected web development application for Windows.",
                "Experience": "I know this IDE quite well and I have both used it for Umbraco, ASP.NET and PHP web applications.",
                "Versions": "3.0",
                "Icon": ""
            },
            {
                "Id": 37,
                "Name": "Google Analytics",
                "Description": "Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.",
                "Experience": "I have reasonable experience with this service and I know how to use it for Search Optimisation (SEO).",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 38,
                "Name": "JSON",
                "Description": "JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language, Standard ECMA-262 3rd Edition",
                "Experience": "I work well with JSON and have no trouble working with e.g. deeply nested data and non-stardard JSON syntax.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 39,
                "Name": "Bootstrap",
                "Description": "Bootstrap is a free and open-source collection of tools for creating websites and web applications. It contains HTML- and CSS-based design templates for typography, forms, buttons, navigation and other interface components, as well as optional JavaScript extensions.",
                "Experience": "I work reasonably well with this front-end framework whose column based layout has become natural to me. I know how to use it properly, am capable of using most of its features as well as applying style to them. ",
                "Versions": "3:36, 3.35, 3.34, 3.32, 3.31, 3.30, 3.20",
                "Icon": ""
            },
            {
                "Id": 40,
                "Name": "Entity Framework",
                "Description": "Entity Framework (EF) is an object-relational mapper that enables .NET developers to work with relational data using domain-specific objects.",
                "Experience": "I have worked with Entity Framework in ASP.NET-based web systems and it suits me well.",
                "Versions": "6.12, 6.11, 6.02",
                "Icon": ""
            },
            {
                "Id": 41,
                "Name": "Digital Signal Processing",
                "Description": "Digital signal processing (DSP) is the numerical manipulation of signals, usually with the intention to measure, filter, produce or compress continuous analogue signals.",
                "Experience": "I have designed both IIR- and FIR-filters working with PIC-microcontrollers using the Z-transform. Furthermore, I have used the FFT-algoritm for sound analysis in a Baby Monitor application of my creation.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 42,
                "Name": "Embedded Systems",
                "Description": "An embedded system is a computer system with a dedicated function within a larger mechanical or electrical system. It is embedded as part of a complete device often including hardware and mechanical parts.",
                "Experience": "I have worked with several PIC-processors from Microchip and implemented C source for various projects including a reaction time tester, a GPS-based movement monitor and a surveillance system.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 43,
                "Name": "VHDL",
                "Description": "VHDL (Very High Speed Hardware Description Language) is a hardware description language used in electronic design automation to describe digital and mixed-signal systems such as field-programmable gate arrays and integrated circuits.",
                "Experience": "As a student I used VHDL for several projects including a multiplexer and a video converter implemented on a Spartan 3E-board",
                "Versions": "VHDL 1076-2002",
                "Icon": ""
            },
            {
                "Id": 44,
                "Name": "Eclipse",
                "Description": "Eclipse is an IDE which contains a base workspace and an extensible plug-in system for customising the environment. Eclipse is written mostly in Java and its primary use is for developing Java applications, but it may also be used to develop applications in other programming languages.",
                "Experience": "For years Eclipse has been my primary IDE for Java and Androids Projects.",
                "Versions": "Juno, Indigo, Gallileo",
                "Icon": ""
            },
            {
                "Id": 45,
                "Name": "Xilinx",
                "Description": "Xilinx ISE is a software tool produced by Xilinx for synthesis and analysis of HDL designs, enabling the developer to synthesise their designs, perform timing analysis, examine RTL diagrams, simulate a designs reaction to different stimuli, and configure the target device with the programmer.",
                "Experience": "I have used the Xilinx ISE software for VHDL prototyping for FPGAs as well as debugging and simulation.",
                "Versions": "ISE 11.1, 10.1",
                "Icon": ""
            },
            {
                "Id": 46,
                "Name": "FPGA",
                "Description": "A field-programmable gate array (FPGA) is an integrated circuit designed to be configured by a customer or a designer after manufacturing. The FPGA configuration is generally specified using a hardware description language (HDL), similar to that used for an application-specific integrated circuit (ASIC).",
                "Experience": "I have a good understanding of working with FPGAs using VHDL or C Code. When I was a student I created a multiplexer for a seven segment display and a video converter for a surveillance system all implemented on a Spartan 3E-Board.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 47,
                "Name": "Analogue Circuit Design",
                "Description": "Analogue electronics are electronic systems with a continuously variable signal, in contrast to digital electronics where signals usually take only two levels. The term analogue describes the proportional relationship between a signal and a voltage or current that represents the signal.",
                "Experience": "I know the basics of both analogue and digital electronics and have designed several electronical systems while I was a student.",
                "Versions": "N/A",
                "Icon": ""
            },
            {
                "Id": 48,
                "Name": "Joomla",
                "Description": "Joomla is a free and open-source content management system (CMS) for publishing web content. It is built on a model–view–controller web application framework that can be used independently of the CMS.",
                "Experience": "I know how to implement web sites using the Joomla CMS as well as how to tailor it",
                "Versions": "3.4, 3.3, 1.7",
                "Icon": ""
            },
            {
                "Id": 49,
                "Name": "OrCAD",
                "Description": "OrCAD is a software tool suite used primarily for electronic design automation. The software is used mainly to create electronic schematics and electronic prints for manufacturing printed circuit boards.",
                "Experience": "I have both been calculating, planning and simulating electronic curcuits and PCBs (Printed Curcuit Boards) with this software.",
                "Versions": "16.0, 10.5",
                "Icon": ""
            },
            {
                "Id": 50,
                "Name": "Linux",
                "Description": "Linux is a computer operating system (OS) assembled under the model of free and open-source software development and distribution. The defining component of Linux is the Linux kernel, an operating system kernel first released on 5 October 1991 by Linus Torvalds.",
                "Experience": "I know how to use Linux based systems as well as the basics of the Linux kernel.",
                "Versions": "Pinguy OS 14.04.3, Puppy 6, 5, Ubunto 16.04 (Xenial Xerus), 14.10 (Utopic Unicorn)",
                "Icon": ""
            },
            {
                "Id": 51,
                "Name": "C",
                "Description": "C is a general-purpose, imperative computer programming language.",
                "Experience": "My ANSI-C is reasonable - though I have mostly written C-code for specific Microcontrollers.",
                "Versions": "ANSI C-11, Embedded C PIC32, PIC24, PIC18, PIC16",
                "Icon": ""
            },
            {
                "Id": 52,
                "Name": "Windows",
                "Description": "Windows is a metafamily of graphical operating systems developed, marketed, and sold by Microsoft.",
                "Experience": "I have been working with Windows for many years and I know a great deal about Windows Server software as well.",
                "Versions": "Server 2012, 2008 R2, 2003 R2, Client Versions 10, 8, 7, Vista, XP, ME, 2000, 98, 95 ",
                "Icon": ""
            }
        ],
        "Education": [{
                "Name": "Certificate in Web Development",
                "Place": "Media College Aalborg",
                "Description": "Graduated with a certificate in Web Development from Media College Aalborg",
                "Started": 2014,
                "Ended": 2015,
                "Details": "Short vocational education concentrating on Web Development. Consists of the following courses (levels in parenthesis): Entrepreneurship (E), Information Technology (D), User Interface Design (D), Content Management Systems (A), Web Development (A), E-Commerce (C), Web Server (B), Photography and Image Manipulation (B), Front End Development (B), Final Project (A).",
                "Icon": ""
            },
            {
                "Name": "Various Courses",
                "Place": "Aalborg Studenterkursus",
                "Description": "Studied Mathematics and Physics at Aalborg Studenterkusus.",
                "Started": 2012,
                "Ended": 2013,
                "Details": "Supplementary courses at gymnasium level (levels in parenthesis): Math (A), Physics (C).",
                "Icon": ""
            },
            {
                "Name": "AP Degree in IT and Electronics",
                "Place": "University College Nordjylland",
                "Description": "Graduated with AP Degree in IT and Electronics from University College Nordjylland",
                "Started": 2009,
                "Ended": 2011,
                "Details": "Academy degree in development and usage of electronics and computer technologies. My specialisations were development for FPGAs and Android devices. A total of 120 ECTS : Technology (75 ECTS), Entrepreneurship (15 ECTS), Specialisation (15 ECTS), Final Project (15 ECTS).",
                "Icon": ""
            },
            {
                "Name": "Linguistic Student",
                "Place": "Aalborg Studenterkursus",
                "Description": "Graduated from gymnasium.",
                "Started": 2001,
                "Ended": 2003,
                "Details": "Gymnasium degree with the following courses (levels in parenthesis): Biology (C), Danish (A), English (A), Italian (B), Geography (C), History (A), Latin (C), Natural Science (C), Ancient History (C), German (B), Drama (C), Math (C) .",
                "Icon": ""
            }
        ],
        "Certificates": [{
            "Name": "Adobe CS5",
            "Place": "University College Nordjylland",
            "Description": "Acquired certification in a six-week course of graphics design and Adobe CS5 Photoshop, Illustrator and InDesign.",
            "Started": 2011,
            "Ended": 2011,
            "Details": "Mastery of Adobe CS5 and design parameters like creative design and chromatology in relation to design of logos, flyers and posters. A total of 10 ECTS : Technology (5.5 ECTS), Design process (1.5 ECTS), Communication (1.5 ECTS), Ethics (0.5 ECTS ), Aesthetics (0.5 ECTS), Entrepreneurship (0.5 ECTS).",
            "Icon": ""
        }],
        "Languages": [{
                "Name": "Danish",
                "Description": "Fluent",
                "Details": "Naturally, my native tongue is my best language and I have an excellent understanding of its grammar as well as an extensive vocabulary.",
                "Icon": ""
            },
            {
                "Name": "English",
                "Description": "Fluent",
                "Details": "Personally, I consider English a second language. Furthermore, I think that am a fluent speaker as well as a fluent writer of the English language.",
                "Icon": ""
            },
            {
                "Name": "German",
                "Description": "Basics",
                "Details": "I had German during school and gynasium. Even though it is not my favourite language, I understand it well and I am able to speak some.",
                "Icon": ""
            },
            {
                "Name": "Italian",
                "Description": "Basics",
                "Details": "I was taught Italian during gymnasium and passed it with reasonable grades. Though I have not used my Italian for many years, I think that I will be able relearn it.",
                "Icon": ""
            },
            {
                "Name": "Latin",
                "Description": "Basics",
                "Details": "I had Latin in gymnasium. This language constitutes on a large scale my cross-language understanding between European languages.",
                "Icon": ""
            }
        ],
        "Interests": [{
                "Name": "Literature",
                "Description": "Reading is one of my major interests. Both fiction and nonfiction. I read everything from great classical authors (eg. Robert Louis Stevenson and Victor Hugo) to books or articles about stars and planets - as long as it is something that challenges and develops me.",
                "Icon": ""
            },
            {
                "Name": "Amateur Wrestling",
                "Description": "During my teenage years, I engaged in Greco-Roman style wrestling at Scandinavian top level and achieved 3 Danish championships. Although I was no super talent, I learned some important ways of training and to work to achieve my goals, which I later have benefited from greatly. After my active career, I served my club for many years in various other roles as well. Here amongst on the board for 4 years, PR responsibilities and coaching. My relation to the club is still intact, as two of my children frequent wrestling, and I participate in work dedicated to the club’s 100th anniversary as well as a little refereeing at beginner competitions.",
                "Icon": ""
            },
            {
                "Name": "Ukulele",
                "Description": "During my childhood years, I played the guitar although it never turned out as something great.  In recent years, I chose the ukulele, which I practice several times a week and I truly think it is a fantastic instrument.",
                "Icon": ""
            },
            {
                "Name": "Running",
                "Description": "Like most people, I need to work out a little to keep my body fit. Since I was 15, running has been one of my favourite training exercises.",
                "Icon": ""
            },
            {
                "Name": "Family",
                "Description": "Most of my spare time is spend with my family and therefore it would be appropriate to call me a family man. In 2008 I worked at the factory Tulip in Svenstrup after abandoning both a military career and a university education and I met Signe. The following year we married and I inherited 3 children. In October the same year, we added another one to the flock. When I think back on it, I do not think it was a radical change to me even though I went from nothing to a family of 6 within less than 2 years. I think it was a path I had been moving on for a while and it really came naturally to me to make this leap. Actually, I think I was changed for the better because I had to start focusing on the long-term future since a got a family to look out for.",
                "Icon": ""
            },
            {
                "Name": "History",
                "Description": "I am very interested in history - both on the macro and the micro level, and study lots of sources from many different periods and places. I am also very fond of local history and sports history, and could well imagine that it is something I am going to spend more time on when the kids get a little older...",
                "Icon": ""
            },
            {
                "Name": "DosBox",
                "Description": "I have great passion for old games from the DOS era as well as the early Windows period. Here amongst classics like The Secret of Monkey Island, Ufo, Moonstone and lots of other games. When time allows it, I happily enjoy the company of some old computer games.",
                "Icon": ""
            },
            {
                "Name": "Travelling",
                "Description": "It has always been of great significance to me to get out and experience something new and to see the nature. This is probably the reason why I have travelled in most of Europe, and experienced many of the smaller and larger differences between Denmark and other countries.",
                "Icon": ""
            },
            {
                "Name": "Coin Collecting",
                "Description": "Here goes description",
                "Icon": ""
            }
        ]
    }
];
    }
});