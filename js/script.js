fetch("navbar.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("navbar-container").innerHTML = html;

    // Optional: Trigger style reflow (browser hint)
    void document.getElementById("navbar-container").offsetHeight;

    // Optional: manually load any scripts that depend on the navbar
    const script = document.createElement("script");
    script.src = "js/auth.js";
    document.body.appendChild(script);
  });