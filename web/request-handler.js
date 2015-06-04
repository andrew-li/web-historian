var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers.js');
var urlParser = require('url');
var http = require('http');


var sendResponse = function(response, data, statusCode, headers){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
};

/*
exports.collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(JSON.parse(data));
});
*/

var options = {
  host: '',
  path: ''
};

var actions = {
  'GET': function(request, response, pathname){
    console.log(pathname);
    var oldResponse = response;

    if (pathname === '/')
    {
      var fullPath = path.join(__dirname, '../web/public/index.html');
      httpHelpers.serveAssets(response, fullPath, function(err, html){
        if (err) throw err;
        httpHelpers.headers['Content-Type'] = 'text/html';
        sendResponse(response, html, undefined, httpHelpers.headers);
      });
    }
    else if (pathname === '/styles.css')
    {
      var fullPath = path.join(__dirname, '../web/public/styles.css');
      httpHelpers.serveAssets(response, fullPath, function(err, css){
        if (err) throw err;
        httpHelpers.headers['Content-Type'] = 'text/css';
        sendResponse(response, css, undefined, httpHelpers.headers);
      });
    }
    else
    {
      /*
      archive.isUrlInList('www.hackreactor.com', function(bool) {
         console.log(bool);
      });

      archive.isURLArchived('www.hackreactor.com', function(bool) {
         console.log(bool);
      });

      archive.addUrlToList('www.hackreactors.com');
      */

      archive.downloadUrls();
    }
    /*
    else if (pathname.slice(0,4) === "/www")
    {
      var callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
          httpHelpers.headers['Content-Type'] = 'text/html';
          sendResponse(oldResponse, str, undefined, httpHelpers.headers);
        });
      };

      options.host = pathname.slice(1);

      http.request(options, callback).end();
    }*/
  },
  'POST': function(request, response, pathname){
    console.log(pathname);
    //sendResponse(response, archive.paths.list, 201);

  },
  'OPTIONS': function(request, response, pathname){
    //sendResponse(response);
  }
};

exports.handleRequest = function (request, response) {

  var parts = urlParser.parse(request.url);

  var action = actions[request.method];
  if( action ){
    action(request, response, parts.pathname);
  } else {
    sendResponse(response, "Not Found", 404);
  }
};
