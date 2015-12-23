function runWithString(string) {
    if (string == undefined) {
			LaunchBar.alert("Hey I'll need two numbers separated by a space");
    }
		else if (string.match(/^([a-z0-9]){8}-([a-z0-9]){4}-([a-z0-9]){4}-([a-z0-9]){4}-([a-z0-9]){12}$/g)) {
			var apiKey = {
				"key" : string
			};
			try {
				File.writeJSON(apiKey, Action.supportPath + "/key.json");
			} catch (exception) {
				LaunchBar.alert('Error while writing JSON: ' + exception);
			}
		}
		else {
				var parts = string.split(" ");

				if (File.isReadable(Action.supportPath + "/key.json")) {
					var keyJSON = File.readJSON(Action.supportPath + "/key.json");
				}

				if (parts.length != 2) {
					parts[1] = parts[0];
					parts[0] = 1;
				}

				var result = HTTP.postJSON('https://api.random.org/json-rpc/1/invoke', {
						body: {
							"jsonrpc": "2.0",
							"method": "generateIntegers",
							"params": {
									"apiKey": keyJSON.key,
									"n": 1,
									"min": parts[0],
									"max": parts[1],
									"replacement": true
							},
							"id": 42

						}
				});

				var data = JSON.parse(result.data)
				var randNumber = data.result.random.data[0];


				return [{title : String(randNumber), icon: 'iconTemplate.pdf'}];
    }
}
