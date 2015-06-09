define([], function () {
    var retModule = function () {
        var httpAddress = 'scripts/weather_widget/content/';
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

        this.getDailyJson = function () {
            return get(httpAddress + 'mockData.json');
        }
        this.getHoursJson = function () {
            return get(httpAddress + 'mockHoursData.json');
        }
    }
    return retModule;
});