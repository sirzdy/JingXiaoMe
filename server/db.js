const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'peakshine',
    database: 'JingXiaoMe'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

/* 查询 */
let que = 'select * from user';
connection.query(que, function (error, results, fields) {
    if (error) throw error;
    console.log(results[0])
    results.forEach(r => {
        console.log(JSON.stringify(r));
    })
});

/* 增加 */
let add = 'insert into user (id,nickname) values (6,"京小蜜") ';
let upd = '';
connection.query(add, function (error, results, fields) {
    if (error) throw error;
    console.log(results.affectedRows)
});

/* 删除 */
let del = 'delete from user where id=6';
connection.query(del, function (error, results, fields) {
    if (error) throw error;
    console.log(results.affectedRows)
});

/* 修改 */
let upd = 'update user set nickname=\'JingXiaoMe\' where id=6';
connection.query(upd, function (error, results, fields) {
    if (error) throw error;
    console.log(results.affectedRows)
});