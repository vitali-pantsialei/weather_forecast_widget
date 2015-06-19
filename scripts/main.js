require(['weather_widget/weather', 'weather_widget/openWeatherProvider'], function (weatherModule, dataProvider) {
    var data = new dataProvider('Minsk', 10);
    weather = new weatherModule(3, data);
    weather.set('result');
})
