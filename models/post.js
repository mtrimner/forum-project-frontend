class Post {
   constructor(id, title, category, content, user_id, created_at, comments) {
        this.id = id
        this.title = title
        this.category = category
        this.content = content
        this.user_id = user_id
        this.created_at = created_at
        this.comments = comments
        // this.renderPost()
        // debugger
    }


    postHTML() {
       return `
        <h2 class="header"><span class="underline pointer">${this.title}</span></h2>
        <p>${this.content}</p>
       `
    }

    renderPost() {
    //    const mainContainer = document.getElementById('main-container')
       const postCard = document.createElement('div')
       postCard.classList.add('post-card')
       postCard.id = this.id
       postCard.innerHTML += this.postHTML()
       mainContainer.appendChild(postCard)
       postCard.addEventListener('click', (e) => {
        this.clickEvents(e)
        })
    }

    // showPost(e, showComments) {
    //     const postId = e.target.parentElement.parentElement.id
    //     const postDiv = document.getElementById(this.id)
    //     API.addPost(postId, showComments)
    //    debugger
    //     // callback()
        
    // }

    showComments() {
     const commentList = document.createElement('ul')
     for (const comment of this.comments) {
        const li = document.createElement('li')
        li.innerHTML = `<p>${comment.content}</p>`
        commentList.appendChild(li)
     }
     mainContainer.appendChild(commentList)
    }

    showPost(e, callback) {
        const postId = e.target.parentElement.parentElement.id
        const postDiv = document.getElementById(this.id)
        API.addPost(postId, callback)
      
        // callback()
        
    }

    clickEvents(e) {
        if (e.target.parentElement.className === 'header') {
            let divsToRemove = document.getElementsByClassName("post-card")
            for (var i = divsToRemove.length-1; i >= 0; i--) {
            divsToRemove[i].remove();
            }
            this.showPost(e, this.showComments)
        }
    }


}