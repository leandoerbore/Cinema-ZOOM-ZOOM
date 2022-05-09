function search(form) {
  const input = form.sr.value;
  if (input === '') visualBlock();
  const films = document.getElementsByClassName('grid-item');
  let arrFilms = [];

  for (let i = 0; i < films.length; ++i) {
    if (films[i].style.display === 'none') films[i].style.display = 'block';
    if (films[i].getAttribute('film-name').indexOf(input)) {
      films[i].style.display = 'none';
      continue;
    }
    arrFilms.push(films[i]);
  }
  return false;
}

function visualBlock() {
  const films = document.getElementsByClassName('grid-item');
  for (let i = 0; i < films.length; ++i) {
    films[i].style.display = 'block';
  }
  return false;
}

function find(genre) {
  const films = document.getElementsByClassName('grid-item');
  let arrFilms = [];
  for (let i = 0; i < films.length; ++i) {
    if (films[i].style.display === 'none') films[i].style.display = 'block';
    if (films[i].getAttribute('genre').indexOf(genre) === -1) {
      if (films[i].style.display === 'none') films[i].style.display = 'block';
      films[i].style.display = 'none';
      continue;
    }
    arrFilms.push(films[i]);
  }
  return false;
}

$(document).ready(function ($) {
  // Открыть
  $('.popup-open').click(function () {
    $('.popup-fade').fadeIn(0);
    return false;
  });

  // Клик по ссылке "Закрыть".
  $('.popup-close').click(function () {
    $(this).parents('.popup-fade').fadeOut(0);
    return false;
  });

  // Закрытие по клавише Esc.
  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.popup-fade').fadeOut(0);
    }
  });

  $('.popup-sale-open').click(function () {
    $('.popup-sale').fadeIn(0);
    return false;
  });

  // Клик по ссылке "Закрыть".
  $('.popup-sale-close').click(function () {
    $(this).parents('.popup-sale').fadeOut(0);
    return false;
  });

  // Закрытие по клавише Esc.
  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.popup-sale').fadeOut(0);
    }
  });

  /*$(document).on('mouseover', '.film-preview', function () {
    //.grid-item
    let filmId = $(this.parentElement).attr('id-film');

    sendRequest(
      'https://raw.githubusercontent.com/leandoerbore/cinema/master/public/json/films.json',
    ).then((data) => {
      const film = data['films'].filter(
        (item) => {
          console.log(item['id'] + ' ' + filmId)
          item['id'].indexOf(filmId)
        },
      );
      let text = film[0]['preview-text'];
      $('.film-preview').text(text);
    }),
      (err) => {
        toastr.error('Описание фильмов потерялось');
      };
  });*/
});

function sendRequest(requestUrl) {
  let response = fetch(requestUrl).then((response) => response.json());
  return response;
}

function sale(form) {
  let email = form.email.value;
  let time = form.calendar.value;
  let price = '200';
  localStorage.setItem('email', email);
  localStorage.setItem('time', time);
  localStorage.setItem('price', price);

  window.location.href = 'payment.html';

  return false;
}

function delFilm(btn) {
  const parent = $(btn).parents();
  const gridItem = parent[0];
  gridItem.remove();

  const filmId = gridItem.getAttribute('id');
  $.ajax({
    url: '/PHP/deleteFilm.php',
    method: 'POST',
    data: { filmId: filmId },
    success: function (data) {
      if (data === '1') {
        toastr.success('Фильм успешно удален!');
      }
    },
  });

  return false;
}

document.addEventListener('DOMContentLoaded', logInOut);
function logInOut() {
  if (Cookies.get('token') === undefined) {
    $('#sign-in-id').css('display', 'block');
    $('#sign-out-id').css('display', 'none');
  } else {
    $('#sign-in-id').css('display', 'none');
  }
}
