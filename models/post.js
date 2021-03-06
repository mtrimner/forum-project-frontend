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
        <h4 class="header"><span class="underline pointer">${this.title}</span></h4>
        ${this.deletePostButton()}
        <p>${this.content} - ${this.user.username}</p>
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
       mainRow.appendChild(postCard)
       postCard.addEventListener('click', (e) => {

        this.clickEvents(e)
        })
    }


    showComments(callback) {
     const postDiv = document.getElementById(this.id)
     const space = document.createElement('br')
     const commentList = document.createElement('ul')
     commentList.classList.add('list-group')
     for (const comment of this.comments) {
        const li = document.createElement('li')
        li.classList.add('comment-item', 'list-group-item')
        li.id = comment.user_id
        li.innerHTML = `
        <p>${comment.content} <button class="delete-comment btn btn-outline-primary btn-sm" id="${comment.id}">DELETE</button></p>
        `
        if (li.id != currentUser.id) {
            li.getElementsByClassName('delete-comment')[0].style.display = "none"
        }
        commentList.appendChild(li)
     }
     postDiv.appendChild(commentList)
     postDiv.appendChild(space)
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
        else if (e.target.className.includes('deleted')) {
            debugger
            this.deletePost(e)
        } else if (e.target.className.includes('delete-comment')) {
            this.deleteComment(e)
        }
    }

    static newPostForm() {
        const newPostDiv = document.createElement('div')
        newPostDiv.classList.add('new-post-div')
        newPostDiv.innerHTML = Post.newPostFormHTML()
        mainRow.appendChild(newPostDiv)
        newPostDiv.addEventListener('submit', e => {
            API.createPost(e)
        })
    }

    static newPostFormHTML() {
        return `
        <h2>Create A New Post</h2>
        <form id="post-form">
        <div class="mt-3 form-group">
        <label for="title">Title</label><br/>
        <input type="textarea" id="title" name="title" class="form-control"/>
        </div>
        <br/>
        <div class="mt-3 form-group">
        <label for="content">Content</label><br/>
        <input type="textarea" id="content" name="content" class="form-control"/>
        </div>
        <br/>
        <input type="hidden" name="user_id" value="${currentUser.id}"/>
        <br/>
        <div class="mt-3 form-group">
        <label for="category">Category</label><br/>
        <select name="category" id="category" class="form-control">
            <option value="philosophy">Philosophy</option>
            <option value="food">Food</option>
            <option value="tech">Tech</option>
            <option value="random">Random</option>
        </select>
        </div>
        <input type="submit" value="Submit"/>
        `
    }

    deletePostButton() {
        if (this.user_id === currentUser.id) {
           return `<button class="deleted btn btn-outline-primary btn-sm">DELETE</button>`
        } else {return ""}
    }

    deletePost(e) {
        const id = parseInt(e.target.parentElement.id)
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            document.getElementById('main-row').removeChild(document.getElementById(id))
        })
    }

    deleteComment(e) {
        const commentId = parseInt(e.target.id)
        fetch(`http://localhost:3000/comments/${commentId}`, {
            method: 'DELETE'
        })
        .then(resp => {
            debugger
            document.getElementById(commentId).parentElement.parentElement.remove()
        })
    }

   

}