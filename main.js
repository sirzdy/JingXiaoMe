const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const app = express();
const multer = require('multer');

const { transfer } = require('./server/transfer');
const { recognize } = require('./server/recognize');
const { guid, getSessionId } = require('./server/util');
const store = require('./server/store');



// app.use(express.static(path.join(__dirname, 'web')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// })

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./upload'));
    },
    filename: function (req, file, cb) {
        // cb(null, "upload.mp3");
        cb(null, Date.now() + '-' + guid() + ".mp3");
    }
})

var upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res, next) {
    let inFile = req.file.path;
    let outFile = req.file.path + '.pcm';
    transfer(inFile, outFile).then((stdout, stderr) => {
        // console.log(stdout, stderr);
        recognize(outFile).then((result) => {
            console.log(result.result[0]);
            res.json({ state: true, text: result.result });
        }).catch((err) => {
            // console.log('recognize-error', err);
            res.json({ state: false, err: 'recognize' });
        });
    }).catch((err) => {
        // console.log('transfer-error', err);
        res.json({ state: false, err: 'transfer' });
    })
    // res.send({ ret_code: '0' });
});

app.get('/login', function (req, res) {
    let code = req.query.code;
    console.log(code);
    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxaad9d7784edcf42d&secret=92237dc48b99c6d2bd24ce4656194e75&js_code=' + code + '&grant_type=authorization_code';
    request(url, function (error, response, body) {
        // console.log(error, response, body)
        if (!error && response.statusCode == 200) {
            let sessionId = getSessionId(body);
            store.set(sessionId, body);
            console.log(sessionId)
            store.get(sessionId, function (err, rs) {
                if (err) console.log(err);
                console.log(rs);
            })
            res.json({ state: true, sessionId });
        }
    })
})

app.get('/checkLogin', function (req, res) {
    let sessionId = req.headers['session-id'];
    console.log(sessionId);
    store.exists(sessionId, function (err, rs) {
        res.json({ state: rs });
    });
    // store.get(sessionId, function (err, rs) {
    //     if (err) res.json({ state: false });
    //     console.log(rs)
    //     console.log(JSON.parse(rs).openid);
    //     res.json({ state: true });
    // })
})

app.get('/logout', function (req, res) {
    let sessionId = req.headers['session-id'];
    console.log(sessionId);
    store.del(sessionId, function (err, rs) {
        if (err) res.json({ quit: false });
        console.log(rs);
        res.json({ quit: true });
    });
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
    console.log('=====================');
})