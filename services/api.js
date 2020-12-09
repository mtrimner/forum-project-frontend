class API {

static addPosts() {
    fetch("http://localhost:3000/posts")
    .then(resp => resp.json())
    .then(posts => {
        for (const post of posts) {
            const {id, title, category, content, user_id, created_at, comments} = post
            let currentPost = new Post(id, title, category, content, user_id, created_at, comments)
            currentPost.renderPost()
        }
    })
}

static addPost(postId, callback) {
    fetch(`http://localhost:3000/posts/${postId}`)
    .then(resp => resp.json())
    .then (post => {
        const {id, title, category, content, user_id, created_at, comments} = post
        let selectedPost = new Post(id, title, category, content, user_id, created_at, comments)
        selectedPost.renderPost()
        let boundComments = callback.bind(selectedPost)
        boundComments()
    })
}


}