'use strict';
// 创建一个HTTP服务器
var http = require('http');

// 创建一个服务
var server = http.createServer(function(request, response) {
	// 有人请求就会执行此函数
	console.log(request.url);
	var requestUrl = request.url;
	switch(requestUrl) {
		case '/signin':
			// 请求登录页面
			signin(request, response);
			break;
		case '/post':
			// 表单提交
			post(request, response);
			break;
		default:
			response.writeHead(404, {});
			response.end();
	}
});

// 启动服务
// 监听一个8080端口
server.listen(8080, function(error) {
	console.log('成功监听8080端口');   // 先默认成功监听
});

function signin(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });

  response.write('<!DOCTYPE html>');
  response.write('<html lang="en">');
  response.write('<head>');
  response.write('  <meta charset="UTF-8">');
  response.write('  <title>登陆表单</title>');
  response.write('</head>');
  response.write('<body>');
  response.write('  <form action="/post" method="post">');
  response.write('      <p>');
  response.write('        <span>用户名</span>');
  response.write('          <input type="text" name="username">');
  response.write('      </p>');
  response.write('      <p>');
  response.write('        <span>密&nbsp&nbsp&nbsp码</span>');
  response.write('          <input type="password" name="password">');
  response.write('      </p>');
  response.write('        <p>');
  response.write('          <input type="submit">');
  response.write('        </p>');
  response.write('  </form>');
  response.write('</body>');
  response.write('');
  response.write('</html>');
  response.end();
}

var querystring = require('querystring');

function post(request, response) {
  // console.log('表单提交');
  var postData = ''; // http传递的都是字符串
  request.on('data', function(part) {
    postData += part;
  });
  request.on('end', function() {
    // username=admin&password=admin
    var obj = querystring.parse(postData); // 将字符串转换为对象
    console.log(obj);
  });
  response.end();
}