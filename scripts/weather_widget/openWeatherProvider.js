define([], function () {
    var retModule = function (city, days) {
        var cityName = city;
        var daysDisplay = days;
        var httpAddress = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
        this.setCity = function (newCity) {
            cityName = newCity;
        }
        this.setDays = function (newDays) {
            daysDisplay = newDays;
        }
        this.getJson = function () {
            httpAddress += city + '&cnt=' + days + '&units=metric&mode=json';

            var xhr = new XMLHttpRequest();
            var answer;
            xhr.open('GET', httpAddress, false);
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                answer = this.responseText;
            };
            xhr.send();
            return JSON.parse(answer);
        }
    }
    return retModule;
});