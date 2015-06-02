define([], function () {
    var retModule = function () {
        this.getJson = function () {

            var xhr = new XMLHttpRequest();
            var answer;
            xhr.open('GET', 'scripts/weather_widget/content/mockData.json', false);
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