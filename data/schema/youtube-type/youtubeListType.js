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
            resolve: ({thumbnails}) => {return thumbnails.default? thumbnails.default.url: ""}
        },
        default_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.default ? thumbnails.default.width: 0}
        },
        default_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.default ? thumbnails.default.height: 0}
        },
        medium_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.medium ? thumbnails.medium.url: ""}
        },
        medium_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.medium ? thumbnails.medium.width: 0}
        },
        medium_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.medium ? thumbnails.medium.height: 0}
        },
        high_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.high ? thumbnails.high.url: ""}
        },
        high_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.high ? thumbnails.high.width: 0}
        },
        high_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.high ? thumbnails.high.height: 0}
        },
        standard_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.standard? thumbnails.standard.url: ""}
        },
        standard_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.standard ? thumbnails.standard.width: 0}
        },
        standard_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.standard ? thumbnails.standard.height: 0}
        },
        maxres_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.maxres ? thumbnails.maxres.url : ""}
        },
        maxres_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.maxres ? thumbnails.maxres.width: 0}
        },
        maxres_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.maxres ? thumbnails.maxres.height: 0}
        },
        channelTitle: {type: GraphQLString},
        liveBroadcastContent: {type: GraphQLString},
    })
});

// const youtubeThumbnailType = require('./youtubeThumbnailType');
// const youtubePlaylistType = require('./youtubePlaylistType');
// const youtubeChannelType = require('./youtubeChannelType');
// const youtubeVideoType = require('./youtubeVideoType');
