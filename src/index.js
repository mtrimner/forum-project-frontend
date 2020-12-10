document.addEventListener("DOMContentLoaded", function() {

    API.fakeLogin()
})
const mainContainer = document.getElementById('main-container')
let currentUser;


function newCommentFormHTML() {
    return `
    <form id="comment-form">
    <input type="textarea" name="content"/>
    <br/>
    <input type="submit" value="Submit"/>
    </form>
    `
}

function newComment() {
    const commentCard = document.createElement('div')
    commentCard.classList.add('comment-card')
    commentCard.innerHTML += newCommentFormHTML()
    mainContainer.appendChild(commentCard)
    document.getElementById('comment-form').addEventListener('submit', e => {
        API.addComment(e)
    })
   
}
