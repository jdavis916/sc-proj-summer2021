/* this file contains middleware functions that 
define what a user can do based on their role */
const { ROLE } = require('../roles');


//only a projects creator or an admin can modify a project
function permProject(user, project){
	return(
		user.role === ROLE.ADMIN || 
		project.userId === user.id
		)
}

//only a profiles creator or an admin can modify a profile
function permProfile(user, profile){
	return(
		user.role === ROLE.ADMIN || 
		profile.userId === user.id
		)
}

//only a certain user and an admin can view the users' messages
function viewMessages(user, messages){
	if(user.role === ROLE.ADMIN || user.role === ROLE.MODERATOR){
		return messages;
	};
	return messages.filter(messages => message.userId === user.id);
}

//only admins can view others' messages
function adminMessages(user, messages){
	if(user.role === ROLE.ADMIN || user.role === ROLE.MODERATOR){
		return messages;
	} else {
		res.status(403).json('Forbidden');
	};
}
//only a user and the admins can modify their posts
function permEditPost(user, post){
	return(
		user.role === ROLE.ADMIN || 
		post.userId === user.id
		);
}

//only a user and the admins can delete their posts
function permDelPost(user){
	return(
		user.role === ROLE.ADMIN || 
		post.userId === user.id
		);
}

//only a commentor, an admin, or a post owner can remove a comment
function delComment(user, comment, post){
	return(
		user.role === ROLE.ADMIN ||
		user.role === ROLE.MODERATOR|| 
		comment.userId === user.id ||
		post.userId === userId
		);
}
//determines if a user can delete a project
/* function canDeleteProject(user, project){
	return (
		project.userId === user.id ||
		user.role === ROLE.ADMIN);
} */
//sets who can view a user's messages
//will change this later



module.exports = {
	//canViewProject,
	permEditPost,
	permDelPost,
	permProfile,
	permProject,
	viewMessages,
	adminMessages,
	delComment
	//canViewPageAdmin
}