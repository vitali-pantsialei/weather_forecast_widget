define(["./data"], function (getData) {
    var retModule = function () {
        this.set = function (id) {
            var field = document.getElementById(id);
            var inputData = new getData();
            var index;
            var resultHTML = "";
            
            for (index = 0; index != inputData.length; ++index) {
                //Night night night
                resultHTML += ('<fieldset><legend><h2>' + inputData[index].town + " " + inputData[index].date + '</h2></legend>');
                resultHTML += ('<table><tr><td id="day_night_style"><h1>Night</h1>');
                resultHTML += ('<p id="' + inputData[index].imageNight + '"></p>');
                resultHTML += ('<table><tr><th id="info_style">Temperature</th><th id="info_style">Pressure</th><th id="info_style">Wet</th></tr>');
                resultHTML += ('<tr><td id="info_style">' + inputData[index].temperatureNight + '</td><td id="info_style">' + inputData[index].pressureNight + '</td><td id="info_style">' + inputData[index].wetNight + '</td></tr></table></td>')
                
                //Day day day
                resultHTML += ('<td><h1>Day</h1>');
                resultHTML += ('<p id="' + inputData[index].imageDay + '"></p>');
                resultHTML += ('<table><tr><th id="info_style">Temperature</th><th id="info_style">Pressure</th><th id="info_style">Wet</th></tr>');
                resultHTML += ('<tr><td id="info_style"><center>' + inputData[index].temperatureDay + '</center></td><td id="info_style"><center>' + inputData[index].pressureDay + '</center></td><td id="info_style"><center>' + inputData[index].wetDay + '</center></td></tr></table></td></tr></table>')

                resultHTML += ('</fieldset>')
            }
            field.innerHTML = resultHTML;
        }
    };
    return retModule;
})
