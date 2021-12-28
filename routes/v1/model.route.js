var express = require('express');
const router = express.Router();
var spawn = require("child_process").spawn;


function callbackfxn(req, res) {
    var arr=["./python/ml_model.py"];
    (req.body.arr).map((elem)=>{
        arr.push(elem);
    })
    console.log('Array:', arr);
    var childProcess = spawn('python', arr);
    childProcess.stdout.on('data', function (data) {
        let vx=data.toString();
        console.log(typeof vx);
        res.json({crop_name: vx});
    })
    childProcess.stderr.on('data', function(data) {
        console.log('runs:', data.toString('utf8'))
    })
}


router.post('/', callbackfxn);

module.exports = router;
