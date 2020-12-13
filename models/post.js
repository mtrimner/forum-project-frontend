class Post {
   constructor(id, title, category, content, user_id, created_at, comments, user) {
        this.id = id
        this.title = title
        this.category = category
        this.content = content
        this.user_id = user_id
        this.created_at = created_at
        this.comments = comments
        this.user = user
    }


    postHTML() {
       return `
        <h2 class="header"><span class="underline pointer">${this.title}</span></h2>
        ${this.deletePostButton()}
        <p>${this.content}</p>
        <p>${this.user.username}</p>
       `
    }

    singlePostHTML() {
        return `
        <h2 class="header">${this.title}</h2>
        <p>${this.content}</p>
       `
    }

    // callback is the postHTML or singlePostHTML methods
    renderPost(callback) {
       let boundPostHTML = callback.bind(this) 
       const postCard = document.createElement('div')
       postCard.classList.add('post-card')
       postCard.id = this.id
       postCard.innerHTML += boundPostHTML()
       mainContainer.appendChild(postCard)
       postCard.addEventListener('click', (e) => {
        this.clickEvents(e)
        })
    }


    showComments(callback) {
     const postDiv = document.getElementById(this.id)
     const commentList = document.createElement('ul')
     for (const comment of this.comments) {
        const li = document.createElement('li')
        li.classList.add('comment-item')
        li.id = comment.user_id
        li.innerHTML = `
        <p>${comment.content}</p><button class="delete-comment" id="${comment.id}">DELETE</button>
        `
        if (li.id != currentUser.id) {
            li.getElementsByClassName('delete-comment')[0].style.display = "none"
        }
        commentList.appendChild(li)
     }
     postDiv.appendChild(commentList)
     Comment.newComment()
    }

    showPost(e, callback) {
        const postId = e.target.parentElement.parentElement.id
        const postDiv = document.getElementById(this.id)
        API.addPost(postId, callback)    
    }

    clickEvents(e) {
        if (e.target.parentElement.className === 'header') {
            let divsToRemove = document.getElementsByClassName("post-card")
            for (var i = divsToRemove.length-1; i >= 0; i--) {
            divsToRemove[i].remove();
            }
            this.showPost(e, this.showComments)
        }
        else if (e.target.className === 'delete') {

            this.deletePost(e)
        } else if (e.target.className === 'delete-comment') {
            this.deleteComment(e)
        }
    }

    static newPostForm() {
        const newPostDiv = document.createElement('div')
        newPostDiv.classList.add('new-post-div')
        newPostDiv.innerHTML = Post.newPostFormHTML()
        mainContainer.appendChild(newPostDiv)
        newPostDiv.addEventListener('submit', e => {
            API.createPost(e)
        })
    }

    static newPostFormHTML() {
        return `
        <form id="post-form">
        <label for="title">Title</label><br/>
        <input type="textarea" id="title" name="title"/>
        <br/>
        <label for="content">Content</label><br/>
        <input type="textarea" id="content" name="content"/>
        <br/>
        <input type="hidden" name="user_id" value="${currentUser.id}"/>
        <br/>
        <label for="category">Category</label><br/>
        <select name="category" id="category">
            <option value="philosophy">Philosophy</option>
            <option value="food">Food</option>
            <option value="tech">Tech</option>
            <option value="random">Random</option>
        </select>
        
        <input type="submit" value="Submit"/>
        `
    }

    deletePostButton() {
        if (this.user_id === currentUser.id) {
           return `<button class="delete">DELETE</button>`
        } else {return ""}
    }

    deletePost(e) {
        const id = parseInt(e.target.parentElement.id)
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            document.getElementById('main-container').removeChild(document.getElementById(id))
        })
    }

    deleteComment(e) {
        const commentId = parseInt(e.target.id)
        fetch(`http://localhost:3000/comments/${commentId}`, {
            method: 'DELETE'
        })
        .then(resp => {
            debugger
            document.getElementById(commentId).parentElement.remove()
        })
    }

   

}