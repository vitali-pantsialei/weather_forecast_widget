define([], function () {
    var retModule = function (perPage, dataProvider) {
        var page = 1;
        var inputData = dataProvider.getDailyJson();
        var hoursData = dataProvider.getHoursJson();
        var currId;
        var currState = 'hour';
        var fieldTemplate, buttonsTemplate, tabsTemplate, hoursTemplate;
        var today = new Date();
        var options = {
            weekday: "long", year: "numeric", month: "long",
            day: "numeric"
        };
        var refreshData = function () {
            inputData = dataProvider.getDailyJson();
            hoursData = dataProvider.getHoursJson();
            refreshDaily();
        }
        var back = function () {
            --page;
            refreshDaily();
        }
        var next = function () {
            ++page;
            refreshDaily();
        }
        var setHours = function () {
            var field = document.getElementById(currId);
            var tab = field.getElementsByClassName('tabs');
            var lis = tab[0].getElementsByTagName('li');
            var tabInner = field.getElementsByClassName('tabInner');
            var divs = tabInner[0].getElementsByTagName('div');
            var buttons = field.getElementsByTagName('input');
            divs[0].setAttribute('style', 'display:block');
            divs[1].setAttribute('style', 'display:none');
            lis[0].setAttribute('class', 'active');
            lis[1].setAttribute('class', '');
            buttons[0].setAttribute('style', 'display:none');
            buttons[1].setAttribute('style', 'display:none');
            currState = 'hour';
        }
        var setDays = function () {
            var field = document.getElementById(currId);
            var tab = field.getElementsByClassName('tabs');
            var lis = tab[0].getElementsByTagName('li');
            var tabInner = field.getElementsByClassName('tabInner');
            var divs = tabInner[0].getElementsByTagName('div');
            divs[0].setAttribute('style', 'display:none');
            divs[1].setAttribute('style', 'display:block');
            lis[0].setAttribute('class', '');
            lis[1].setAttribute('class', 'active');
            currState = 'day';
            refreshDaily();
        }

        var set = function (id) {
            var field = document.getElementById(id);
            var index;
            currId = id;
            field.innerHTML = tabsTemplate.documentElement.innerHTML;
            var tabInner = field.getElementsByClassName('tabInner');
            var tabDivs = tabInner[0].getElementsByTagName('div');
            var lis = field.getElementsByTagName('li');

            tabDivs[0].innerHTML = "";
            tabDivs[1].innerHTML = "";
            for (index = 0; index != 5; index++)
                tabDivs[0].innerHTML += hoursTemplate.documentElement.innerHTML;
            for (index = 0; index != perPage; index++)
                tabDivs[1].innerHTML += fieldTemplate.documentElement.innerHTML;
            field.innerHTML += buttonsTemplate.documentElement.innerHTML;

            var buttons = field.getElementsByTagName('input');
            lis[0].onclick = setHours;
            lis[1].onclick = setDays;
            buttons[0].onclick = back;
            buttons[1].onclick = next;
            buttons[2].onclick = refreshData;
            setHours();
            refreshHours();
            refreshDaily();
        }
        
        var refreshHours = function () {
            var myfield = document.getElementById(currId);
            var tabInner = myfield.getElementsByClassName('tabInner');
            var field = tabInner[0].getElementsByTagName('div')[0];
            var index = 0, secIndex = 0;
            var fieldsets = field.getElementsByTagName('fieldset');
            var currDate = new Date(today);
            var img = field.getElementsByTagName('img');
            var centers = field.getElementsByTagName('center');
            var legend = field.getElementsByTagName('h2');
            var descr = field.getElementsByTagName('h4');
            var tds = field.getElementsByTagName('td');

            currDate.setHours(0);
            currDate.setMinutes(0);
            currDate.setSeconds(0);
            currDate.setMilliseconds(0);
            while (getFormat2(currDate) != hoursData.list[secIndex].dt_txt.substr(0, 10))
                secIndex++;
            while (getFormat1(currDate) != hoursData.list[secIndex].dt_txt) {
                tds[index++].setAttribute('style', 'display:none');
                currDate.setHours(currDate.getHours() + 3);
            }

        }

        var refreshDaily = function () {
            var myfield = document.getElementById(currId);
            var tabInner = myfield.getElementsByClassName('tabInner');
            var field = tabInner[0].getElementsByTagName('div')[1];
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

            if (currState == 'day') {
                var buttons = myfield.getElementsByTagName('input');
                if (page != 1) {
                    buttons[0].setAttribute('style', 'display:block');
                }
                else {
                    buttons[0].setAttribute('style', 'display:none');
                }
                if (inputData.list.length > page * perPage) {
                    buttons[1].setAttribute('style', 'display:block');
                }
                else {
                    if ((inputData.list.length) % perPage != 0) {
                        for (index = (inputData.list.length) % perPage; index != perPage; index++)
                            fieldsets[index].setAttribute('style', 'display:none');
                    }
                    buttons[1].setAttribute('style', 'display:none');
                }
            }
        }

        var withZero = function (input) {
            if (input < 10)
                return '0' + input;
            else
                return input;
        }

        var getFormat1 = function (dateTime) {
            return dateTime.getFullYear() + '-' + withZero(dateTime.getMonth() + 1) + '-' + withZero(dateTime.getDate()) + ' ' + withZero(dateTime.getHours()) + ':' + withZero(dateTime.getMinutes()) + ':' + withZero(dateTime.getSeconds());
        }

        var getFormat2 = function (dateTime) {
            return dateTime.getFullYear() + '-' + withZero(dateTime.getMonth() + 1) + '-' + withZero(dateTime.getDate());
        }

        this.set = function (id) {
            set(id);
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

        tabsTemplate = document.implementation.createDocument('', 'html', null);
        xhr.open('GET', 'scripts/weather_widget/content/tabstemplate.html', false);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            tabsTemplate.documentElement.innerHTML = this.responseText;
        };
        xhr.send();

        hoursTemplate = document.implementation.createDocument('', 'html', null);
        xhr.open('GET', 'scripts/weather_widget/content/hourstemplate.html', false);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            hoursTemplate.documentElement.innerHTML = this.responseText;
        };
        xhr.send();
    };
    return retModule;
})
