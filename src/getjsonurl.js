const https = require("https");


safeJsonParse = (string) => {
    try {
        const json = JSON.parse(string);
        return {
            json: json,
            err: ""
        };
    } catch (err) {
        return {
            json: null,
            err: "JSON Parse error: ".concat(err)
        };
    }
}


getRawJSON = (url) => {
    return new Promise(function (resolve, reject) {
        https
            .get(url, function (res) {
                res.on("data", function (chunk) {
                    const { json, err } = safeJsonParse(chunk);
                    if (json == null) {
                        reject(err);
                    }
                    else {
                        resolve(json);
                    }
                }).on("error", function (err) {
                    reject("Error in retrivieing chunk.");
                });
            }).on("error", function (err) {
                reject("Host error.");
            });
    });
}

module.exports = { getRawJSON }