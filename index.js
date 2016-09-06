var argv = require('minimist')(process.argv.slice(2));
var fetch = require('node-fetch');
var _ = require('lodash');
var url = require('url');

if (typeof argv.u !== "string") {
	console.log("username must be specified (-u ugnich)");
	return;
}

var messages = [];

function getBlogData(blogUrl, callback) {
	fetch(url.format(blogUrl))
		.then(function(res) {
			return res.json()
		})
		.then(function(msgs) {
			_.each(msgs, function(message) {
				messages.push(message);
			});
			if (msgs.length == 20) {
				blog.query.before_mid = msgs.slice(-1).pop().mid;
				setTimeout(getBlogData, 1000, blog, callback);
			} else {
				callback();
			}
		});
};

var blog = url.parse("https://api.juick.com/messages", true);
blog.query.uname = argv.u;

getBlogData(blog, function() {
	console.log(JSON.stringify(messages));
});
	
