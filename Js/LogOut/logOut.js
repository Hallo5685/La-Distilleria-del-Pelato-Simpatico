document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("atom-sitelogo");
  if (logo) {
    logo.style.cursor = "pointer";
    logo.title = "Clicca per uscire";

    logo.addEventListener("click", () => {
      const conferma = confirm("Vuoi davvero uscire?");
      if (conferma) {
        localStorage.removeItem("utenteLoggato");
        window.location.href = "LoginPage.html";
      }
    });
  }
});
