request = require('request');

var api = {}

// make a request with the specified query
api.call = function (query, cb) {
  var fullQuery = 'https://hn.algolia.com/api/v1/' + query;
  request(fullQuery, function (error, response, body) {
    if (!error && !response.statusCode == 200)
      error = response.statusCode;
    if (typeof body !== 'undefined')
      body = JSON.parse(body);
    cb(error, body);
  });
}

// basic searches
api.getItem = function (id, cb) {
  api.call('items/' + id, cb);
}

api.getUser = function (username, cb) {
  api.call('users/' + username, cb)
}

api.getLastStories = function (cb) {
  api.call('search_by_date?tags=story', cb);
}

api.getLastPolls = function (cb) {
  api.call('search_by_date?tags=poll', cb);
}

api.getLastPosts = function (cb) {
  api.call('search_by_date?tags=(story,poll)', cb);
}

api.getUserStories = function (username, cb) {
  api.call('search?tags=story,author_' + username, cb);
}

api.searchStories = function (search, cb) {
  api.call('search?query=' + search + '&tags=story', cb);
}

api.searchPolls = function (search, cb) {
  api.call('search?query=' + search + '&tags=poll', cb);
}

api.search = function (obj, cb) {
  var first = true;
  var params = '';
  for (var key in obj) {
    if (first) {
      params += '?';
      first = false;
    } else {
      params += '&';
    }
    params += key + '=' + obj[key];
  }
  api.call('search' + params, cb);
}


api.search({
  query: 'javascript',
  tags: 'poll'
}, function (error, data) {
  if (error)
    throw error;
  console.log(data);
});
