var app = angular.module('angNinja', ["ngRoute", "ngAnimate", "ngSanitize", "ui.bootstrap"],
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/index.html', {
            templateUrl: 'table.html',
            controller: MainCntl,
        });
        $routeProvider.when('/basic/:anId', {
            templateUrl: 'template.html',
            controller: BasicCntl,
            controllerAs: 'basic'
        });

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

    $rootScope.$emit('titleChanged', {
        mTitle : 'Your First Journey with AngularJS',
        mSubTitle : 'select your challenge(s) now'
    });
}

function TitleCntl($scope, $rootScope, $route, $routeParams, $location) {
    $rootScope.$on('titleChanged', function(event, data){
        console.log(data);

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
    this.info = db[anId];
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

db = {"0001": 
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
&lt;div *HERE*&gt;You are No.{{ num }}&lt;/div&gt;',
                "answer": "ng-non-bindable"
             }
      }