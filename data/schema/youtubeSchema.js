var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} = require('graphql');
var youtubeAPI = require('../../API/youtubeAPI');

const youtubeQueryType = module.exports = new GraphQLObjectType({
    name: 'youtubeQuery',
    description: `A search result contains information about a YouTube video, channel, or playlist that matches the 
    search parameters specified in an API request. While a search result points to a uniquely identifiable resource, 
    like a video, it does not have its own persistent data.`,

    fields: () => ({
        search: {
            type: new GraphQLList(youtubeListType),
            args: {
                q: {
                    type: GraphQLString,
                    description: `The q parameter specifies the query term to search for.Your request can 
									also use the Boolean NOT (-) and OR (|) operators to exclude videos or to find 
									videos that are associated with one of several search terms.`
                },
                channelId: {
                    type: GraphQLString,
                    description: 'The channelId parameter indicates that the API response should only contain resources created by the channel'
                },
                channelType: {
                    type: GraphQLString,
                    description: 'any, show'
                },
                eventType: {
                    type: GraphQLString,
                    description: 'completed, live, upcoming'
                },
                order: {
                    type: GraphQLString,
                    description: 'date, rating, relevance, title, videoCount, viewCount',
                    defaultValue: 'relevance'
                },
                location: {
                    type: GraphQLString,
                    description: 'e.g.(37.42307,-122.08427)'
                },
                locationRadius: {
                    type: GraphQLString,
                    description: `Valid measurement units are m, km, ft, 
									and mi. For example, valid parameter values include 
									1500m, 5km, 10000ft, and 0.75mi. The API does not support 
									locationRadius parameter values larger than 1000 kilometers.`
                },
                maxResults: {
                    type: GraphQLInt,
                    defaultValue: 5, // TODO change to 50
                    description: 'Acceptable values are 0 to 50, inclusive. The default value is 5.'
                },
                publishedAfter: {
                    type: GraphQLString,
                    description: 'e.g. 1970-01-01T00:00:00Z'
                },
                publishedBefore: {
                    type: GraphQLString,
                    description: 'e.g. 1970-01-01T00:00:00Z'
                },
                type: {
                    type: GraphQLString,
                    defaultValue: 'playlist',
                    description: 'channel,playlist,video'
                }
                // forContentOwner:    args['forContentOwner'],
                // forDeveloper:       args['forDeveloper'],
                // forMine:            args['forMine'],
                // part: 				args['part'] ? args['part']: 'id,snippet',
                // channelId:			args['channelId'],
                // channelType:		args['channelType'] ? args['channelType'] : 'any',
                // eventType:			args['eventType'], // completed, live, upcoming
                // location:			args['location'], // (37.42307,-122.08427)
                // locationRadius:		args['locationRadius'], // 1500m, 5km, 10000ft, 0.75mi
                // order:				args['order'], // date, rating, relevance, title, videoCount, viewCount
                // maxResults:			args['maxResults'], // 0 to 50
                // onBehalfOfContentOwner: args['onBehalfOfContentOwner'], // string
                // pageToken:			args['pageToken'], // string
                // publishedAfter:		args['publishedAfter'], // 1970-01-01T00:00:00Z
                // publishedBefore:	args['publishedBefore'], // 1970-01-01T00:00:00Z
                // q: 					args['q'], // query term boolean NOT (-) OR (|)
                // regionCode:			args['regionCode'], // ISO 3166-1 alpha-2
                // relevanceLanguage:	args['relevanceLanguage'], // ISO 639-1
                // safeSearch:			args['safeSearch'], // moderate, none, strict
                // topicId:			args['topicId'], // string
                // type:				args['type'], // channel, playlist, video
                // videoCaption:		args['videoCaption'], // any, closedCaption, none
                // videoCategoryId:	args['videoCategoryId'], // string
                // videoDefinition:	args['videoDefinition'], // any, high, standard
                // videoDimension:		args['videoDimension'], // 2d, 3d, any
                // videoDuration:		args['videoDuration'], // any, long, medium, short
                // videoEmbeddable:	args['videoEmbeddable'], // any, true
                // videoLicense:		args['videoLicense'], // any, creativeCommon, youtube
                // videoSyndicated:	args['videoSyndicated'], // any, true
                // videoSyndicationType:args['videoSyndicationType'], // any, broadcast, none
                // videoType:			args['videoType'], // any, episode, movie
            },
            resolve: (_, args) => youtubeAPI(resolveName = 'search', id = '', args = args)
        }
    })
});

const youtubeListType = require('./youtube-type/youtubeListType');
