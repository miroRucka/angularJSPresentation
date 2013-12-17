var module = angular.module('pads', ['miniAppServices']);

module.config(function($routeProvider) {
    $routeProvider.
        when('/', {controller:MiniAppListController, templateUrl:'template/appList.html'}).
        when('/edit/:idClovek', {controller:MiniAppEditController, templateUrl:'template/appForm.html'}).
        when('/new', {controller:MiniAppNewController, templateUrl:'template/appForm.html'});
});

module.filter('reverse', function() {
    return function(input, uppercase) {
        var out = "";
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        // conditional based on optional argument
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    }
});

module.filter('substring', function() {
    return function(input, size) {
       return input.substring(0,size);
    }
});

module.factory('sluzba', function($window){
    var Sluzba = function(){
        this.pozdrav = function(){
            $window.alert('ahoj sluzba!');
        }
    };
    Sluzba.prototype.meno = function(){
        $window.alert('moje meno je sluzba');
    };
    return new Sluzba();
});

module.factory('appService', function(){
    var Service = function(){
        this.pozdrav = function(){
            $window.alert('ahoj sluzba!');
        }
    };
    Sluzba.prototype.meno = function(){
        $window.alert('moje meno je sluzba');
    };
    return new Sluzba();
});

//directive hodinky - skratena verzia zapisu
module.directive('hodinky', function ($timeout, dateFilter) {
    var result = {
        restrict:'E',
        template:'<span></span>',
        replace:false,
        scope:{ format:'=format' },
        link:function (scope, element, attrs) {

            var cas = function () {
                return dateFilter(new Date(), scope.format);
            };

            var update = function () {
                $timeout(function () {
                    element.text(cas());
                    update();
                }, 1000);
            };

            update();
        }
    }
    return result;
});

module.directive('update', function ($timeout, dateFilter) {
    return function(scope, element, attrs) {
        $(element).bind('blur', function (e) {
            var index = attrs.update;
            var old = scope.adresy[index];
            var newValue = {};
            newValue.ulica = $(this).text();
            newValue.mesto = old.mesto;
            scope.updateItem(index, newValue);
        });
    }
});

function PadsController($scope) {
    //inicializacia
    var adresy = new Array();
    adresy.push({ulica:"Zvolenska 10", mesto:"Bratislava"});
    adresy.push({ulica:"Zvonarova 5", mesto:"Levice"});
    adresy.push({ulica:"Smrekova 1720", mesto:"Zilina"});
    $scope.adresy = adresy;

    //logika
    $scope.showFull = function (index) {
        var target = $scope.adresy[index]
        alert('adresa: ' + target.ulica + ", " + target.mesto);
    }

    //CRUD
    $scope.createItem = function () {
        var newValue = {};
        newValue.ulica = $scope.newUlica;
        newValue.mesto = $scope.newMesto;
        $scope.adresy.push(newValue);
        clearInput();
    }

    $scope.updateItem = function (index, newValue) {
        $scope.adresy[index] = newValue;
    }

    $scope.deleteItem = function (index) {
        $scope.adresy.splice(index, 1);
    }

    var clearInput = function(){
        $scope.newUlica = null;
        $scope.newMesto = null;
    }
}

function ScopeController($scope) {
    //inicializacia
    var ludia = new Array();
    ludia.push({meno:"Mark", pozicia:"developer"});
    ludia.push({meno:"Jink", pozicia:"designer"});
    $scope.count = 0;
    $scope.ludia = ludia;
    $scope.clovek = {pozicia: "manager"};
    $scope.divizia = "SW78";
    $scope.$on('MyEvent', function() {
        $scope.count++;
    });
}

function DIController($scope, sluzba){
    $scope.sluzba = function(){
        sluzba.pozdrav();
    };

    $scope.sluzbaMeno = function(){
        sluzba.meno();
    };
}

function MiniAppListController($scope, staticData){
    $scope.ludia = staticData.getLudia();

    $scope.odstranPolozku = function(id){
        staticData.odstranPolozku(id, function(){
            $scope.ludia = staticData.getLudia();
        });
    };
}

function MiniAppEditController($scope, $routeParams, $location, staticData){
    var getData = function(data){
        $scope.newClovek = data;
    }
    staticData.readClovek($routeParams.idClovek, getData);
    //$scope.newClovek =  angular.extend({}, staticData.readClovek($routeParams.idClovek));
    $scope.pozicie = staticData.getPozicie();
    $scope.editMode = true;

    $scope.editujPolozku = function(){
        staticData.editujPolozku($routeParams.idClovek, $scope.newClovek, function(){
            $location.path('/');
        });

    }
}

function MiniAppNewController($scope, $location, staticData){
    $scope.pozicie = staticData.getPozicie();
    $scope.createMode = true;

    $scope.pridajPolozku = function(){
        staticData.pridajPolozku($scope.newClovek, function(){
            $location.path('/');
        });
    }
}