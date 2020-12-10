class Comment {
    constructor(id, content, post_id, user_id) {
        this.id = id
        this.content = content
        this.post_id = post_id
        this.user_id = user_id
        this.appendComment()
    }

    appendComment() {
        const commentList = document.querySelector('ul')
        const listItem = document.createElement('li')
        listItem.innerHTML = `<p>${this.content}</p>`
        commentList.appendChild(listItem)

    }

    // static newComment() {
    //     const commentCard = document.createElement('div')
    //     commentCard.classList.add('comment-card')
    //     commentCard.innerHTML += newCommentFormHTML()
    //     mainContainer.appendChild(commentCard)
    //     document.querySelector('.comment-card').addEventListener('submit', API.addComment)
    // }
}