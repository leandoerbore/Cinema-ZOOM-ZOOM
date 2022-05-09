async function addFilm(id) {
  const urlIdLocal = 'https://pathofexilebota.herokuapp.com/auth/getId'
  const urlIdHeroku = ''

  let tokenCookie = Cookies.get('token')
  console.log(tokenCookie)
  if (tokenCookie === undefined)
    return false

  let token = {
    token: tokenCookie
  }
  fetch(urlIdLocal, {
    method: 'POST',
    body: JSON.stringify(token),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return res.json()
    })
    .then(userId => {
      const data = {
        'userId':userId,
        'filmId':id
      }
      const urlAddFilmLocal = `https://pathofexilebota.herokuapp.com/users/add-user-film`
      fetch(urlAddFilmLocal, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        }
      })
        .then((res) => {
          console.log(res.json())
        })
    })

  return false;
}