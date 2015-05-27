require(['weather_widget/weather'], function (weatherModule) {
    var weather = new weatherModule();
    weather.set('result');
})
