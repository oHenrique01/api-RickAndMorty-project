const input = document.getElementById("characterId");
const content = document.getElementById("content");
const form = document.querySelector("form");
const btn = document.getElementById("btn-go");
const img = document.getElementById("img");


async function fetchApi(value) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${value}`)
    const data = await response.json()

    if (!response.ok) throw new Error(data.error || 'Personagem não encontrado.')

    return data
}

function getCharacterData(character) {
    const data = {
        name: character.name,
        status: character.status,
        species: character.species,
        episodes: character.episode
    }

    return data
}

function createCard(character) {
    const card = document.createElement('article')
    card.className = 'character-card'

    const data = getCharacterData(character)

    // Cabeçalho com status e nome
    const header = document.createElement('div')
    header.className = 'card-header'

    const statusChip = document.createElement('span')
    statusChip.className = `chip status-${data.status.toLowerCase().replace(/[^a-z]/g, '')}`
    statusChip.textContent = data.status

    // Nome
    const name = document.createElement('h2')
    name.textContent = data.name

    const subtitle = document.createElement('p')
    subtitle.className = 'subtitle'
    subtitle.textContent = `${data.species} • ${character.gender}`

    header.append(statusChip, name, subtitle)

    // Localização
    const locationDiv = document.createElement('div')
    locationDiv.className = 'location'

    const locationLabel = document.createElement('span')
    locationLabel.textContent = 'Localização'

    const locationName = document.createElement('strong')
    locationName.textContent = character.location.name

    locationDiv.append(locationLabel, locationName)

    // Lista de episódios
    const episodeList = document.createElement('div')
    episodeList.className = 'episode-list'

    const episodeTitle = document.createElement('h3')
    episodeTitle.textContent = 'Episódios'

    const episodeUl = document.createElement('ul')

    // Limitar a 10 episódios e criar li para cada
    data.episodes.slice(0, 10).forEach(episodeUrl => {
        const li = document.createElement('li')
        const episodeNumber = episodeUrl.split('/').pop()
        li.textContent = `EP ${episodeNumber}`
        episodeUl.appendChild(li)
    })

    episodeList.append(episodeTitle, episodeUl)

    card.append(header, locationDiv, episodeList)

    return card
}

function showError(message) {
    img.src = ''
    img.alt = 'Erro ao carregar imagem'
    img.classList.remove('loaded')
    content.innerHTML = `<div class="empty-state"><p>${message}</p></div>`
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    // Validar input
    const val = parseInt(input.value, 10)
    if (!val || val < 1) {
        showError('Digite um ID válido (1–826).')
        return
    }

    // Limpar conteúdo anterior e imagem
    content.innerHTML = ''
    img.classList.remove('loaded')
    img.src = ''
    img.alt = ''

    // Mostrar loading e desabilitar botão
    const loading = document.createElement('p')
    loading.className = 'loading'
    loading.textContent = 'Buscando personagem...'
    content.appendChild(loading)

    btn.disabled = true
    btn.textContent = 'Buscando...'

    try {
        const result = await fetchApi(val)

        // Atualizar imagem
        img.src = result.image
        img.alt = `Imagem de ${result.name}`
        img.classList.add('loaded')

        // Criar e adicionar card (remove loading sem limpar tudo)
        const card = createCard(result)
        loading.remove()
        content.appendChild(card)

    } catch (error) {
        showError(error.message || 'Erro ao buscar personagem. Verifique o ID e tente novamente.')
    } finally {
        btn.disabled = false
        btn.textContent = 'Buscar'
    }
})