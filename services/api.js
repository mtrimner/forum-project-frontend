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
            const {id, title, category, content, user_id, created_at, comments, user} = post
            let currentPost = new Post(id, title, category, content, user_id, created_at, comments, user)
            currentPost.renderPost(currentPost.postHTML)
        }
    })
}

static addPost(postId, callback) {
    fetch(`http://localhost:3000/posts/${postId}`)
    .then(resp => resp.json())
    .then (post => {
        const {id, title, category, content, user_id, created_at, comments, user} = post
        let selectedPost = new Post(id, title, category, content, user_id, created_at, comments, user)
        selectedPost.renderPost(selectedPost.singlePostHTML)
        // callback is the showComments method
        let boundComments = callback.bind(selectedPost)
        boundComments()
    })
}

static addComment(e) {
    e.preventDefault()
    const postId = document.querySelector('.post-card').id
    let data = {
        'content': e.target.content.value,
        'user_id': currentUser.id,
        'post_id': postId
    };
    fetch('http://localhost:3000/comments', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(comment => {
        const {id, content, post_id, user_id} = comment
        new Comment(id, content, post_id, user_id)
        document.getElementById('comment-form').reset()
    })
    .catch((error) => {
        console.log("test")
        alert("ooops, cant be blank")
    })
    
}   

static createPost(e) {
    e.preventDefault()
    let data = {
        'title': e.target.title.value,
        'category': e.target.category.value,
        'content': e.target.content.value,
        'user_id': currentUser.id,
    };
    fetch('http://localhost:3000/posts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => { 
        debugger
        if (resp.ok) { 
            resp.json()
    .then(post => {
        const {id, content, post_id, user_id, created_at, comments} = post
        const newPost = new Post(id, content, post_id, user_id, created_at, comments)
        let divsToRemove = document.getElementsByClassName("new-post-div")
            for (var i = divsToRemove.length-1; i >= 0; i--) {
            divsToRemove[i].remove();
            }
        API.addPosts()
    })
} else {alert("Fields can't be blank")
    }
})
    .catch((error) => {
        console.log(error)
        alert("Ooops! Fields can't be blank.")
    })
    
}   


}