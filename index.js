const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const { exec } = require('child_process');

// app.use(express.static(path.join(__dirname, 'web')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})
// app.all('/upload', function (req, res) {
//     console.log(req)
// })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./upload'));
    },
    filename: function (req, file, cb) {
        cb(null, "upload.mp3");
        // cb(null, Date.now() + ".mp3");
    }
})

var upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res, next) {
    let uploadedPath = req.file.path;
    console.log(uploadedPath);
    let p = 'ffmpeg -y  -i upload/upload.mp3 -acodec pcm_s16le -f s16le -ac 1 -ar 16000 upload/16k.pcm';
    exec(p, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
    // var command = ffmpeg();
    // command
    //     .addInput(uploadedPath)
    //     .saveToFile('./upload/16k.pcm')
    //     .on('error', function (err) {
    //         console.log(err)
    //     })
    //     .on('end', function () {
    //         // //调用百度语音合成接口
    //         // var voice = fs.readFileSync('./public/audio/16k.wav');
    //         // var voiceBuffer = new Buffer(voice);
    //         // client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
    //         //     //console.log(result);
    //         //     var data = [];
    //         //     if (result.err_no === 0) {
    //         //         data = result.result;
    //         //     }
    //         //     res.json({
    //         //         ret: result.err_no,
    //         //         data: {
    //         //             data: data
    //         //         },
    //         //         msg: result.err_msg
    //         //     });
    //         // }, function (err) {
    //         //     console.log(err);
    //         // });
    //         // //语音识别 end

    //         // //删除上传的临时音频文件
    //         // fs.unlink(uploadedPath, function (err) {
    //         //     if (err) {
    //         //         console.log(uploadedPath + '文件删除失败');
    //         //         console.log(err);
    //         //     } else {
    //         //         console.log(uploadedPath + '文件删除成功');
    //         //     }
    //         // });
    //         // //删除mp3转成wav格式的音频
    //         // fs.unlink('./public/audio/16k.wav', function (err) {
    //         //     if (err) {
    //         //         console.log('16k.wav文件删除失败');
    //         //         console.log(err);
    //         //     } else {
    //         //         console.log('16k.wav文件删除成功');
    //         //     }
    //         // });
    //     });
    res.send({ ret_code: '0' });
});
app.listen(3000, () => {
    console.log('http://localhost:3000');
})