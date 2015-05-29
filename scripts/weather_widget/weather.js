define([], function () {
    var retModule = function (perPage, dataProvider) {
        var page = 1;
        var inputData = new dataProvider.getJson();
        var currId;
        var set = function (id) {
            currId = id;
            var field = document.getElementById(id);
            field.innerHTML = "";
            var index;
            var fieldTemplate = document.implementation.createDocument('', 'html', null);
            var resultHTML = "";
            
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'scripts/weather_widget/content/fieldtemplate.html', false);
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                fieldTemplate.documentElement.innerHTML = this.responseText;
            };
            xhr.send();

            for (index = (page - 1) * perPage; index != (inputData.length > page * perPage ? page * perPage : inputData.length) ; ++index) {
                var cpTemp = fieldTemplate;
                var legend = cpTemp.getElementsByTagName('h2');
                legend[0].innerHTML = inputData[index].town + " " + inputData[index].date;

                var p1 = cpTemp.getElementsByTagName('p');
                var img = cpTemp.createElement('p');
                img.setAttribute('class', 'image-size ' + inputData[index].imageNight);
                p1[0].innerHTML = img.outerHTML;
                img = cpTemp.createElement('p');
                img.setAttribute('class', 'image-size ' + inputData[index].imageDay);
                p1[2].innerHTML = img.outerHTML;

                var centers = cpTemp.getElementsByTagName('center');
                centers[0].innerHTML = inputData[index].temperatureNight;
                centers[1].innerHTML = inputData[index].pressureNight;
                centers[2].innerHTML = inputData[index].wetNight;
                centers[3].innerHTML = inputData[index].temperatureDay;
                centers[4].innerHTML = inputData[index].pressureDay;
                centers[5].innerHTML = inputData[index].wetDay;

                field.innerHTML += cpTemp.documentElement.innerHTML;
            }

            xhr.open('GET', 'scripts/weather_widget/content/buttonstemplate.html', false);
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                fieldTemplate.documentElement.innerHTML = this.responseText;
            };
            xhr.send();

            var buttons = fieldTemplate.getElementsByTagName('input');
            if (page != 1) {
                buttons[0].setAttribute('style', 'display:block');
                buttons[0].setAttribute('onclick', 'weather.back()');
            }
            if (inputData.length > page * perPage) {
                buttons[1].setAttribute('style', 'display:block');
                buttons[1].setAttribute('onclick', 'weather.next()');
            }
            field.innerHTML += fieldTemplate.documentElement.innerHTML;
        }

        this.set = function (id) {
            set(id);
        }
        this.refreshData = function () {
            inputData = dataProvider.getJson();
            set(currId);
        }
        this.back = function () {
            --page;
            set(currId);
        }
        this.next = function () {
            ++page;
            set(currId);
        }
    };
    return retModule;
})
