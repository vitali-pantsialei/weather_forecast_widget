//var weather;
require(['weather_widget/weather', 'weather_widget/data'], function (weatherModule, dataProvider) {
    var data = new dataProvider();
    weather = new weatherModule(3, data);
    weather.set('result');
    var buttons = document.getElementsByTagName('input');
})
