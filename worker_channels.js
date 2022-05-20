const {MessageChannel} = require('worker_threads');
var GPUchannels = new MessageChannel();
var GPUReciever = GPUchannels.port1;
var GPUTransiver = GPUchannels.port2;
module.exports = {GPUReciever,GPUTransiver};