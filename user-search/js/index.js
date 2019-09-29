const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

// Search and filter
const searchUser = async searchText => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json();
    // console.log(users)
    
    // Get matches to current text input
    let matchs = users.filter(user => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return user.name.match(regex) || user.username.match(regex) || user.email.match(regex)
    })
    if (searchText.length === 0) {
        matchs = []
        matchList.innerHTML = ''
    }
    // console.log(matchs)
    
    // Output
    outputHtml(matchs);
}

const outputHtml = matchs => {
    if (matchs.length > 0) {
        const html = matchs.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.username}) <span class="text-primary">${match.email}</span></h4>
                <small>Phone: ${match.phone} / Company: ${match.company.name}</small>
            </div>
        `).join('')
        // console.log(html)
        matchList.innerHTML = html
    }
}

search.addEventListener('input', () => searchUser(search.value))