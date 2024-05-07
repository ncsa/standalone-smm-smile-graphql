var config = require('../graphql_config.json');
var Promise = require('bluebird');
var google = require('@googleapis/youtube');
const querystring = require("querystring");
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
    config.youtube.client_id,
    config.youtube.client_secret,
    config.youtube.callback
);

oauth2Client.setCredentials({
    access_token: config.youtube.access_token,
    refresh_token: config.youtube.refresh_token
});

var youtube = google.youtube({
    version: 'v3',
    auth:oauth2Client
});


function WaterfallOver(max_pages, data, iterator, callback) {

    var nextItemIndex = 0;  //keep track of the index of the next item to be processed

    function report(item) {

        nextItemIndex++;
        if (nextItemIndex === max_pages || !("data" in data) || !('nextPageToken' in data.data))
            callback(); //if all the reports are back, great! resolve the result
        else
            iterator(item, report); //keep iterate
    }

    // instead of starting all the iterations, we only start the 1st one
    iterator(data, report);
}

function youtubeAPI(resolveName, id, args){
    return new Promise((resolve,reject) =>{
        var max_pages = args['pages'] - 1;
        delete args['pages']; //pages is a made up field to control pagination

        switch(resolveName){
            case 'search':
                    youtube.search.list(args, (error, data) => {
                    if (error){
                        console.error(error);
                        reject(error);
                    }
                    if (max_pages === 0 || !("data" in data) || !('nextPageToken' in data.data)) {
                        resolve(data.data.items);
                    } else {
                        var result = data;
                        // be careful! async iteration!!!
                        // args[pages] is the maximum page you want to iterate over
                        WaterfallOver(max_pages, data, function (item, report) {

                            var nextPageToken = data.data.nextPageToken;
                            var newArgs = Object.assign(args, {pageToken: nextPageToken});
                            youtube.search.list(newArgs, (error, newData) => {
                                if (error) {
                                    console.error(error);
                                    reject(error);
                                }

                                result.data.item = item.data.item.concat(newData.data.items);
                                report(item);

                            })
                        }, function () {
                            resolve(result.data);
                        });
                    }
                });
                break;

            case 'playlist':
                youtube.playlists.list({
                    part: 'contentDetails,id,player,snippet,status',
                    id: id
                }, function (err, data) {
                    if (err){
                        console.error(err);
                        reject(err);
                    }else{
                        resolve(data.items);
                    }
                });
                break;

            case 'channel':
                youtube.channels.list({
                    part: 'invideoPromotion,brandingSettings,contentDetails,contentOwnerDetails,id,snippet,statistics,status,topicDetails',
                    id: id
                }, function (err, data) {
                    if (err){
                        console.error(err);
                        reject(err);
                    }else{
                        resolve(data.items);
                    }
                });
                break;

            case 'video':
                youtube.videos.list({
                    part: `contentDetails,id,liveStreamingDetails,player,
					recordingDetails,snippet,statistics,status,topicDetails`,
                    id: id
                }, function (err, data) {
                    if (err){
                        console.error(err);
                        reject(err);
                    }else{
                        //console.log(data.items);
                        resolve(data.items);
                    }
                });
                break;

            case 'videoCommentthread':
                youtube.commentThreads.list({
                    part:'id,snippet',
                    videoId: id,
                    maxResults: args['maxResults'],
                    searchTerms:args['searchTerms']
                }, function(err,data){
                    if (err){
                        console.error(err);
                        reject(err);
                    }else{
                        resolve(data.items);
                    }
                });
                break;

            case 'channelCommentthread':
                youtube.commentThreads.list({
                    part:'id,snippet',
                    channelId: id,
                    maxResults: args['maxResults'],
                    searchTerms:args['searchTerms']
                }, function(err,data){
                    if (err){
                        console.error(err);
                        reject(err);
                    }else{
                        console.error(data.items);
                        resolve(data.items);
                    }
                });
                break;
        }
    })
}

module.exports = youtubeAPI;
