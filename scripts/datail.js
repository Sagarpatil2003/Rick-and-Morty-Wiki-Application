function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search)
  return params.get(param)
}

async function loadCharacter() {
  const id = getQueryParam('id')
  if (!id) return

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
  const character = await res.json()

  document.getElementById('characterImage').src = character.image
  document.getElementById('characterName').textContent = character.name
  document.getElementById('characterStatus').textContent = character.status
  document.getElementById('characterSpecies').textContent = character.species
  document.getElementById('characterType').textContent = character.type || 'N/A'
  document.getElementById('characterGender').textContent = character.gender
  document.getElementById('characterOrigin').textContent = character.origin.name
  document.getElementById('characterLocation').textContent = character.location.name

  const episodeList = document.getElementById('episodeList')
  const episodePromises = character.episode.map(url => fetch(url).then(r => r.json()))
  const episodes = await Promise.all(episodePromises)

  episodes.forEach(ep => {
    const li = document.createElement('li')
    li.textContent = `${ep.episode} - ${ep.name}`
    episodeList.appendChild(li)
  })
}

function updateClock() {
  const clock = document.getElementById('footerClock')
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour12: false })
  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  clock.textContent = `${time} ${date}`
}

loadCharacter()
updateClock()
setInterval(updateClock, 1000)
