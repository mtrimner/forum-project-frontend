class User {
    constructor (id, username) {
        this.id = id
        this.username = username
        this.renderUsers()
    }

    static welcomeScreen() {
        const welcome = document.createElement('h1')
        const instructions = document.createElement('p')
        instructions.classList.add('lead')
        welcome.classList.add('display-3')
        welcome.innerText = "Hello!"
        instructions.innerText = 'Imagine this is a log in screen with full authentication. Click a user below to "log-in".'
        mainRow.appendChild(welcome)
        mainRow.appendChild(instructions)
    }
    
    renderUsers() {
        document.getElementById('main-row').classList.add('jumbotron')
        const userInfo = document.createElement('div')
        userInfo.classList.add('users-list')
        userInfo.id = this.id
        userInfo.innerHTML += `<h3><span class="underline pointer">${this.username}</span></h3>`
        mainRow.appendChild(userInfo)
        userInfo.addEventListener('click', (e) => {
            currentUser = this
            let divsToRemove = document.querySelectorAll('.users-list, .lead, .display-3')
            for (var i = divsToRemove.length-1; i >= 0; i--) {
            divsToRemove[i].remove();
            }
            API.addPosts()
            document.getElementById('new-post-button').style.visibility = "visible"
        })
    }

}