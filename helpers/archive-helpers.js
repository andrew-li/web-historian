var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){ //filename
//gets the file as a string and splits it into lines
  fs.readFile(exports.paths.list, function(err, text){
    if (err) throw err;
    callback(text.toString().split('\n'));
  });
};

exports.isUrlInList = function(target, callback){ //url, filename
//checks if url is in the list
  exports.readListOfUrls(function(data){
    var bool = false;
    for(var i = 0; i < data.length; ++i)
    {
      if(data[i].indexOf(target) >= 0)
      {
        bool = true;
        break;
      }
    }
    callback(bool);
  });
};

exports.addUrlToList = function(target){ //url, filename
//adds url to the list
////defaults archived to no
  exports.isUrlInList(target, function(bool) {
    if(bool === false)
    {
      fs.appendFile(exports.paths.list, target + ', 0\n', function (err) {
        if (err) throw err;
      });
    }
  });
};

exports.isURLArchived = function(target, callback){ //url, filename
//checks if url is archived
  exports.readListOfUrls(function(data){
    var bool = false;
    for(var i = 0; i < data.length; ++i)
    {
      if(data[i].indexOf(target + ', 1') >= 0)
      {
        bool = true;
        break;
      }
    }
    callback(bool);
  });
};

/*
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
      }

      options.host = pathname.slice(1);

      http.request(options, callback).end();
*/

exports.downloadUrls = function(callback){ //filename
//does the get request and saves the str as a file
//updates no to yes
  exports.readListOfUrls(function(data){
    for(var i = 0; i < data.length; ++i)
    {
      if(data[i].charAt(data[i].length - 1) === '0')
      {
        console.log("here");
      }
    }
    callback(bool);
  });
};
