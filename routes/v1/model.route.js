var express = require('express');
const router = express.Router();
var spawn = require("child_process").spawn;


function callbackfxn(req, res) {
    var arr=["./hello.py",];
    (req.body.data).map((elem)=>{
        arr.push(elem);
    })
    var process = spawn('python', arr);
    process.stdout.on('data', function (data) {
        res.send(data.toString());
    })
}


router.post('/', callbackfxn);


