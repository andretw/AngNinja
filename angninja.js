angular.module('angNinja', ["ngRoute", "ngAnimate", "ui.bootstrap"],
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/index.html', {
            templateUrl: 'table.html'
        });
        $routeProvider.when('/basic/:anId', {
            templateUrl: 'template.html',
            controller: BasicCntl,
            controllerAs: 'basic'
        });

        $locationProvider.html5Mode(true);
    }
);
 
function MainCntl($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}
 
function BasicCntl($scope, $routeParams) {
    var anId = $routeParams.anId;
    this.info = db[anId];
    console.log("Getting anId: ", anId, this.info);
}

db = {"0001": 
            {
                "title": "Basic Lesson: Escape Braces {}", 
                "subtitle": "Type the missing part *HERE* if you want to escape the braces in your code.",
                "example": "sdsad",
                "source": "source",
                "answer": "answer"
             },
      "0002":             
            {
                "title": "Basic Lesson: Escape Braces {}", 
                "subtitle": "Type the missing part *HERE* if you want to escape the braces in your code.",
                "example": '<div><b>sdasdsa</b></div>',
                "source": "source",
                "answer": "answer"
             }
      }