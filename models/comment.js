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
        <input type="textarea" name="content"/>
        <br/>
        <input type="submit" value="Submit"/>
        </form>
        `
    }
    
    static newComment() {
        const commentCard = document.createElement('div')
        commentCard.classList.add('comment-card')
        commentCard.innerHTML += Comment.newCommentFormHTML()
        mainContainer.appendChild(commentCard)
        document.getElementById('comment-form').addEventListener('submit', e => {
            API.addComment(e)
        })
       
    }

    appendComment() {
        const commentList = document.querySelector('ul')
        const listItem = document.createElement('li')
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