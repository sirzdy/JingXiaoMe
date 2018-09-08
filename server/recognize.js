const fs = require('fs');

const AipSpeechClient = require("baidu-aip-sdk").speech;
const APP_ID = "11671102";
const API_KEY = "AVebL0WxaveNOP2proAf5L8M";
const SECRET_KEY = "daDO6IIEDEvLL9bSZKWzoOAqqa6AWp23";
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

exports.recognize = function (file) {
    let voice = fs.readFileSync(file);
    let voiceBuffer = new Buffer(voice);
    return new Promise(function (resolve, reject) {
        client.recognize(voiceBuffer, 'pcm', 16000).then(function (result) {
            // console.log('<recognize>: ' + JSON.stringify(result));
            resolve(result);
        }, function (err) {
            // console.log(err);
            reject(err);
        });
    })
}