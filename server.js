/*
* @Author: Tom
* @Date:   2018-06-12 11:59:36
* @Last Modified by:   TomChen
* @Last Modified time: 2018-06-14 11:21:28
*/
/*
* @Author: TomChen
* @Date:   2018-05-24 18:08:59
* @Last Modified by:   TomChen
* @Last Modified time: 2018-05-27 10:23:22
*/
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var server = http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	res.setHeader("Access-Control-Allow-Origin","*");
	var urlStr = req.url;
	console.log("req url:::",urlStr);
	//如果请求的是/favicon.ico直接返回
	if(urlStr == '/favicon.ico'){
		res.statusCode = 404;
		res.end();
	}
	var arr = [
		{
			name:'一等奖',
		},
		{
			name:'二等奖',
		},
		{
			name:'三等奖',
		},	
		{
			name:'四等奖',
		},	
		{
			name:'五等奖',
		},									
	];
	var index = getRandomNum(0,arr.length-1);
	var num = getRandomNum(1000,9999);
	
	arr[index].name = num+arr[index].name;

	var strObj = JSON.stringify(arr[index]);

	var msg  = res.socket.remoteAddress+':::'+arr[index].name+'\n';
	
	fs.writeFile('test.txt',msg,{flag:'a'},(err)=>{
		if(err){
			console.log('write err::',err);
			res.end('{"name":"不好意思,我走神了,再来一次吧"}');
		}else{
			console.log('write ok');
			res.end(strObj);
		}
	})
	
	function getRandomNum(min,max){
		return Math.round(min + (max-min)*Math.random())
	}
});

server.listen(3000,'127.0.0.1',function(){
	console.log("server is running at http://127.0.0.1:3000");
})