var app = angular.module('angNinja', ["ngRoute", "ngAnimate", "ngSanitize", "ui.bootstrap"],
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/index.html', {
            templateUrl: 'table.html',
            controller: MainCntl,
        }).when('/basic/:anId', {
            templateUrl: 'basic/template.html',
            controller: BasicCntl,
            controllerAs: 'basic'
        }).otherwise({ redirectTo: '/index.html' });

        $locationProvider.html5Mode(true);
    }
);

app.directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
                  scope.$watch(attrs.dynamic, function(html) {
                  ele.html(html);
                  $compile(ele.contents())(scope);
                  });
              }
    };
});
 
function MainCntl($route, $rootScope, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.mBasicLesson = basicDB;

    $rootScope.$emit('titleChanged', {
        mTitle : 'Your First Journey with AngularJS',
        mSubTitle : 'select your challenge(s) now'
    });
}

function TitleCntl($scope, $rootScope, $route, $routeParams, $location) {
    $rootScope.$on('titleChanged', function(event, data){
        if($location.path() == '/index.html'){
            $rootScope.mTitle = 'Your First Journey with AngularJS';
            $rootScope.mSubTitle = 'select your challenge(s) now';
        }else{
            $rootScope.mTitle = data.mTitle;
            $rootScope.mSubTitle = data.mSubTitle;
        }
    });
}
 
function BasicCntl($scope, $rootScope, $routeParams) {
    var anId = $routeParams.anId;
    this.info = basicDB[anId];
    var answer = this.info.answer;
    
    console.log("Getting anId: ", anId, this.info);

    $rootScope.$emit('titleChanged', {
        mTitle: this.info.mTitle,
        mSubTitle: this.info.mSubTitle
    });

    $scope.checkAnswer = function() {
        if($scope.yourAnswer == answer){
            alert('Correct!');
        }else{
            alert('Wrong!');
        }
    };
}

basicDB = {"0001": 
            {
                "mTitle": "Basic Lesson: Getting Variable", 
                "mSubTitle": "Type the missing part *HERE* if you want to print the value of current selection.",
                "example": '<select ng-model="num" ng-init="num=2" class="form-control"><option>1</option><option>2</option></select><div>You are No.{{num}}</div>',
                "source": '&lt;select ng-model="num" ng-init="num=2" class="form-control"&gt;<br />\
&lt;option&gt;1&lt;/option&gt;&nbsp;<br />\
&lt;option&gt;2&lt;/option&gt;&nbsp;<br />\
&lt;/select&gt;&nbsp;<div>You are No.{{ *HERE* }}</div>',
                "answer": "num"
             },
      "0002":             
            {
                "mTitle": "Basic Lesson: Escape Braces {}", 
                "mSubTitle": "Type the missing part *HERE* if you want to escape the braces in your code.",
                "example": '<select ng-model="num" ng-init="num=2" class="form-control"><option>1</option><option>2</option></select><div ng-non-bindable>You are No.{{num}}</div>',
                "source": '&lt;select ng-model="num" ng-init="num=2" class="form-control"&gt;<br />\
&lt;option&gt;1&lt;/option&gt;&nbsp;<br />\
&lt;option&gt;2&lt;/option&gt;&nbsp;<br />\
&lt;/select&gt;&nbsp;<br />\
&lt;div *HERE*&gt;You are No.{{num}}&lt;/div&gt;',
                "answer": "ng-non-bindable"
             },
      "0003":             
            {
                "mTitle": "Basic Lesson: Bind With Data", 
                "mSubTitle": "Type the missing part *HERE* if you want to escape the braces in your code.",
                "example": '<ul><li ng-repeat="phone in phones">{{phone.name}}<p>{{phone.snippet}}</p></li></ul><script>app.controller("BasicCntl", function BasicCntl($scope) {\
  $scope.phones = [\
    {"name": "Nexus S",\
     "snippet": "Fast just got faster with Nexus S."},\
    {"name": "Motorola XOOM™ with Wi-Fi",\
     "snippet": "The Next, Next Generation tablet."}\
  ];\
});</script>',
                "source": '&lt;select ng-model="num" ng-init="num=2" class="form-control"&gt;<br />\
&lt;option&gt;1&lt;/option&gt;&nbsp;<br />\
&lt;option&gt;2&lt;/option&gt;&nbsp;<br />\
&lt;/select&gt;&nbsp;<br />\
&lt;div *HERE*&gt;You are No.{{num}}&lt;/div&gt;',
                "answer": "ng-non-bindable"
             }
      }