var {
	GraphQLSchema,
	GraphQLObjectType,
} = require('graphql');

const twitterQueryType = require('./twitterSchema');
const redditQueryType = require('./redditSchema');
const youtubeQueryType = require('./youtubeSchema');

function wrapper(){
	return {}
}

const Query = new GraphQLObjectType({
	name: "Query",
	description: 'all social media ',
	fields:() => ({
		twitter:{
			type:twitterQueryType,
			resolve: () => wrapper()
			},
		reddit:{
			type: redditQueryType,
			resolve:() => wrapper()
		},
		youtube:{
			type: youtubeQueryType,
			resolve:() => wrapper()
		},
	})
});



module.exports = new GraphQLSchema({
	query:Query
})
