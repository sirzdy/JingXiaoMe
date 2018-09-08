const { exec } = require('child_process');

exports.transfer = function (inFile, outFile) {
    // ffmpeg -y  -i aidemo.mp3  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 16k.pcm 
    let cmd = 'ffmpeg -y  -i ' + inFile + ' -acodec pcm_s16le -f s16le -ac 1 -ar 16000 ' + outFile;
    // console.log(cmd);
    return new Promise(function (resolve, reject) {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                // console.error('err');
                reject(err);
                return;
            }
            // console.log('suc')
            // console.log(`stdout: ${stdout}`);
            // console.log(`stderr: ${stderr}`);
            // console.log(typeof stdout, stdout === '');
            resolve(stdout, stderr);
        });
    })
}