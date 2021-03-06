class Comment {
    constructor(id, content, post_id, user_id) {
        this.id = id
        this.content = content
        this.post_id = post_id
        this.user_id = user_id
        this.appendComment()
    }

    static newCommentFormHTML() {
        return `
        <form id="comment-form">
        <div class="mt-3 form-group">
        <label for="content">New Comment</label>
        <input type="textarea" id="content" name="content" class="form-control"/>
        </div>
        <br/>
        <button type="submit" class="mb-3 btn btn-primary" value="Submit">Submit</button>
        </form>
        `
    }
    
    static newComment() {
        const commentCard = document.createElement('div')
        commentCard.classList.add('comment-card', 'card', 'border-primary')
        commentCard.innerHTML += Comment.newCommentFormHTML()
        mainRow.appendChild(commentCard)
        document.getElementById('comment-form').addEventListener('submit', e => {
            API.addComment(e)
        })
       
    }

    appendComment() {
        const commentList = document.querySelector('ul')
        const listItem = document.createElement('li')
        listItem.classList.add('comment-item', 'list-group-item')
        listItem.innerHTML = `<p>${this.content}</p>`
        commentList.appendChild(listItem)

    }

    deleteCommentButton() {
        for (const comment of this.comments) {
            if (comment.user_id == currentUser.id) {
                comment.style.display
            }

        }
        
    }

    // static newComment() {
    //     const commentCard = document.createElement('div')
    //     commentCard.classList.add('comment-card')
    //     commentCard.innerHTML += newCommentFormHTML()
    //     mainContainer.appendChild(commentCard)
    //     document.querySelector('.comment-card').addEventListener('submit', API.addComment)
    // }
}