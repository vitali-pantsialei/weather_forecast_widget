define([], function () {
    var retModule = function (perPage, dataProvider) {
        var page = 1;
        var inputData = dataProvider.getDailyJson();
        var currId;
        var fieldTemplate;
        var buttonsTemplate;
        var today = new Date();
        var options = {
            weekday: "long", year: "numeric", month: "long",
            day: "numeric"
        };
        var set = function (id) {
            currId = id;
            var field = document.getElementById(id);
            field.innerHTML = "";
            var index;
            for (index = 0; index != perPage; index++)
                field.innerHTML += fieldTemplate.documentElement.innerHTML;
            field.innerHTML += buttonsTemplate.documentElement.innerHTML;
            refresh();
        }

        var refresh = function () {
            var field = document.getElementById(currId);
            var index, secIndex;
            var fieldsets = field.getElementsByTagName('fieldset');
            var currDate = new Date(today);
            var img = field.getElementsByTagName('img');
            var centers = field.getElementsByTagName('center');
            var legend = field.getElementsByTagName('h2');
            var descr = field.getElementsByTagName('h4');

            for (index = 0; index != perPage; index++)
                fieldsets[index].setAttribute('style', 'display:block');

            for (index = (page - 1) * perPage, secIndex = 0; index != (inputData.list.length > page * perPage ? page * perPage : inputData.list.length) ; ++index, ++secIndex) {
                
                currDate.setDate(today.getDate() + index);
                legend[secIndex].innerHTML = inputData.city.name + ", " + currDate.toLocaleDateString("en-US", options);

                descr[secIndex * 2].innerHTML = inputData.list[index].weather[0].description;
                descr[secIndex * 2 + 1].innerHTML = inputData.list[index].weather[0].description;

                img[secIndex * 2].setAttribute('src', 'http://openweathermap.org/img/w/' + inputData.list[index].weather[0].icon + '.png');
                img[secIndex * 2 + 1].setAttribute('src', 'http://openweathermap.org/img/w/' + inputData.list[index].weather[0].icon + '.png');

                centers[secIndex * 6].innerHTML = inputData.list[index].temp.night;
                centers[secIndex * 6 + 1].innerHTML = inputData.list[index].pressure;
                centers[secIndex * 6 + 2].innerHTML = inputData.list[index].humidity;
                centers[secIndex * 6 + 3].innerHTML = inputData.list[index].temp.day;
                centers[secIndex * 6 + 4].innerHTML = inputData.list[index].pressure;
                centers[secIndex * 6 + 5].innerHTML = inputData.list[index].humidity;
            }

            var buttons = field.getElementsByTagName('input');
            if (page != 1) {
                buttons[0].setAttribute('style', 'display:block');
                buttons[0].setAttribute('onclick', 'weather.back()');
            }
            else {
                buttons[0].setAttribute('style', 'display:none');
            }
            if (inputData.list.length > page * perPage) {
                buttons[1].setAttribute('style', 'display:block');
                buttons[1].setAttribute('onclick', 'weather.next()');
            }
            else {
                if ((inputData.list.length) % perPage != 0) {
                    for (index = (inputData.list.length) % perPage; index != perPage; index++)
                        fieldsets[index].setAttribute('style', 'display:none');
                }
                buttons[1].setAttribute('style', 'display:none');
            }
            buttons[2].setAttribute('onclick', 'weather.refreshData()');
        }

        this.set = function (id) {
            set(id);
        }
        this.refreshData = function () {
            inputData = dataProvider.getDailyJson();
            refresh();
        }
        this.back = function () {
            --page;
            refresh();
        }
        this.next = function () {
            ++page;
            refresh();
        }

        fieldTemplate = document.implementation.createDocument('', 'html', null);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'scripts/weather_widget/content/fieldtemplate.html', false);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            fieldTemplate.documentElement.innerHTML = this.responseText;
        };
        xhr.send();

        buttonsTemplate = document.implementation.createDocument('', 'html', null);
        xhr.open('GET', 'scripts/weather_widget/content/buttonstemplate.html', false);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            buttonsTemplate.documentElement.innerHTML = this.responseText;
        };
        xhr.send();
    };
    return retModule;
})
