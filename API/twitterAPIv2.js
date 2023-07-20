var { TwitterApi }  = require('twitter-api-v2');
var Promise = require('bluebird');
var querystring = require('querystring');    // parse query parameters
var bigInt = require("big-integer");


function twitterAPIv2(token, resolveName, id, args) {

    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new TwitterApi(token);

    // Tell typescript it's a readonly app
    const readOnlyClient = twitterClient.readOnly;

    return new Promise(async (resolve, reject) => {
        switch (resolveName) {
            case 'searchTweetV2':
                const jsTweets = await readOnlyClient.v2.search(args["q"], args);
                resolve(jsTweets.fetchLast(args["num"]))
                break;

            default:
                console.log('sorry we can\'t find matching resolve type:' + resolveName);
                resolve(null);
        }
    });
}

module.exports = twitterAPIv2;
