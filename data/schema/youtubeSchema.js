var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt, GraphQLBoolean,
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
                forContentOwner: {
                    type: GraphQLBoolean,
                    description: 'boolean for content owner'
                },
                forDeveloper: {
                    type: GraphQLBoolean,
                    description: 'boolean for developer'
                },
                forMine: {
                    type: GraphQLBoolean,
                    description: 'boolean for mine'
                },
                part: {
                    type: GraphQLString,
                    description: 'The part parameter specifies a comma-separated list of one or more search resource properties that the API response will include. The part names that you can include in the parameter value are id and snippet.',
                    defaultValue: 'id,snippet'
                },
                channelId:{
                    type: GraphQLString,
                    description: 'The channelId parameter indicates that the API response should only contain resources created by the channel'
                },
                channelType:{
                    type: GraphQLString,
                    description: 'any, show',
                    defaultValue: 'any'
                },
                eventType: {
                    type: GraphQLString,
                    description: 'completed, live, upcoming',
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
                    defaultValue: 50,
                    description: 'Acceptable values are 0 to 50, inclusive. The default value is 5.'
                },
                pages: {
                    type: GraphQLInt,
                    defaultValue: 1,
                    description: 'The maximum number of pages to iterate over' // a made up page to control pagination
                },
                onBehalfOfContentOwner: {
                    type: GraphQLString,
                    description:"This parameter can only be used in a properly authorized request. Note: This parameter is intended exclusively for YouTube content partners."
                },
                pageToken:{
                    type: GraphQLString,
                    description: 'The pageToken parameter identifies a specific page in the result set that should be returned.'
                },
                publishedAfter: {
                    type: GraphQLString,
                    description: 'e.g. 1970-01-01T00:00:00Z'
                },
                publishedBefore: {
                    type: GraphQLString,
                    description: 'e.g. 1970-01-01T00:00:00Z'
                },
                regionCode:{
                    type: GraphQLString,
                    description: 'ISO 3166-1 alpha-2'
                },
                relevanceLanguage: {
                    type: GraphQLString,
                    description: 'ISO 639-1'
                },
                safeSearch: {
                    type: GraphQLString,
                    description: 'moderate, none, strict'
                },
                topicId: {
                    type: GraphQLString,
                    description: 'e.g. /m/04rlf'
                },
                type: {
                    type: GraphQLString,
                    defaultValue: 'video',
                    description: 'channel,playlist,video'
                },
                videoCaption: {
                    type: GraphQLString,
                    description: 'any, closedCaption, none',
                    defaultValue: 'any'
                },
                videoCategoryId: {
                    type: GraphQLString,
                    description: 'e.g. 10'
                },
                videoDefinition: {
                    type: GraphQLString,
                    description: 'any, high, standard',
                    defaultValue: 'any'
                },
                videoDimension: {
                    type: GraphQLString,
                    description: '2d, 3d, any',
                    defaultValue: 'any'
                },
                videoDuration: {
                    type: GraphQLString,
                    description: 'any, long, medium, short',
                    defaultValue: 'any'
                },
                videoEmbeddable: {
                    type: GraphQLString,
                    description: 'any, true',
                    defaultValue: 'any'
                },
                videoLicense:{
                    type: GraphQLString,
                    description: 'any, creativeCommon, youtube',
                    defaultValue: 'any'
                },
                videoSyndicated: {
                    type: GraphQLString,
                    description: 'any, true',
                    defaultValue: 'any'
                },
                videoSyndicationType:{
                    type: GraphQLString,
                    description: 'any, broadcast, none',
                    defaultValue: 'any'
                },
                videoType: {
                    type: GraphQLString,
                    description: 'any, episode, movie',
                    defaultValue: 'any'
                }
            },
            resolve: (_, args, context) => youtubeAPI(context, resolveName = 'search', id = '', args = args)
        },
        randomSearch: {
            type: new GraphQLList(youtubeListType),
            args: {
                forContentOwner: {
                    type: GraphQLBoolean,
                    description: 'boolean for content owner'
                },
                forDeveloper: {
                    type: GraphQLBoolean,
                    description: 'boolean for developer'
                },
                forMine: {
                    type: GraphQLBoolean,
                    description: 'boolean for mine'
                },
                part: {
                    type: GraphQLString,
                    description: 'The part parameter specifies a comma-separated list of one or more search resource properties that the API response will include. The part names that you can include in the parameter value are id and snippet.',
                    defaultValue: 'id,snippet'
                },
                channelId:{
                    type: GraphQLString,
                    description: 'The channelId parameter indicates that the API response should only contain resources created by the channel'
                },
                channelType:{
                    type: GraphQLString,
                    description: 'any, show',
                    defaultValue: 'any'
                },
                eventType: {
                    type: GraphQLString,
                    description: 'completed, live, upcoming',
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
                    defaultValue: 50,
                    description: 'Acceptable values are 0 to 50, inclusive. The default value is 5.'
                },
                maxTotalResults: {
                    type: GraphQLInt,
                    defaultValue: 50,
                    description: 'The maximum number of total results to return' // a made up page to control pagination
                },
                onBehalfOfContentOwner: {
                    type: GraphQLString,
                    description:"This parameter can only be used in a properly authorized request. Note: This parameter is intended exclusively for YouTube content partners."
                },
                pageToken:{
                    type: GraphQLString,
                    description: 'The pageToken parameter identifies a specific page in the result set that should be returned.'
                },
                publishedAfter: {
                    type: GraphQLString,
                    description: 'e.g. 1970-01-01T00:00:00Z'
                },
                publishedBefore: {
                    type: GraphQLString,
                    description: 'e.g. 1970-01-01T00:00:00Z'
                },
                regionCode:{
                    type: GraphQLString,
                    description: 'ISO 3166-1 alpha-2'
                },
                relevanceLanguage: {
                    type: GraphQLString,
                    description: 'ISO 639-1'
                },
                safeSearch: {
                    type: GraphQLString,
                    description: 'moderate, none, strict'
                },
                topicId: {
                    type: GraphQLString,
                    description: 'e.g. /m/04rlf'
                },
                type: {
                    type: GraphQLString,
                    defaultValue: 'video',
                    description: 'channel,playlist,video'
                },
                videoCaption: {
                    type: GraphQLString,
                    description: 'any, closedCaption, none',
                    defaultValue: 'any'
                },
                videoCategoryId: {
                    type: GraphQLString,
                    description: 'e.g. 10'
                },
                videoDefinition: {
                    type: GraphQLString,
                    description: 'any, high, standard',
                    defaultValue: 'any'
                },
                videoDimension: {
                    type: GraphQLString,
                    description: '2d, 3d, any',
                    defaultValue: 'any'
                },
                videoDuration: {
                    type: GraphQLString,
                    description: 'any, long, medium, short',
                    defaultValue: 'any'
                },
                videoEmbeddable: {
                    type: GraphQLString,
                    description: 'any, true',
                    defaultValue: 'any'
                },
                videoLicense:{
                    type: GraphQLString,
                    description: 'any, creativeCommon, youtube',
                    defaultValue: 'any'
                },
                videoSyndicated: {
                    type: GraphQLString,
                    description: 'any, true',
                    defaultValue: 'any'
                },
                videoSyndicationType:{
                    type: GraphQLString,
                    description: 'any, broadcast, none',
                    defaultValue: 'any'
                },
                videoType: {
                    type: GraphQLString,
                    description: 'any, episode, movie',
                    defaultValue: 'any'
                }
            },
            resolve: (_, args, context) => youtubeAPI(context, resolveName = 'randomSearch', id = '', args = args)
        },
        videos: {
            type: new GraphQLList(youtubeVideoType),
            args: {
                part: {
                    type: GraphQLString,
                    description: 'The part parameter specifies a comma-separated list of one or more video resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, fileDetails, liveStreamingDetails, player, processingDetails, recordingDetails, statistics, status, suggestions, and topicDetails.',
                    defaultValue: 'contentDetails,id,liveStreamingDetails,localizations,player,recordingDetails,snippet,statistics,status,topicDetails'
                },
                chart: {
                    type: GraphQLString,
                    description: 'mostPopular',
                },
                id: {
                    type: GraphQLString,
                    description: 'The id parameter specifies a comma-separated list of the YouTube video ID(s) for the resource(s) that are being retrieved. In a video resource, the id property specifies the video\'s ID.'
                },
                myRating: {
                    type: GraphQLString,
                    description: 'dislike, like, none'
                },
                hl: {
                    type: GraphQLString,
                    description: 'The hl parameter instructs the API to retrieve localized resource metadata for a specific application language that the YouTube website supports. The parameter value must be a language code included in the list of supported language codes.'
                },
                maxHeight: {
                    type: GraphQLInt,
                    description: 'The maxHeight parameter specifies the maximum height of the embedded player returned in the player.embedHtml property. You can use this parameter to specify that the embedded player has a height of 100 pixels.'
                },
                maxResults: {
                    type: GraphQLInt,
                    description: 'The maxResults parameter specifies the maximum number of items that should be returned in the result set. Acceptable values are 0 to 50, inclusive. The default value is 5.',
                    defaultValue: 50
                },
                pages: {
                    type: GraphQLInt,
                    defaultValue: 1,
                    description: 'The maximum number of pages to iterate over' // a made up page to control pagination
                },
                maxWidth: {
                    type: GraphQLInt,
                    description: 'The maxWidth parameter specifies the maximum width of the embedded player returned in the player.embedHtml property. You can use this parameter to specify that the embedded player has a width of 200 pixels.'
                },
                onBehalfOfContentOwner: {
                    type: GraphQLString,
                    description: 'This parameter can only be used in a properly authorized request. Note: This parameter is intended exclusively for YouTube content partners.'
                },
                pageToken: {
                    type: GraphQLString,
                    description: 'The pageToken parameter identifies a specific page in the result set that should be returned.'
                },
                regionCode: {
                    type: GraphQLString,
                    description: 'The regionCode parameter instructs the API to return search results for the specified country. The parameter value is an ISO 3166-1 alpha-2 country code.'
                },
                videoCategoryId: {
                    type: GraphQLString,
                    description: 'The videoCategoryId parameter identifies the video category for which the chart should be retrieved. This parameter can only be used in conjunction with the chart parameter. By default, charts are not restricted to a particular category.'
                }
            },
            resolve: (_, args, context) => youtubeAPI(context, resolveName = 'videos', id = '', args = args)
        },
        videosByHandle: {
            type: new GraphQLList(youtubeListType),
            args: {
                handle: {
                    type: GraphQLString,
                    description: `The handle of youtube creator. e.g.MrBeast`
                },
                forContentOwner: {
                    type: GraphQLBoolean,
                    description: 'boolean for content owner'
                },
                forDeveloper: {
                    type: GraphQLBoolean,
                    description: 'boolean for developer'
                },
                forMine: {
                    type: GraphQLBoolean,
                    description: 'boolean for mine'
                },
                part: {
                    type: GraphQLString,
                    description: 'The part parameter specifies a comma-separated list of one or more search resource properties that the API response will include. The part names that you can include in the parameter value are id and snippet.',
                    defaultValue: 'id,snippet'
                },
                channelType:{
                    type: GraphQLString,
                    description: 'any, show',
                    defaultValue: 'any'
                },
                eventType: {
                    type: GraphQLString,
                    description: 'completed, live, upcoming',
                },
                order: {
                    type: GraphQLString,
                    description: 'date, rating, relevance, title, videoCount, viewCount',
                    defaultValue: 'date'
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
                    defaultValue: 50,
                    description: 'Acceptable values are 0 to 50, inclusive. The default value is 5.'
                },
                pages: {
                    type: GraphQLInt,
                    defaultValue: 1,
                    description: 'The maximum number of pages to iterate over' // a made up page to control pagination
                },
                onBehalfOfContentOwner: {
                    type: GraphQLString,
                    description:"This parameter can only be used in a properly authorized request. Note: This parameter is intended exclusively for YouTube content partners."
                },
                pageToken:{
                    type: GraphQLString,
                    description: 'The pageToken parameter identifies a specific page in the result set that should be returned.'
                },
                publishedAfter: {
                    type: GraphQLString,
                    description: 'e.g. 1970-01-01T00:00:00Z'
                },
                publishedBefore: {
                    type: GraphQLString,
                    description: 'e.g. 1970-01-01T00:00:00Z'
                },
                regionCode:{
                    type: GraphQLString,
                    description: 'ISO 3166-1 alpha-2'
                },
                relevanceLanguage: {
                    type: GraphQLString,
                    description: 'ISO 639-1'
                },
                safeSearch: {
                    type: GraphQLString,
                    description: 'moderate, none, strict'
                },
                topicId: {
                    type: GraphQLString,
                    description: 'e.g. /m/04rlf'
                },
                type: {
                    type: GraphQLString,
                    defaultValue: 'video',
                    description: 'channel,playlist,video'
                },
                videoCaption: {
                    type: GraphQLString,
                    description: 'any, closedCaption, none',
                    defaultValue: 'any'
                },
                videoCategoryId: {
                    type: GraphQLString,
                    description: 'e.g. 10'
                },
                videoDefinition: {
                    type: GraphQLString,
                    description: 'any, high, standard',
                    defaultValue: 'any'
                },
                videoDimension: {
                    type: GraphQLString,
                    description: '2d, 3d, any',
                    defaultValue: 'any'
                },
                videoDuration: {
                    type: GraphQLString,
                    description: 'any, long, medium, short',
                    defaultValue: 'any'
                },
                videoEmbeddable: {
                    type: GraphQLString,
                    description: 'any, true',
                    defaultValue: 'any'
                },
                videoLicense:{
                    type: GraphQLString,
                    description: 'any, creativeCommon, youtube',
                    defaultValue: 'any'
                },
                videoSyndicated: {
                    type: GraphQLString,
                    description: 'any, true',
                    defaultValue: 'any'
                },
                videoSyndicationType:{
                    type: GraphQLString,
                    description: 'any, broadcast, none',
                    defaultValue: 'any'
                },
                videoType: {
                    type: GraphQLString,
                    description: 'any, episode, movie',
                    defaultValue: 'any'
                }
            },
            resolve: (_, args, context) => youtubeAPI(context, resolveName = 'videosByHandle', id = '', args = args)
        }
    })
});

const youtubeListType = require('./youtube-type/youtubeListType');
const youtubeVideoType = require('./youtube-type/youtubeVideoType');
