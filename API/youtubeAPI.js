var config = require('../graphql_config.json');
var Promise = require('bluebird');
var google = require('@googleapis/youtube');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
    config.google.client_id,
    config.google.client_secret,
);

async function youtubeAPI(tokens, resolveName, id, args) {

    console.log(tokens);
    oauth2Client.setCredentials({
        access_token: tokens.googleaccesstoken,
        refresh_token: tokens.googlerefreshtoken,
    });

    var youtube = google.youtube({
        version: 'v3',
        auth:oauth2Client
    });

    try {
        const maxPages = args['maxPages'] - 1;
        delete args['pages']; // Clean up non-existent 'pages' argument

        let allItems = [];  // Initialize an empty array to hold all concatenated items

        switch(resolveName) {
            case 'search':
                let data = await youtube.search.list(args);
                allItems = allItems.concat(data.data.items);  // Concatenate initial items

                let currentPage = 0;
                let nextPageToken = data.data.nextPageToken;

                while (currentPage < maxPages && nextPageToken) {
                    const newArgs = { ...args, pageToken: nextPageToken };
                    const newData = await youtube.search.list(newArgs);
                    allItems = allItems.concat(newData.data.items);  // Safely concatenate new items

                    nextPageToken = newData.data.nextPageToken;  // Update the nextPageToken
                    currentPage++;
                }

                return allItems;

            case 'playlist':
                return (await youtube.playlists.list({
                    part: 'contentDetails,id,player,snippet,status',
                    id: id
                })).data.items;

            case 'channel':
                return (await youtube.channels.list({
                    part: 'invideoPromotion,brandingSettings,contentDetails,contentOwnerDetails,id,snippet,statistics,status,topicDetails',
                    id: id
                })).data.items;

            case 'video':
                return (await youtube.videos.list({
                    part: 'contentDetails,id,liveStreamingDetails,player,recordingDetails,snippet,statistics,status,topicDetails',
                    id: id
                })).data.items;

            case 'videoCommentThread':
                return (await youtube.commentThreads.list({
                    part: 'id,snippet',
                    videoId: id,
                    maxResults: args['maxResults'],
                    searchTerms: args['searchTerms']
                })).data.items;

            case 'channelCommentThread':
                return (await youtube.commentThreads.list({
                    part: 'id,snippet',
                    channelId: id,
                    maxResults: args['maxResults'],
                    searchTerms: args['searchTerms']
                })).data.items;

            default:
                throw new Error(`Unsupported resolveName: ${resolveName}`);
        }
    } catch (err) {
        console.error("An error occurred in the YouTube API call:", err);
        throw err;
    }
}

module.exports = youtubeAPI;
