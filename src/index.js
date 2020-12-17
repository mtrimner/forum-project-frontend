
document.addEventListener("DOMContentLoaded", function() {
    User.welcomeScreen()
    API.fakeLogin()
    document.getElementById('head-container').addEventListener('click', e => {
        if (e.target.className.includes('new-post')) {
            const divsToRemove = document.querySelectorAll('.post-card, .comment-card, .users-list')
            for (var i = divsToRemove.length-1; i >= 0; i--) {
                divsToRemove[i].remove(); 
            } 
            Post.newPostForm()
        } else if (e.target.className.includes('go-home')) {
            const divsToRemove = document.querySelectorAll('.post-card, .comment-card, .users-list, .new-post-div')
            for (var i = divsToRemove.length-1; i >= 0; i--) {
                divsToRemove[i].remove(); 
            } 
            API.addPosts()
        }
    })
        document.getElementById('new-post-button').style.visibility = "hidden"
        document.getElementById('go-home').style.visibility = "hidden"
})
const mainContainer = document.getElementById('main-container')
const mainRow = document.getElementById('main-row')
let currentUser;


// function newCommentFormHTML() {
//     return `
//     <form id="comment-form">
//     <input type="textarea" name="content"/>
//     <br/>
//     <input type="submit" value="Submit"/>
//     </form>
//     `
// }

// function newComment() {
//     const commentCard = document.createElement('div')
//     commentCard.classList.add('comment-card')
//     commentCard.innerHTML += newCommentFormHTML()
//     mainContainer.appendChild(commentCard)
//     document.getElementById('comment-form').addEventListener('submit', e => {
//         API.addComment(e)
//     })
   
// }
