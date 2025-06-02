document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // blocca l’invio classico del form

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const utentiSalvati = JSON.parse(localStorage.getItem("accountUtenti")) || [];

    const utenteTrovato = utentiSalvati.find(
      utente => utente.email === email && utente.password === password
    );

    if (utenteTrovato) {
      alert("Login effettuato con successo!");
      localStorage.setItem("utenteLoggato", utenteTrovato.email);
      window.location.href = "../Site/HomePage.html";
    } else {
      alert("Email o password errati.");
    }
  });
});
