async function renderFilmPage() {
  const loc = location.href.split('/')
  const id = loc.pop()

  const urlLocal = `https://pathofexilebota.herokuapp.com/films/${id}`


  fetch(urlLocal)
    .then((res) => {
      return res.json()
    })
    .then(film => {
      let filmContainer = document.getElementById('film-container')

      let h = document.createElement('h1')
      h.textContent = film.title
      let filmInfoShort = document.createElement('div')
      filmInfoShort.className = 'film-info-short'
      filmInfoShort.appendChild(h)

      let filmFull = document.createElement('div')
      filmFull.className = 'film-full'

      let filmImage = document.createElement('div')
      filmImage.className = 'film-image'
      let img = document.createElement('img')
      img.className = 'rand'
      img.src = film.img
      filmImage.appendChild(img)

      let p1 = document.createElement('p')
      let span1 = document.createElement('span')
      span1.className = 'tip'
      span1.textContent = 'Время'
      let span1_1 = document.createElement('span')
      span1_1.textContent = `${film.time} мин.`
      p1.appendChild(span1)
      p1.appendChild(span1_1)

      let p2 = document.createElement('p')
      let span2 = document.createElement('span')
      span2.className = 'tip'
      span2.textContent = 'Режиссер'
      let span2_2 = document.createElement('span')
      const urlProducerLocal = `https://pathofexilebota.herokuapp.com/database/get-producer-by-id/${film.producer}`
      fetch(urlProducerLocal)
        .then((res) => {
          return res.json()
        })
        .then(producer => {
          span2_2.textContent = `${producer.name}`
          p2.appendChild(span2)
          p2.appendChild(span2_2)

          let p3 = document.createElement('p')
          let span3 = document.createElement('span')
          span3.className = 'tip'
          span3.textContent = 'Страна'
          let span3_1 = document.createElement('span')
          span3_1.textContent = `${film.country}`
          p3.appendChild(span3)
          p3.appendChild(span3_1)

          let p4 = document.createElement('p')
          let span4 = document.createElement('span')
          span4.className = 'tip'
          span4.textContent = 'Премьера в России'
          let span4_1 = document.createElement('span')
          span4_1.textContent = `${film.premierDate}`
          p4.appendChild(span4)
          p4.appendChild(span4_1)

          let p5 = document.createElement('p')
          p5.textContent = `${film.description}`

          let popupSale = document.createElement('div')
          popupSale.className = 'popup-sale-div'
          let popupLink_a = document.createElement('a')
          popupLink_a.className = 'popup-sale-open a-block item-inner'
          popupLink_a.textContent = 'КУПИТЬ'
          popupSale.appendChild(popupLink_a)

          let buttonAdd = document.createElement('button')
          buttonAdd.type='submit'
          buttonAdd.className = 'btn-add'
          /*buttonAdd.setAttribute('name', 'film-id')
          buttonAdd.setAttribute('value', `${id}`)*/
          buttonAdd.textContent = 'ДОБАВИТЬ'

          let addFilmForm = document.createElement('form')
          addFilmForm.className = 'add-film-div'
          addFilmForm.setAttribute('onsubmit', `addFilm(${id}); return false;`)
          addFilmForm.appendChild(buttonAdd)


          let filmText = document.createElement('div')
          filmText.className = 'film-text'
          filmText.appendChild(p1)
          filmText.appendChild(p2)
          filmText.appendChild(p3)
          filmText.appendChild(p4)
          filmText.appendChild(p5)


          filmFull.appendChild(filmImage)
          filmFull.appendChild(filmText)
          filmFull.appendChild(popupSale)
          filmFull.appendChild(addFilmForm)

          filmContainer.appendChild(filmInfoShort)
          filmContainer.appendChild(filmFull)
        })
    })
}

$(document).ready(renderFilmPage())