define([], function () {
    return function () {
        var withZero = function (input) {
            if (input < 10)
                return '0' + input;
            else
                return input;
        }

        this.getFormat1 = function (dateTime) {
            return dateTime.getFullYear() + '-' + withZero(dateTime.getMonth() + 1) + '-' + withZero(dateTime.getDate()) + ' ' + withZero(dateTime.getHours()) + ':' + withZero(dateTime.getMinutes()) + ':' + withZero(dateTime.getSeconds());
        }

        this.getFormat2 = function (dateTime) {
            return dateTime.getFullYear() + '-' + withZero(dateTime.getMonth() + 1) + '-' + withZero(dateTime.getDate());
        }
    }
})