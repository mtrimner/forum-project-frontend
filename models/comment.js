class Comment {


newCommentFormHTML() {
    `<input type="textarea" name="content"/>
    <input type="submit" value="Submit"/>`

}

newComment() {
    const commentCard = document.createElement('div')
    commentCard.classList.add('comment-card')
}
}