angular.module('app').factory('cityFactory', function () {
    var service = {};
    var cities = [];
    service.getCities = function () {
        return cities;
    };
    service.pushWeather = function (weather) {
        var obj = {
            city: weather.name
            , temp: 'loading...'
            , sky: 'loading...'
            , maxMin: 'none'
            , visited: false
            , toVisit: false
        };
        var serialObj = JSON.stringify(obj);
        localStorage.setItem("key_" + obj.city, serialObj);
        cities.push(obj);
        nowWeather(weather);
    };
    service.pushTo = function () {
        for (var i = 0; i < localStorage.length; i++) {
            var toCities = (JSON.parse(localStorage.getItem(localStorage.key(i))));
            $.get('http://api.openweathermap.org/data/2.5/weather?q=' + toCities.city + '&units=imperial&appid=3761fa3e3ac15273740c5f92057f5976', function (weather) {
                nowWeather(weather);
            }, "json");
            cities.push(toCities);
        };
    };
    function nowWeather(weather) {
        for (key in cities) {
            if (cities[key].city == weather.name) {
                cities[key].temp = ((weather.main.temp.toFixed(0) - 32) / 1.8).toFixed(1);
                cities[key].sky = weather.weather[0].description;
            };
        }
    };
    service.getMin = function () {
        var min = cities.reduce((prev, curr) => prev.temp < curr.temp ? prev : curr);
        var max = cities.reduce((prev, curr) => prev.temp > curr.temp ? prev : curr);
        for (var i in cities) {
            cities[i].maxMin = 'none';
        };
        min.maxMin = '#000099';
        max.maxMin = '#990000';
    };
    service.visited = function (cityVisit) {
        cityVisit.toVisit = false;
        cityVisit.visited = true;
        localStorage.setItem("key_" + cityVisit.city, JSON.stringify(cityVisit));
    };
    service.toVisit = function (cityToVisit) {
        cityToVisit.visited = false;
        cityToVisit.toVisit = true;
        localStorage.setItem("key_" + cityToVisit.city, JSON.stringify(cityToVisit));
    };
    service.delete = function (del) {
        var elem = cities.indexOf(del);
        cities.splice(elem, 1);
        localStorage.removeItem("key_" + del.city);
    };
    return service;
});