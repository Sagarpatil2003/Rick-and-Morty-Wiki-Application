let currentPage = 1

async function fetchCharacters(page = 1) {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
  const data = await res.json()
  renderCharacters(data.results)
}

function renderCharacters(characters) {
  const container = document.getElementById('character-grid')
  container.innerHTML = ''
  characters.slice(0, 6).forEach(char => {
    container.innerHTML += `
      <div class="card">
        <img src="${char.image}" />
        <h3>${char.name}</h3>
        <p>${char.species}</p>
        <p>Status: ${char.status}</p>
        <a href="character.html?id=${char.id}" target="_blank">View Details</a>
      </div>
    `
  })
}

document.getElementById('prev-btn').onclick = () => {
  if (currentPage > 1) fetchCharacters(--currentPage)
}
document.getElementById('next-btn').onclick = () => {
  fetchCharacters(++currentPage)
}

function updateClock() {
  const now = new Date()
  document.getElementById('clock').textContent =
    now.toLocaleTimeString() + ' ' + now.toDateString()
}

setInterval(updateClock, 1000)
updateClock()
fetchCharacters(currentPage)
