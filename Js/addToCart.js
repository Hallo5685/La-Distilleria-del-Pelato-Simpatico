document.addEventListener("DOMContentLoaded", () => {
  const acquistaBtn = document.getElementById("acquista");
  if (!acquistaBtn) return;

  acquistaBtn.addEventListener("click", () => {
    const utente = localStorage.getItem("utenteLoggato");
    if (!utente) {
      alert("Effettua il login per acquistare.");
      window.location.href = "LoginPage.html";
      return;
    }

    const prodotto = JSON.parse(acquistaBtn.getAttribute("data-prodotto"));
    prodotto.prezzo = parseFloat(prodotto.prezzo);
    prodotto.quantita = 1;

    const carrelloKey = `carrello_${utente}`;
    const carrello = JSON.parse(localStorage.getItem(carrelloKey)) || [];

    const giàPresente = carrello.find(p => p.nome === prodotto.nome);
    if (!giàPresente) {
      carrello.push(prodotto);
      localStorage.setItem(carrelloKey, JSON.stringify(carrello));
    }

    window.location.href = "EmptyCartPage.html";
  });
});
