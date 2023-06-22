var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var redditAPI = require('../../../API/redditAPI');

const subredditType = module.exports = new GraphQLObjectType({
	name:'subreddit',
	description:'',
	fields: () => ({
		accounts_active:			{type:GraphQLInt},
		accounts_active_is_fuzzed:	{type:GraphQLBoolean},
		advertiser_category:		{type:GraphQLString},
		allow_images:				{type:GraphQLBoolean},
		banner_img:					{type:GraphQLString},
		banner_size:				{type:GraphQLString},
		created:					{type:GraphQLString},
		created_utc:				{type:GraphQLString},
		comment_score_hide_mins:	{type:GraphQLInt},
		collapse_deleted_comments:	{type:GraphQLBoolean},
		description:				{type:GraphQLString},
		description_html:			{type:GraphQLString},
		display_name:				{type:GraphQLString},
		display_name_prefixed:		{type:GraphQLString},
		header_img:					{type:GraphQLString},
		header_size:				{type:new GraphQLList(GraphQLInt)},
		header_title:				{type:GraphQLString},
		hide_ads:					{type:GraphQLBoolean},
		id:							{type:GraphQLString},
		icon_size:					{type:GraphQLString},
		lang:						{type:GraphQLString},
		key_color:					{type:GraphQLString},
		name:						{type:GraphQLString},
		over18:						{type:GraphQLBoolean},
		public_description:			{type:GraphQLString},
		public_description_html:	{type:GraphQLString},
		public_traffic:				{type:GraphQLBoolean},
		quarantine:					{type:GraphQLBoolean},
		show_media:					{type:GraphQLBoolean},
		show_media_preview:			{type:GraphQLBoolean},
		subscribers:				{type:GraphQLInt},
		spoilers_enabled:			{type:GraphQLBoolean},
		suggested_comment_sort:		{type:GraphQLString},
		submission_type:			{type:GraphQLString},
		submit_text:				{type:GraphQLString},
		submit_link_label:			{type:GraphQLString},
		submit_text_label:			{type:GraphQLString},
		submit_text_html:			{type:GraphQLString},
		subreddit_type:				{type:GraphQLString},
		title:						{type:GraphQLString},
		url:						{type:GraphQLString},
		user_sr_theme_enabled:		{type:GraphQLBoolean},
		user_is_banned:				{type:GraphQLBoolean},
		user_is_contributor:		{type:GraphQLBoolean},
		user_is_moderator:			{type:GraphQLBoolean},
		user_is_subscriber:			{type:GraphQLBoolean},
		user_is_muted:				{type:GraphQLBoolean},
		wiki_enabled:				{type:GraphQLBoolean},
		whitelist_status:			{type:GraphQLString},
		/*-----------------------------------nested--------------------------------*/
		/*user_flair:					{type:new GraphQLList(redditFlairType),
										resolve: ({display_name})=>redditAPI(resolveName='getUserFlairTemplates',id=display_name, args={})},
		hot:						{type:new GraphQLList(redditLinkType),
										args:{extra:{type:GraphQLInt, defaultValue:0}},
										resolve: ({display_name},args)=>redditAPI(resolveName='subreddit_hot',id=display_name, args=args)},
		new:						{type:new GraphQLList(redditLinkType),
										args:{extra:{type:GraphQLInt, defaultValue:0}},
										resolve: ({display_name},args)=>redditAPI(resolveName='subreddit_new',id=display_name, args=args)},*/
	})
});

const redditFlairType = require('./redditFlairType');
const redditLinkType = require('./redditLinkType');