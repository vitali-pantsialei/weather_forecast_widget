define(['./workWithDate'], function (wDate) {
    var retModule = function (perPage, dataProvider) {
        var page = 1;
        var hourDay = 0;
        var inputData = dataProvider.getDailyJson();
        var hoursData = dataProvider.getHoursJson();
        var currId;
        var currState = 'hour';
        var fieldTemplate, buttonsTemplate, tabsTemplate, hoursTemplate;
        var today = new Date();
        var workWithDate = new wDate();

        var options = {
            weekday: "long", year: "numeric", month: "long",
            day: "numeric"
        };

        var refreshData = function () {
            var myfield = document.getElementById(currId);
            var load = myfield.getElementsByClassName('loading')[0];

            load.style.display = 'inline-block';

            inputData = dataProvider.getDailyJson();
            hoursData = dataProvider.getHoursJson();
            refreshHours();
            refreshDaily();

            //setTimeout(function() {load.style.display = 'none';}, 3000);
            load.style.display = 'none';
        }

        var back = function () {
            if (currState == 'day') {
                --page;
                refreshDaily();
            }
            else {
                --hourDay;
                refreshHours();
            }
        }

        var next = function () {
            if (currState == 'day') {
                ++page;
                refreshDaily();
            }
            else {
                ++hourDay;
                refreshHours();
            }
        }

        var setHours = function () {
            var field = document.getElementById(currId);
            var tab = field.getElementsByClassName('tabs');
            var lis = tab[0].getElementsByTagName('li');
            var tabInner = field.getElementsByClassName('tab-inner');
            var tabHour = tabInner[0].getElementsByClassName('item-hours')[0];
            var tabDay = tabInner[0].getElementsByClassName('item-days')[0];
            tabHour.style.display = 'block';
            tabDay.style.display = 'none';
            lis[0].className = 'active';
            lis[1].className = '';
            currState = 'hour';
            refreshHours();
        }

        var setDays = function () {
            var field = document.getElementById(currId);
            var tab = field.getElementsByClassName('tabs');
            var lis = tab[0].getElementsByTagName('li');
            var tabInner = field.getElementsByClassName('tab-inner');
            var tabHour = tabInner[0].getElementsByClassName('item-hours')[0];
            var tabDay = tabInner[0].getElementsByClassName('item-days')[0];
            tabHour.style.display = 'none';
            tabDay.style.display = 'block';
            lis[0].className = '';
            lis[1].className = 'active';
            currState = 'day';
            refreshDaily();
        }

        var set = function (id) {
            var field = document.getElementById(id);
            var index;
            currId = id;
            field.innerHTML = tabsTemplate.documentElement.innerHTML;
            var tabInner = field.getElementsByClassName('tab-inner');
            var tabHour = tabInner[0].getElementsByClassName('item-hours')[0];
            var tabDay = tabInner[0].getElementsByClassName('item-days')[0];
            var lis = field.getElementsByTagName('li');

            tabHour.innerHTML = "";
            tabDay.innerHTML = "";
            tabHour.innerHTML += hoursTemplate.documentElement.innerHTML;
            for (index = 0; index != perPage; index++)
                tabDay.innerHTML += fieldTemplate.documentElement.innerHTML;
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
            var tabInner = myfield.getElementsByClassName('tab-inner');
            var field = tabInner[0].getElementsByClassName('item-hours')[0];
            var index = 0, secIndex = 0, count = 8;
            var fieldsets = field.getElementsByTagName('fieldset');
            var currDate = new Date(today);
            var img = field.getElementsByTagName('img');
            var info = field.getElementsByClassName('info-style');
            var legend = field.getElementsByTagName('h2');
            var descr = field.getElementsByTagName('i');
            var temp = field.getElementsByClassName('badge');
            var otherInf = field.getElementsByClassName('info-style');
            var tds = field.getElementsByClassName('hour-forecast');

            currDate.setHours(0);
            currDate.setMinutes(0);
            currDate.setSeconds(0);
            currDate.setMilliseconds(0);

            currDate.setDate(currDate.getDate() + hourDay);

            while (workWithDate.getFormat2(currDate) != hoursData.list[secIndex].dt_txt.substr(0, 10))
                secIndex++;
            for (index = 0; index != count; ++index) {
                tds[index].style.display = 'table-row';
            }
            index = 0;
            while (workWithDate.getFormat1(currDate) != hoursData.list[secIndex].dt_txt) {
                tds[index++].style.display = 'none';
                currDate.setHours(currDate.getHours() + 3);
            }
            legend[0].innerHTML = hoursData.city.name + ", " + currDate.toLocaleDateString("en-US", options);
            while (index != count) {

                img[index].setAttribute('src', 'http://openweathermap.org/img/w/' + hoursData.list[secIndex].weather[0].icon + '.png');

                temp[index].innerHTML = hoursData.list[secIndex].main.temp + ' C';
                descr[index].innerHTML = hoursData.list[secIndex].weather[0].description;

                otherInf[index].innerHTML = hoursData.list[secIndex].wind.speed + ' m/s, ' + hoursData.list[secIndex].main.humidity + ' %, ' + hoursData.list[secIndex].main.pressure + ' hpa';

                currDate.setHours(currDate.getHours() + 3);
                index++;
                secIndex++;
            }
            if (currState == 'hour') {
                var buttons = myfield.getElementsByTagName('input');
                if (hourDay == 0) {
                    buttons[0].style.display = 'none';
                }
                else {
                    buttons[0].style.display = 'inline-block';
                }
                if (hourDay == 4) {
                    buttons[1].style.display = 'none';
                }
                else {
                    buttons[1].style.display = 'inline-block';
                }
            }
        }

        var refreshDaily = function () {
            var myfield = document.getElementById(currId);
            var tabInner = myfield.getElementsByClassName('tab-inner');
            var field = tabInner[0].getElementsByClassName('item-days')[0];
            var index, secIndex;
            var fieldsets = field.getElementsByTagName('fieldset');
            var currDate = new Date(today);
            var img = field.getElementsByTagName('img');
            var legend = field.getElementsByTagName('h2');
            var descr = field.getElementsByTagName('i');
            var dayTemp = field.getElementsByClassName('label label-day');
            var nightTemp = field.getElementsByClassName('label label-night');
            var otherInf = field.getElementsByClassName('info-style');

            for (index = 0; index != perPage; index++)
                fieldsets[index].style.display = 'block';

            for (index = (page - 1) * perPage, secIndex = 0; index != (inputData.list.length > page * perPage ? page * perPage : inputData.list.length) ; ++index, ++secIndex) {

                currDate = new Date(today);
                currDate.setDate(today.getDate() + index);
                legend[secIndex].innerHTML = inputData.city.name + ", " + currDate.toLocaleDateString("en-US", options);

                descr[secIndex].innerHTML = inputData.list[index].weather[0].description;

                img[secIndex].setAttribute('src', 'http://openweathermap.org/img/w/' + inputData.list[index].weather[0].icon + '.png');

                nightTemp[secIndex].innerHTML = inputData.list[index].temp.night + ' C';
                dayTemp[secIndex].innerHTML = inputData.list[index].temp.day + ' C';
                otherInf[secIndex * 2].innerHTML = inputData.list[index].speed + ' m/s';
                otherInf[secIndex * 2 + 1].innerHTML = 'clouds: ' + inputData.list[index].clouds + ' %, ' + inputData.list[index].pressure + ' hpa';
            }

            if (currState == 'day') {
                var buttons = myfield.getElementsByTagName('input');
                if (page != 1) {
                    buttons[0].style.display = 'inline-block';
                }
                else {
                    buttons[0].style.display = 'none';
                }
                if (inputData.list.length > page * perPage) {
                    buttons[1].style.display = 'inline-block';
                }
                else {
                    if ((inputData.list.length) % perPage != 0) {
                        for (index = (inputData.list.length) % perPage; index != perPage; index++)
                            fieldsets[index].style.display = 'none';
                    }
                    buttons[1].style.display = 'none';
                }
            }
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
