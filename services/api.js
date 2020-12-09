class API {

static fakeLogin() {
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(users => {
        for (const user of users) {
            const {id, username} = user
            new User(id, username)
        }
    })
}

static addPosts() {
    fetch("http://localhost:3000/posts")
    .then(resp => resp.json())
    .then(posts => {
        for (const post of posts) {
            const {id, title, category, content, user_id, created_at, comments} = post
            let currentPost = new Post(id, title, category, content, user_id, created_at, comments)
            currentPost.renderPost(currentPost.postHTML)
        }
    })
}

static addPost(postId, callback) {
    fetch(`http://localhost:3000/posts/${postId}`)
    .then(resp => resp.json())
    .then (post => {
        const {id, title, category, content, user_id, created_at, comments} = post
        let selectedPost = new Post(id, title, category, content, user_id, created_at, comments)
        selectedPost.renderPost(selectedPost.singlePostHTML)
        // callback is the showComments method
        let boundComments = callback.bind(selectedPost)
        boundComments()
    })
}


}