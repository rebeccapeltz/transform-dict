const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

// Search and filter
const searchUser = async searchText => {
    const res = await fetch('./xforms.json')
    const xforms = await res.json();
    // console.log(users)

    // Get matches to current text input
    let matchs = xforms.filter(xform => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return xform.name.match(regex) || xform.name.match(regex) || xform.symbol.match(regex)
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
                <h4>${match.name} (${match.symbol}) </h4>
                <div>
                    <small><span class="val-label">Values:</span><br> ${match.values.map(item => {
                        return `${item.val} ${item.notes}`}).join('<br>')} 
                    </small>
                </div>
                 <div>
                     <small><span class="val-label">Notes:</span><br> ${match.notes}</small>
                 </div>      
            </div>
        `).join('')
        // console.log(html)
        matchList.innerHTML = html
    }
}

search.addEventListener('input', () => searchUser(search.value))