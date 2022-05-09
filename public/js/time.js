(function () {
  window.onload = function () {
    const timer_value = performance.now() / 1000;

    const serverTime = Cookies.get('server-time') * 1;
    document.getElementById('timer').innerHTML =
      'Total load time: ' +
      timer_value.toFixed(4) +
      ' s (client) + ' +
      serverTime.toFixed(4) +
      's (server)';
  };
})();
