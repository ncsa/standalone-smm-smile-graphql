var {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
} = require('graphql');

const youtubeThumbnailType = module.exports = new GraphQLObjectType({
	name:'youtubeThumbnailType',
	fields:()=>({
		url:	{type:GraphQLString},
		width:	{type:GraphQLInt},
		height:	{type:GraphQLInt},
	})
});
