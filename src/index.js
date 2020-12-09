document.addEventListener("DOMContentLoaded", function() {

    API.fakeLogin()
})
const mainContainer = document.getElementById('main-container')
let currentUser;

// function clickEvents(e) {
//     if (e.target.parentElement.className === 'header') {
//         let divsToRemove = document.getElementsByClassName("post-card")
//         for (var i = divsToRemove.length-1; i >= 0; i--) {
//         divsToRemove[i].remove();
//         }

//     }
// }