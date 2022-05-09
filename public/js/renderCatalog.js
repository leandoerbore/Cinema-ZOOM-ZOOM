async function renderCatalog() {
  const url = 'https://pathofexilebota.herokuapp.com/films'
  let response = fetch(url)
    .then((res) => {
      return res.json();
    })

  let array = Array.from(new Set(await response))

  array.forEach(film => {
    let gridItem = document.createElement('div')
    gridItem.className = 'grid-item'
    gridItem.setAttribute('film-Name', film.title)
    gridItem.setAttribute('genre', film.genres)
    gridItem.setAttribute('id-film', film.id)
    gridItem.setAttribute('onclick', `location.href='/${film.id}'`)

    let filmPreview = document.createElement('div')
    filmPreview.className = 'film-preview'
    filmPreview.textContent = film.description

    let imgItem = document.createElement('img')
    imgItem.className = 'img-round'
    imgItem.src = film.img

    let todayGrid = document.getElementById('catalog')
    todayGrid.appendChild(gridItem)
    gridItem.appendChild(filmPreview)
    gridItem.appendChild(imgItem)

  })
}
$(document).ready(renderCatalog());