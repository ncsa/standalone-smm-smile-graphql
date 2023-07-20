var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
} = require("graphql");

const tweetTypeV2 = module.exports = new GraphQLObjectType({
    name: "tweetV2",
    description: "Return a tweet.",
    fields: () => ({
        id: {type: GraphQLString},
        text: {type: GraphQLString},
        edit_history_tweet_ids: {type: new GraphQLList(GraphQLString)},
        attachments: {type: twtAttachmentV2},
        author_id: {type: GraphQLString},
        context_annotations: {type: new GraphQLList(twtContextAnnotationV2)},
        conversation_id: {type: GraphQLString},
        created_at: {type: GraphQLString},
        edit_controls: {type: twtEditControlsV2},
        entities: {type: twtEntitiesV2},
        in_reply_to_user_id: {type: GraphQLString},
        lang: {type: GraphQLString},
        non_public_metrics: {type: twtMetricsV2},
        organic_metrics: {type: twtMetricsV2},
        possibly_sensitive: {type: GraphQLBoolean},
        promoted_metrics: {type: twtMetricsV2},
        public_metrics: {type: twtMetricsV2},
        referenced_tweets: {type: new GraphQLList(twtReferencedTweetV2)},
        reply_settings: {type: GraphQLString},
        source: {type: GraphQLString},
        withheld: {type: twtWithheldV2}
    })
});

const twtAttachmentV2 = new GraphQLObjectType({
    name: "twtAttachmentV2",
    description: "twtAttachmentV2",
    fields: () => ({
        poll_ids: {type: new GraphQLList(GraphQLString)},
        media_keys: {type: new GraphQLList(GraphQLString)}
    })
});

const twtContextAnnotationV2 = new GraphQLObjectType({
    name: "twtContextAnnotation",
    description: "twtContextAnnotation",
    fields: () => ({
        domain: {type: twtDomainV2},
        entity: {type: twtEntityV2}
    })
});

const twtDomainV2 = new GraphQLObjectType({
    name: "twtDomainV2",
    description: "twtDomainV2",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString}
    })
});

const twtEntityV2 = new GraphQLObjectType({
    name: "twtEntityV2",
    description: "twtEntityV2",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString}
    })
});

const twtEntitiesV2 = new GraphQLObjectType({
    name: "twtEntitiesV2",
    description: "twtEntitiesV2",
    fields: () => ({
        annotations: {type: new GraphQLList(twtAnnotationsV2)},
        cashtags: {type: new GraphQLList(twtCashtagsV2)},
        hashtags: {type: new GraphQLList(twtHashtagsV2)},
        mentions: {type: new GraphQLList(twtMentionsV2)},
        urls: {type: new GraphQLList(twtUrlsV2)}
    })
});

const twtAnnotationsV2 = new GraphQLObjectType({
    name: "twtAnnotationsV2",
    description: "twtAnnotationsV2",
    fields: () => ({
        start: {type: GraphQLInt},
        end: {type: GraphQLInt},
        probability: {type: GraphQLFloat},
        type: {type: GraphQLString},
        normalized_text: {type: GraphQLString}
    })
});

const twtCashtagsV2 = new GraphQLObjectType({
    name: "twtCashtagsV2",
    description: "twtCashtagsV2",
    fields: () => ({
        start: {type: GraphQLInt},
        end: {type: GraphQLInt},
        tag: {type: GraphQLString}
    })
});

const twtHashtagsV2 = new GraphQLObjectType({
    name: "twtHashtagsV2",
    description: "twtHashtagsV2",
    fields: () => ({
        start: {type: GraphQLInt},
        end: {type: GraphQLInt},
        tag: {type: GraphQLString}
    })
});

const twtMentionsV2 = new GraphQLObjectType({
    name: "twtMentionsV2",
    description: "twtMentionsV2",
    fields: () => ({
        start: {type: GraphQLInt},
        end: {type: GraphQLInt},
        tag: {type: GraphQLString}
    })
});

const twtUrlsV2 = new GraphQLObjectType({
    name: "twtUrlsV2",
    description: "twtUrlsV2",
    fields: () => ({
        start: {type: GraphQLInt},
        end: {type: GraphQLInt},
        url: {type: GraphQLString},
        expanded_url: {type: GraphQLString},
        display_url: {type: GraphQLString},
        status: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        unwound_url: {type: GraphQLString}
    })
});

const twtEditControlsV2 = new GraphQLObjectType({
    name: "twtEditControlsV2",
    description: "twtEditControlsV2",
    fields: () => ({
        edits_remaining: {type: GraphQLInt},
        is_edit_eligible: {type: GraphQLBoolean},
        editable_until: {type: GraphQLString}
    })
});

const twtMetricsV2 = new GraphQLObjectType({
    name: "twtMetricsV2",
    description: "twtMetricsV2",
    fields: () => ({
        impression_count: {type: GraphQLInt},
        like_count: {type: GraphQLInt},
        reply_count: {type: GraphQLInt},
        quote_count: {type: GraphQLInt},
        retweet_count: {type: GraphQLInt},
        url_link_clicks: {type: GraphQLInt},
        user_profile_clicks: {type: GraphQLInt},
    })
});

const twtReferencedTweetV2 = new GraphQLObjectType({
    name: "twtReferencedTweetV2",
    description: "twtReferencedTweetV2",
    fields: () => ({
        type: {type: GraphQLString},
        id: {type: GraphQLString},
    })
});

const twtWithheldV2 = new GraphQLObjectType({
    name: "twtWithheldV2",
    description: "twtWithheldV2",
    fields: () => ({
        copyright: {type: GraphQLBoolean},
        country_codes: {type: new GraphQLList(GraphQLString)}
    })
});
