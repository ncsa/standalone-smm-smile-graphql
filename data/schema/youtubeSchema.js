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
                    defaultValue: 2,
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
        }
    })
});

const youtubeListType = require('./youtube-type/youtubeListType');
