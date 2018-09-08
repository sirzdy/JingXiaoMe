const redis = require("redis");
const client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = {
    set: function (key, value) {
        client.set(key, value);
    },
    get: function (key, cb = () => { }) {
        client.get(key, cb);
    },
    del: function (key, cb = () => { }) {
        client.del(key, cb);
    },
    exists: function (key, cb = () => { }) {
        client.del(key, cb);
    }
}