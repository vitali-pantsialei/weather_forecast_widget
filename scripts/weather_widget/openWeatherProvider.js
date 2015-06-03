define([], function () {
    var retModule = function (city, days) {
        var cityName = city;
        var daysDisplay = days;
        var httpAddress = 'http://api.openweathermap.org/data/2.5/forecast';
        var get = function (address) {
            var xhr = new XMLHttpRequest();
            var answer;
            xhr.open('GET', address, false);
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                answer = this.responseText;
            };
            xhr.send();
            return JSON.parse(answer);
        }
        this.setCity = function (newCity) {
            cityName = newCity;
        }
        this.setDays = function (newDays) {
            daysDisplay = newDays;
        }
        this.getDailyJson = function () {
            var address = httpAddress + '/daily?q=' + city + '&cnt=' + days + '&units=metric&mode=json';
            return get(address);
        }
        this.getHoursJson = function () {
            var address = httpAddress + '?q=' + city + '&units=metric&mode=json';
            return get(address);
        }
    }
    return retModule;
});