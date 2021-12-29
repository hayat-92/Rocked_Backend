var express = require('express');
const router = express.Router();
const auth=require('../../middleware/auth');
var spawn = require("child_process").spawn;
const User=require("../../model/User")
const httpStatus = require("http-status");


async function callbackfxn(req, res) {
    var arr=["./python/ml_model.py"];
    (req.body.arr).map((elem)=>{
        arr.push(elem);
    })
    console.log('Array:', arr);
    var childProcess = spawn('python', arr);
    console.log(req.user)
    childProcess.stdout.on('data', function (data) {
        let vx=data.toString();
        let userElem=User.findOne({email:req.user.email});
        let obj={details:[...(req.body.arr)], cropsuggested:vx};
        userElem.history.push(obj);
        

        res.json({crop_name: vx});
    })
    childProcess.stderr.on('data', function(data) {
        console.log('runs:', data.toString('utf8'))
    })
}

async function newcallback(req, res){
    let userElem=await User.findOne({email:req.user.email});
    let hist=await userElem.history;
    console.log(hist);
    res.status(httpStatus.FOUND).json({history:hist});
}


router.post('/', auth(), callbackfxn);
router.get('/history', auth(), newcallback);

module.exports = router;
