var express = require('express');
var {exec }= require('child_process');
// const { stdout } = require('process');
var router = express.Router();
var cpuStat = require("cpu-stat");
const { Server } = require('http');
let {gpuManager,cpuManager,memoryManager} =require('../worker')


/* GET home page. */
router.get('/', function(req, res, next) {
  let home = "connection status, events....";
  let person= "app time records, personal record(if any)";
  let hardware= "CPU/RAM/GPU state";
  let todo = " Todo list:";
  res.render('index', { title: 'Wallpaper',
                        home:home,
                        person:person,
                        todo:todo
                      });

});



router.post("/folder",(req,res)=>{
    let input = req.body;
    console.log("hi");
    // let obj = JSON.parse(input);
    
    // return input;
    let k = null;
    let command = "tree -L 1 -J -I \"System Volume Information|.Trash-1000|*RECYCLE.BIN|Config.Msi|*.dll\" \""+input.folder+"\"";
    console.log(command);
    exec(command,(err,stdout,stderr)=>{
        res.send(stdout);
        // console.log(k);
    })
    // console.log(k);

    
    // res.send(input.folder);
});

router.post("/gpustat",(req,res)=>{
    // let input = req.body;
    res.send(JSON.stringify(gpuManager.GPUs,function(key, val) {
        return val.toFixed ? Number(val.toFixed(3)) : val;
    }));
});
router.post("/cpustat",(req,res)=>{
    res.send(JSON.stringify(cpuManager,function(key, val) {
        return val.toFixed ? Number(val.toFixed(3)) : val;
    }));
});
router.post('/ramstat',(req,res)=>{
    res.send(JSON.stringify(memoryManager,function(key, val) {
        return val.toFixed ? Number(val.toFixed(3)) : val;
    }));
})
router.get('/testview', function(req, res, next) {
    res.render('DataViewItem');
  
  });
  
module.exports = router;
