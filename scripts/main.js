var weather;
require(['weather_widget/weather'], function (weatherModule) {
    weather = new weatherModule(3);
    weather.set('result');
})
