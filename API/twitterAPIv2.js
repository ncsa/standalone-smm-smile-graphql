var { TwitterApi }  = require('twitter-api-v2');


async function twitterAPIv2(tokens, resolveName, id, args) {

    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new TwitterApi(tokens.twtbearertoken);

    // Tell typescript it's a readonly app
    const readOnlyClient = twitterClient.readOnly;

    switch (resolveName) {
        case 'searchTweetV2':
            const jsTweets = await readOnlyClient.v2.search(args["q"],
                { 'tweet.fields':
                    'attachments,author_id,context_annotations,conversation_id,created_at,edit_controls,entities,' +
                        'in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,reply_settings,source,withheld'
                });
            return jsTweets.fetchLast(args["additional_num"])

        case 'searchTimelineV2':
            const jsTimeline = await readOnlyClient.v2.userTimeline(args["userId"],
                { 'tweet.fields':
                        'attachments,author_id,context_annotations,conversation_id,created_at,edit_controls,entities,' +
                        'in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,reply_settings,source,withheld'
                });
            return jsTimeline.fetchLast(args["additional_num"])

        default:
            console.log('sorry we can\'t find matching resolve type:' + resolveName);
            return null;
    }
}

module.exports = twitterAPIv2;
