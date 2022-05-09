async function login(form) {
  const email = form.email.value;
  const password = form.password.value;

  const data = {
    email: email,
    password: password
  };

  const result = await fetch('https://pathofexilebota.herokuapp.com/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      if(res['token'] === undefined){
        if(res[0] === undefined){
          toastr.error(res['message'])
          return false;
        }
        toastr.error(res[0])
        return false;
      }
      Cookies.set('token', res['token'])
      location.reload()
    })
}

async function registration(form) {
  const email = form.email.value;
  const password = form.password.value;
  const username = form.username.value;

  const data = {
    email: email,
    username: username,
    password: password
  }

  await fetch('https://pathofexilebota.herokuapp.com/auth/registration', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
    .then(res => {
      if(res['token'] === undefined){
        if(res[0] === undefined){
          toastr.error(res['message'])
          return false;
        }
        toastr.error(res[0])
        return false;
      }
      location.reload()
    })
}

async function logout() {
  Cookies.remove('token')
  location.reload()
}
