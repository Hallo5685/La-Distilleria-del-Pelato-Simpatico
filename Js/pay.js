document.addEventListener("DOMContentLoaded", () => {
  const utente = localStorage.getItem("utenteLoggato");
  if (!utente) {
    window.location.href = "LoginPage.html";
    return;
  }

  const form = document.getElementById("payForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Pagamento effettuato!");
    localStorage.removeItem(`carrello_${utente}`);
    window.location.href = "HomePage.html";
  });
});
