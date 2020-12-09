class User {
    constructor (id, username) {
        this.id = id
        this.username = username
        this.renderUsers()
    }
    
    renderUsers() {
        const userInfo = document.createElement('div')
        userInfo.classList.add('users-list')
        userInfo.id = this.id
        userInfo.innerHTML += `<h2><span class="underline pointer">${this.username}</span></h2>`
        mainContainer.appendChild(userInfo)
        userInfo.addEventListener('click', (e) => {
            currentUser = this
            let divsToRemove = document.getElementsByClassName("users-list")
            for (var i = divsToRemove.length-1; i >= 0; i--) {
            divsToRemove[i].remove();
            }
            API.addPosts()
        })
    }

}