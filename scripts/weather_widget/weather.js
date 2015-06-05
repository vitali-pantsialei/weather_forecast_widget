define([], function () {
    var retModule = function (perPage, dataProvider) {
        var page = 1;
        var inputData = dataProvider.getDailyJson();
        var hoursData = dataProvider.getHoursJson();
        var currId;
        var fieldTemplate, buttonsTemplate, tabsTemplate, hoursTemplate;
        var today = new Date();
        var options = {
            weekday: "long", year: "numeric", month: "long",
            day: "numeric"
        };
        var refreshData = function () {
            inputData = dataProvider.getDailyJson();
            hoursData = dataProvider.getHoursJson();
            refresh();
        }
        var back = function () {
            --page;
            refresh();
        }
        var next = function () {
            ++page;
            refresh();
        }
        var setHours = function () {
            var field = document.getElementById(currId);
            var tab = field.getElementsByClassName('tabs');
            var lis = tab[0].getElementsByTagName('li');
            var tabInner = field.getElementsByClassName('tabInner');
            var divs = tabInner[0].getElementsByTagName('div');
            divs[0].setAttribute('style', 'display:block');
            divs[1].setAttribute('style', 'display:none');
            lis[0].setAttribute('class', 'active');
            lis[1].setAttribute('class', '');
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
        }

        var set = function (id) {
            var field = document.getElementById(id);
            var index;
            currId = id;
            field.innerHTML = tabsTemplate.documentElement.innerHTML;
            var tabInner = field.getElementsByClassName('tabInner');
            var tabDivs = tabInner[0].getElementsByTagName('div');
            var lis = field.getElementsByTagName('li');
            setHours();

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
            refresh();
        }
        var refresh = function () {
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
