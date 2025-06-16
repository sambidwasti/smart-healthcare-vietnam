// Immediately load navbar without waiting for DOMContentLoaded
fetch("navbar.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("navbar-container").innerHTML = html;
  });