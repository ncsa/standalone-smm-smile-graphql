var google = require('@googleapis/youtube');
var OAuth2 = google.auth.OAuth2;

async function youtubeAPI(tokens, resolveName, id, args) {
    var oauth2Client = new OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
        access_token: tokens.googleaccesstoken,
    });

    var youtube = google.youtube({
        version: 'v3',
        auth:oauth2Client
    });

    try {
        const pages = args['pages'] - 1;
        delete args['pages']; // Clean up non-existent 'pages' argument

        let allItems = [];  // Initialize an empty array to hold all concatenated items

        switch(resolveName) {
            case 'search':
                var data = await youtube.search.list(args);
                allItems = allItems.concat(data.data.items);  // Concatenate initial items

                var currentPage = 0;
                var nextPageToken = data.data.nextPageToken;

                while (currentPage < pages && nextPageToken) {
                    const newArgs = { ...args, pageToken: nextPageToken };
                    const newData = await youtube.search.list(newArgs);
                    allItems = allItems.concat(newData.data.items);  // Safely concatenate new items

                    nextPageToken = newData.data.nextPageToken;  // Update the nextPageToken
                    currentPage++;
                }

                return allItems;

            case 'videosByHandle':
                try {
                    // Get youtuber's handle and find corresponding channel id
                    var handle = args["handle"];

                    // Fetch channel data using the handle
                    var channelData = await youtube.search.list({ part: 'snippet', q: handle, type: 'channel', order: 'relevance' });

                    if (channelData.data.items && channelData.data.items.length > 0) {
                        var channelId = channelData.data.items[0].snippet.channelId;
                        args["channelId"] = channelId;
                        delete args["handle"];

                        // Get videos belonging to that channel ID
                        var data = await youtube.search.list(args);
                        allItems = data.data.items;  // Initialize with initial items

                        var currentPage = 0;
                        var nextPageToken = data.data.nextPageToken;

                        while (currentPage < pages && nextPageToken) {
                            const newArgs = { ...args, pageToken: nextPageToken };
                            const newData = await youtube.search.list(newArgs);
                            allItems = allItems.concat(newData.data.items);  // Safely concatenate new items

                            nextPageToken = newData.data.nextPageToken;  // Update the nextPageToken
                            currentPage++;
                        }

                        return allItems;
                    } else {
                        throw new Error(`No channel found for handle: ${handle}`);
                    }
                } catch (error) {
                    console.error(`Error fetching videos for handle ${args["handle"]}:`, error.message);
                    throw error;
                }

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

            case 'videos':
                var data = await youtube.videos.list(args);
                allItems = allItems.concat(data.data.items);  // Concatenate initial items

                var currentPage = 0;
                var nextPageToken = data.data.nextPageToken;

                while (currentPage < pages && nextPageToken) {
                    const newArgs = { ...args, pageToken: nextPageToken };
                    const newData = await youtube.videos.list(newArgs);
                    allItems = allItems.concat(newData.data.items);  // Safely concatenate new items

                    nextPageToken = newData.data.nextPageToken;  // Update the nextPageToken
                    currentPage++;
                }

                return allItems;

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
