(function () {
  try {
    var p = new URLSearchParams(location.search);
    if (p.get('embed') === '1' || window.self !== window.top) {
      document.documentElement.classList.add('embed');
      document.body && document.body.classList.add('embed');
      if (!document.body) {
        document.addEventListener('DOMContentLoaded', function () {
          document.body.classList.add('embed');
        });
      }
    }
  } catch (e) {}
})();
