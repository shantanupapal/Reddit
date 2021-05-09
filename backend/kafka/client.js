"use strict";
var rpc = new (require("./kafkarpc"))();

//make request to kafka
const make_request = (queue_name, msg_payload, callback) => {
	rpc.makeRequest(queue_name, msg_payload, function (err, response) {
		if (err) {
			console.error("Error:", err);
			callback(err, null);
		} else {
			callback(null, response);
		}
	});
};

exports.make_request = make_request;
