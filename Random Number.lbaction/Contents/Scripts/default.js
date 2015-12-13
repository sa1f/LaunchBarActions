// LaunchBar Action Script

function runWithString(string) {
    if (string == undefined) {
        // Inform the user that there was no argument
        LaunchBar.alert("Hey I'll need two numbers separated by a space");
    }
		else {
				var parts = string.split(" ");

				var result = HTTP.postJSON('https://api.random.org/json-rpc/1/invoke', {
						body: {
							"jsonrpc": "2.0",
							"method": "generateIntegers",
							"params": {
									"apiKey": "############INSERT RANDOM.ORG API KEY HERE##############",
									"n": 1,
									"min": 0,
									"max": string,
									"replacement": true
							},
							"id": 42

						}
				});

				var data = JSON.parse(result.data)
				var randNumber = data.result.random.data[0];

				LaunchBar.displayInLargeType({
					title: "Your random number is",
					string: randNumber
				})

    }
}
