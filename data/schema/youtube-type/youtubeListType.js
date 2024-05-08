var {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean
} = require('graphql');
var youtubeAPI = require('../../../API/youtubeAPI');

const youtubeListType = module.exports = new GraphQLObjectType({
    name: 'youtubeList',
    description: '',
    fields: () => ({
        kind: {type: GraphQLString},
        etag: {type: GraphQLString},
        id: {type: youtubeInfoType},
        snippet: {type: youtubeSnippetType},
    })
});

const youtubeInfoType = new GraphQLObjectType({
    name: 'youtubeId',
    fields: () => ({
        kind: {type: GraphQLString},
        videoId: {type: GraphQLString},
        channelId: {type: GraphQLString},
        playlistId: {type: GraphQLString},
        // TODO investigate if those work or not later
        // /*---------------nested--------------*/
        // videoInfo:		{type:new GraphQLList(youtubeVideoType),
        // 					resolve:({videoId}) => youtubeAPI(resolveName='video',id=videoId, args={})},
        // channelInfo:	{type:new GraphQLList(youtubeChannelType),
        // 					resolve:({channelId}) => youtubeAPI(resolveName='channel',id=channelId, args={})},
        // playlistInfo:	{type:new GraphQLList(youtubePlaylistType),
        // 					resolve: ({playlistId}) => youtubeAPI(resolveName='playlist',id=playlistId, args={})},
    })
});

const youtubeSnippetType = new GraphQLObjectType({
    name: 'youtubeSnippet',
    fields: () => ({
        publishedAt: {type: GraphQLString},
        channelId: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        default_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.default.url}
        },
        default_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.default.width}
        },
        default_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.default.height}
        },
        medium_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.medium.url}
        },
        medium_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.medium.width}
        },
        medium_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.medium.height}
        },
        high_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.high.url}
        },
        high_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.high.width}
        },
        high_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.high.height}
        },
        standard_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.standard.url}
        },
        standard_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.standard.width}
        },
        standard_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.standard.height}
        },
        maxres_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.maxres.url}
        },
        maxres_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.maxres.width}
        },
        maxres_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.maxres.height}
        },
        channelTitle: {type: GraphQLString},
        liveBroadcastContent: {type: GraphQLString},
    })
});

// const youtubeThumbnailType = require('./youtubeThumbnailType');
// const youtubePlaylistType = require('./youtubePlaylistType');
// const youtubeChannelType = require('./youtubeChannelType');
// const youtubeVideoType = require('./youtubeVideoType');
