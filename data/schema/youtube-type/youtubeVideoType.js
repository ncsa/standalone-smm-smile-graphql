var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean
} = require('graphql');
var youtubeAPI = require('../../../API/youtubeAPI');

const youtubeVideoType = module.exports = new GraphQLObjectType({
    name: 'youtubeVideo',
    description: '',
    fields: () => ({
        kind: {type: GraphQLString},
        etag: {type: GraphQLString},
        id: {type: GraphQLString},
        snippet: {type: videoSnippetType},
        contentDetails: {type: videoContentType},
        status: {type: videoStatusType},
        statistics: {type: videoStatisticsType},
        player: {type: videoPlayerType},
        topicDetails: {type: videoTopicType},
        recordingDetails: {type: videoRecordingType},
        fileDetails: {type: videoFileType},
        processingDetails: {type: videoProcessingType},
        suggestions: {type: videoSuggestionType},
        liveStreamingDetails: {type: videoLiveType},
        // TODO investigate me
        // localizations: {type: new GraphQLList(GraphQLString)},
        // /*--------------------nested----------------------*/
        // commentThread:			{type:new GraphQLList(youtubeCommentthreadType),
        // 							args:{
        // 								maxResults:{type:GraphQLInt},
        // 								searchTerms:{type:GraphQLString,description:'show the comments matching this text pattern'},
        // 							},
        // 							resolve:({id},args)=>youtubeAPI(resolveName='videoCommentthread',id=id, args=args)},
    })
});

const videoSnippetType = new GraphQLObjectType({
    name: 'videoSnippet',
    description: '',
    fields: () => ({
        publishedAt: {type: GraphQLString},
        channelId: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        default_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.default ? thumbnails.default.url : ""}
        },
        default_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.default ? thumbnails.default.width : 0}
        },
        default_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.default ? thumbnails.default.height : 0}
        },
        medium_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.medium ? thumbnails.medium.url : ""}
        },
        medium_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.medium ? thumbnails.medium.width : 0}
        },
        medium_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.medium ? thumbnails.medium.height : 0}
        },
        high_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.high ? thumbnails.high.url : ""}
        },
        high_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.high ? thumbnails.high.width : 0}
        },
        high_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.high ? thumbnails.high.height : 0}
        },
        standard_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.standard ? thumbnails.standard.url : ""}
        },
        standard_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.standard ? thumbnails.standard.width : 0}
        },
        standard_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.standard ? thumbnails.standard.height : 0}
        },
        maxres_thumbnails_url: {
            type: GraphQLString,
            resolve: ({thumbnails}) => {return thumbnails.maxres ? thumbnails.maxres.url : ""}
        },
        maxres_thumbnails_width: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.maxres ? thumbnails.maxres.width : 0}
        },
        maxres_thumbnails_height: {
            type: GraphQLInt,
            resolve: ({thumbnails}) => {return thumbnails.maxres ? thumbnails.maxres.height : 0}
        },
        channelTitle: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        categoryId: {type: GraphQLString},
        liveBroadcastContent: {type: GraphQLString},
        defaultLanguage: {type: GraphQLString},
        localized_title: {
            type: GraphQLString,
            resolve: ({localized}) => {return localized.title ? localized.title : ""}
        },
        localized_description: {
            type: GraphQLString,
            resolve: ({localized}) => {return localized.description ? localized.description : ""}
        },
        defaultAudioLanguage: {type: GraphQLString},
    })
});

const videoContentType = new GraphQLObjectType({
    name: 'videoContent',
    fields: () => ({
        duration: {type: GraphQLString},
        dimension: {type: GraphQLString},
        definition: {type: GraphQLString},
        caption: {type: GraphQLString},
        licensedContent: {type: GraphQLBoolean},
        regionRestriction_allowed: {
            type: new GraphQLList(GraphQLString),
            resolve: ({regionRestriction}) => {return regionRestriction && regionRestriction.allowed ? regionRestriction.allowed : []}
        },
        regionRestriction_blocked: {
            type: new GraphQLList(GraphQLString),
            resolve: ({regionRestriction}) => {return regionRestriction && regionRestriction.blocked ? regionRestriction.blocked : []}
        },
        contentRating: {type: ratingType},
        projection: {type: GraphQLString},
        hasCustomThumbnail: {type: GraphQLBoolean},
    })
});

const ratingType = new GraphQLObjectType({
    name: 'ratingType',
    fields: () => ({
        acbRating: {type: GraphQLString},
        agcomRating: {type: GraphQLString},
        anatelRating: {type: GraphQLString},
        bbfcRating: {type: GraphQLString},
        bfvcRating: {type: GraphQLString},
        bmukkRating: {type: GraphQLString},
        catvRating: {type: GraphQLString},
        catvfrRating: {type: GraphQLString},
        cbfcRating: {type: GraphQLString},
        cccRating: {type: GraphQLString},
        cceRating: {type: GraphQLString},
        chfilmRating: {type: GraphQLString},
        chvrsRating: {type: GraphQLString},
        cicfRating: {type: GraphQLString},
        cnaRating: {type: GraphQLString},
        cncRating: {type: GraphQLString},
        csaRating: {type: GraphQLString},
        cscfRating: {type: GraphQLString},
        czfilmRating: {type: GraphQLString},
        djctqRating: {type: GraphQLString},
        djctqRatingReasons: {type: new GraphQLList(GraphQLString)},
        ecbmctRating: {type: GraphQLString},
        eefilmRating: {type: GraphQLString},
        egfilmRating: {type: GraphQLString},
        eirinRating: {type: GraphQLString},
        fcbmRating: {type: GraphQLString},
        fcoRating: {type: GraphQLString},
        fmocRating: {type: GraphQLString},
        fpbRating: {type: GraphQLString},
        fpbRatingReasons: {type: new GraphQLList(GraphQLString)},
        fskRating: {type: GraphQLString},
        grfilmRating: {type: GraphQLString},
        icaaRating: {type: GraphQLString},
        ifcoRating: {type: GraphQLString},
        ilfilmRating: {type: GraphQLString},
        incaaRating: {type: GraphQLString},
        kfcbRating: {type: GraphQLString},
        kijkwijzerRating: {type: GraphQLString},
        kmrbRating: {type: GraphQLString},
        lsfRating: {type: GraphQLString},
        mccaaRating: {type: GraphQLString},
        mccypRating: {type: GraphQLString},
        mcstRating: {type: GraphQLString},
        mdaRating: {type: GraphQLString},
        medietilsynetRating: {type: GraphQLString},
        mekuRating: {type: GraphQLString},
        mibacRating: {type: GraphQLString},
        mocRating: {type: GraphQLString},
        moctwRating: {type: GraphQLString},
        mpaaRating: {type: GraphQLString},
        mpaatRating: {type: GraphQLString},
        mtrcbRating: {type: GraphQLString},
        nbcRating: {type: GraphQLString},
        nbcplRating: {type: GraphQLString},
        nfrcRating: {type: GraphQLString},
        nfvcbRating: {type: GraphQLString},
        nkclvRating: {type: GraphQLString},
        oflcRating: {type: GraphQLString},
        pefilmRating: {type: GraphQLString},
        rcnofRating: {type: GraphQLString},
        resorteviolenciaRating: {type: GraphQLString},
        rtcRating: {type: GraphQLString},
        rteRating: {type: GraphQLString},
        russiaRating: {type: GraphQLString},
        skfilmRating: {type: GraphQLString},
        smaisRating: {type: GraphQLString},
        smsaRating: {type: GraphQLString},
        tvpgRating: {type: GraphQLString},
        ytRating: {type: GraphQLString},
    })
});

const videoStatusType = new GraphQLObjectType({
    name: 'videoStatus',
    fields: () => ({
        uploadStatus: {type: GraphQLString},
        failureReason: {type: GraphQLString},
        rejectionReason: {type: GraphQLString},
        privacyStatus: {type: GraphQLString},
        publishAt: {type: GraphQLString},
        license: {type: GraphQLString},
        embeddable: {type: GraphQLBoolean},
        publicStatsViewable: {type: GraphQLBoolean},
        madeForKids: {type: GraphQLBoolean},
        selfDeclaredMadeForKids: {type: GraphQLBoolean},
    })
});

const videoStatisticsType = new GraphQLObjectType({
    name: 'videoStatistics',
    fields: () => ({
        viewCount: {type: GraphQLInt},
        likeCount: {type: GraphQLInt},
        dislikeCount: {type: GraphQLInt},
        favoriteCount: {type: GraphQLInt},
        commentCount: {type: GraphQLInt},
    })
});

const videoPlayerType = new GraphQLObjectType({
    name: 'videoPlayer',
    fields: () => ({
        embedHtml: {type: GraphQLString},
        embedHeight: {type: GraphQLInt},
        embedWidth: {type: GraphQLInt},
    })
});

const videoTopicType = new GraphQLObjectType({
    name: 'videoTopic',
    fields: () => ({
        topicIds: {type: new GraphQLList(GraphQLString)},
        relevantTopicIds: {type: new GraphQLList(GraphQLString)},
        topicCategories: {type: new GraphQLList(GraphQLString)},
    })
});

const videoRecordingType = new GraphQLObjectType({
    name: 'videoRecording',
    fields: () => ({
        recordingDate: {type: GraphQLString},
    })
});

const videoFileType = new GraphQLObjectType({
    name: 'videoFile',
    fields: () => ({
        fileName: {type: GraphQLString},
        fileSize: {type: GraphQLInt},
        fileType: {type: GraphQLString},
        container: {type: GraphQLString},
        videoStreams: {type: new GraphQLList(videoStreamType)},
        audioStreams: {type: new GraphQLList(audioStreamType)},
        duratioinMs: {type: GraphQLInt},
        bitrateBps: {type: GraphQLInt},
        creationTime: {type: GraphQLString},
    })
});

const videoStreamType = new GraphQLObjectType({
    name: 'videoStream',
    fields: () => ({
        widthPixels: {type: GraphQLInt},
        heightPixels: {type: GraphQLInt},
        frameRateFps: {type: GraphQLFloat},
        aspectRatio: {type: GraphQLFloat},
        codec: {type: GraphQLString},
        bitrateBps: {type: GraphQLInt},
        rotation: {type: GraphQLString},
        vendor: {type: GraphQLString},
    })
});

const audioStreamType = new GraphQLObjectType({
    name: 'audioStream',
    fields: () => ({
        channelCount: {type: GraphQLInt},
        codec: {type: GraphQLString},
        bitrateBps: {type: GraphQLInt},
        vendor: {type: GraphQLString},
    })
});

const videoProcessingType = new GraphQLObjectType({
    name: 'videoProcessing',
    fields: () => ({
        processingStatus: {type: GraphQLString},
        processingProgress_partsTotal: {
            type: GraphQLInt,
            resolve: ({processingProgress}) => { return processingProgress.partsTotal}
        },
        processingProgress_partsProcessed: {
            type: GraphQLInt,
            resolve: ({processingProgress}) => { return processingProgress.partsProcessed}
        },
        processingProgress_timeLeftMs: {
            type: GraphQLInt,
            resolve: ({processingProgress}) => { return processingProgress.timeLeftMs}
        },
        processingFailureReason: {type: GraphQLString},
        fileDetailsAvailability: {type: GraphQLString},
        processingIssuesAvailability: {type: GraphQLString},
        tagSuggestionsAvailability: {type: GraphQLString},
        editorSuggestionsAvailability: {type: GraphQLString},
        thumbnailsAvailability: {type: GraphQLString},
    })
});

const videoSuggestionType = new GraphQLObjectType({
    name: 'videoSuggestion',
    fields: () => ({
        processingErrors: {type: new GraphQLList(GraphQLString)},
        processingWarnings: {type: new GraphQLList(GraphQLString)},
        processingHints: {type: new GraphQLList(GraphQLString)},
        tagSuggestions: {type: new GraphQLList(tagSuggestionType)},
        editorSuggestions: {type: new GraphQLList(GraphQLString)},
    })
});

const tagSuggestionType = new GraphQLObjectType({
    name: 'tagSuggestion',
    fields: () => ({
        tag: {type: GraphQLString},
        categoryRestricts: {type: new GraphQLList(GraphQLString)},
    })
});

const videoLiveType = new GraphQLObjectType({
    name: 'videoLive',
    fields: () => ({
        actualStartTime: {type: GraphQLString},
        actualEndTime: {type: GraphQLString},
        scheduledStartTime: {type: GraphQLString},
        scheduledEndTime: {type: GraphQLString},
        concurrentViewers: {type: GraphQLInt},
        activeLiveChatId: {type: GraphQLString},
    })
});

// const youtubeCommentthreadType = require('./youtubeCommentthreadType');
