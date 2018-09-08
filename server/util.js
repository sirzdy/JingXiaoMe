const crypto = require('crypto');

module.exports = {
    formatTime: function (time, type) {
        function fix(n) {
            return n < 10 ? '0' + n : n;
        }
        var time = new Date(time);
        if (type == 'date') {
            return time.getFullYear() + '-' + fix(time.getMonth() - 0 + 1) + '-' + fix(time.getDate());
        }
        if (type == 'time') {
            return fix(time.getHours()) + ':' + fix(time.getMinutes()) + ':' + fix(time.getSeconds());
        }
        return time.getFullYear() + '-' + fix(time.getMonth() - 0 + 1) + '-' + fix(time.getDate()) + ' ' + fix(time.getHours()) + ':' + fix(time.getMinutes()) + ':' + fix(time.getSeconds());
    },
    guid: function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    getSessionId: function (body) {
        let hash = crypto.createHmac('sha256', 'zhangdanyang');
        return hash.update(body).digest('hex');
    }
}