var config = require('../graphql_config.json');
var Promise = require('bluebird');
var google = require('@googleapis/youtube');
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


function youtubeAPI(resolveName, id, args){
    return new Promise((resolve,reject) =>{

        switch(resolveName){
            case 'search':
                youtube.search.list({
                    part: 				'id,snippet',
                    key: 				config.youtube.api_key,
                    maxResults:			args['maxResults'],
                    order:				args['order'],
                    publishedAfter:		args['publishedAfter'],
                    publishedBefore:	args['publishedBefore'],
                    q: 					args['q'],
                    type:				args['type'],
                }, (error, data) => {
                    if (error){
                        console.error(error);
                        reject(error);
                    }else{
                        resolve(data.items);
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
