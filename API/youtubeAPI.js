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
                    forContentOwner:    args['forContentOwner'],
                    forDeveloper:       args['forDeveloper'],
                    forMine:            args['forMine'],
                    part: 				args['part'] ? args['part']: 'id,snippet',
                    channelId:			args['channelId'],
                    channelType:		args['channelType'] ? args['channelType'] : 'any',
                    eventType:			args['eventType'], // completed, live, upcoming
                    location:			args['location'], // (37.42307,-122.08427)
                    locationRadius:		args['locationRadius'], // 1500m, 5km, 10000ft, 0.75mi
                    order:				args['order'], // date, rating, relevance, title, videoCount, viewCount
                    maxResults:			args['maxResults'], // 0 to 50
                    onBehalfOfContentOwner: args['onBehalfOfContentOwner'], // string
                    pageToken:			args['pageToken'], // string
                    publishedAfter:		args['publishedAfter'], // 1970-01-01T00:00:00Z
                    publishedBefore:	args['publishedBefore'], // 1970-01-01T00:00:00Z
                    q: 					args['q'], // query term boolean NOT (-) OR (|)
                    regionCode:			args['regionCode'], // ISO 3166-1 alpha-2
                    relevanceLanguage:	args['relevanceLanguage'], // ISO 639-1
                    safeSearch:			args['safeSearch'], // moderate, none, strict
                    topicId:			args['topicId'], // string
                    type:				args['type'], // channel, playlist, video
                    videoCaption:		args['videoCaption'], // any, closedCaption, none
                    videoCategoryId:	args['videoCategoryId'], // string
                    videoDefinition:	args['videoDefinition'], // any, high, standard
                    videoDimension:		args['videoDimension'], // 2d, 3d, any
                    videoDuration:		args['videoDuration'], // any, long, medium, short
                    videoEmbeddable:	args['videoEmbeddable'], // any, true
                    videoLicense:		args['videoLicense'], // any, creativeCommon, youtube
                    videoSyndicated:	args['videoSyndicated'], // any, true
                    videoSyndicationType:args['videoSyndicationType'], // any, broadcast, none
                    videoType:			args['videoType'], // any, episode, movie
                }, (error, data) => {
                    if (error){
                        console.error(error);
                        reject(error);
                    }else{
                        resolve(data.data.items);
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
