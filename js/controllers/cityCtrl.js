angular.module('app').controller('cityCtrl', function ($scope, cityFactory) {
    this.cities = cityFactory.getCities();
    this.propertyName = 'temp';
    this.content = false;
    this.capitals = ['Tirana', 'Andorra la Vella', 'Yerevan', 'Vienna', 'Baku', 'Minsk', 'Brussels', 'Sarajevo', 'Sofia', 'Zagreb', 'Nicosia', 'Prague', 'Copenhagen', 'Tallinn', 'Helsinki', 'Paris', 'Tbilisi', 'Berlin', 'Athens', 'Budapest', 'Reykjavik', 'Dublin', 'Rome', 'Astana', 'Pristina', 'Riga', 'Vaduz', 'Vilnius', 'Luxembourg ', 'Skopje', 'Valletta', 'Zagreb', 'Monaco', 'Podgorica', 'Amsterdam', 'Oslo', 'Warsaw', 'Lisbon', 'Bucharest', 'Moscow', '	San Marino', 'Belgrade', 'Bratislava', 'Ljubljana', 'Madrid', 'Stockholm', 'Bern', 'Ankara', 'Kyiv', 'London'];
    this.getWeather = function () {
        var _weather = this.weather;
        if (localStorage.length == 0) {
            for (var i = 0; i < this.capitals.length; i++) {
                _weather = this.capitals[i];
                weatherApi();
            };
        } else {
            weatherApi();
        };
        function weatherApi() {
            if (!_weather == '') {
                $.get('http://api.openweathermap.org/data/2.5/weather?q=' + _weather + '&units=imperial&appid=3761fa3e3ac15273740c5f92057f5976', function (weather) {
                    cityFactory.pushWeather(weather);
                    $scope.$apply();
                }, "json");
            } else {
                alert('Input something');
            }
        }
        this.weather = '';
        getMin();
    };
    function getMin() {
        setInterval(function () {
            cityFactory.getMin();
            $scope.$apply();
        }, 1000);
    };
    this.visited = function (cities) {
        cityFactory.visited(cities);
    };
    this.toVisit = function (cities) {
        cityFactory.toVisit(cities);
    };
    this.clear = function () {
        localStorage.clear();
        location.reload();
    };
    this.delete = function (del) {
        cityFactory.delete(del);
    };
    if (localStorage.length !== 0) {
        cityFactory.pushTo();
        getMin();
    };
    this.refresh = function () {
        location.reload();
    };
    this.sortBy = function (propertyName) {
        this.reverse = (this.propertyName === propertyName) ? !this.reverse : true;
        this.propertyName = propertyName;
    };
    if (localStorage.length == 0) {
        this.getWeather();
    };
    this.addCity = function(){
        this.content = !this.content;
    }
});
