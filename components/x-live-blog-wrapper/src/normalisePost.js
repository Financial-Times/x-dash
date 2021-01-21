// Remove this helper when we no longer need to handle incoming WordPress events.
const normalisePost = (post) => {
	if (post && !post.id && post.postId) {
		post.id = post.postId
	}
	return post
}

export { normalisePost }
