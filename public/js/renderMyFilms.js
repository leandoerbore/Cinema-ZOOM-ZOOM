async function renderMyFilms() {
  const urlIdLocal = 'http://localhost:12345/auth/getId'
  const urlIdHeroku = 'https://pathofexilebota.herokuapp.com/auth/getId'

  let tokenCookie = Cookies.get('token')
  if (tokenCookie === undefined)
    return false

  fetch(urlIdLocal, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenCookie}`
    }
  })
    .then((res) => {
      return res.json()
    })
    .then(async id => {
      const urlUserFilmsLocal = `https://pathofexilebota.herokuapp.com/users/get-user-films/${id}`
      let filmsResponse = fetch(urlUserFilmsLocal, {
        headers: {
          'Authorization': `Bearer ${tokenCookie}`
        }
      })
        .then((res) => {
          return res.json()
        })

      let array = Array.from(new Set(await filmsResponse))
      array.forEach(id => {
        const urlFilmLocal = `https://pathofexilebota.herokuapp.com/films/${id}`
        fetch(urlFilmLocal)
          .then((res) => {
            return res.json()
          }).then(film => {
          let gridItem = document.createElement('div')
          gridItem.className = 'grid-item'
          gridItem.setAttribute('film-Name', film.title)
          gridItem.setAttribute('id-film', film.id)
          gridItem.setAttribute('onclick', `location.href='/${film.id}'`)

          let filmPreview = document.createElement('div')
          filmPreview.className = 'film-preview'
          filmPreview.textContent = film.description

          let imgItem = document.createElement('img')
          imgItem.className = 'img-round'
          imgItem.src = film.img

          let todayGrid = document.getElementById('films-grid')
          todayGrid.appendChild(gridItem)
          gridItem.appendChild(filmPreview)
          gridItem.appendChild(imgItem)
        })
      })
    })
}
$(document).ready(renderMyFilms());