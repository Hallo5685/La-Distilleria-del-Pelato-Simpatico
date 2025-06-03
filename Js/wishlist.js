document.addEventListener("DOMContentLoaded", () => {
  const WISHLIST_KEY = "wishlist";

  // Funzione di salvataggio
  function salvaWishlist(lista) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(lista));
  }

  // Funzione di lettura
  function caricaWishlist() {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  }

  // === PAGINA PRODOTTI ===
  if (window.location.pathname.includes("ProdoctsPage.html")) {
    const cuori = document.querySelectorAll(".wishlist-icon");
    const lista = caricaWishlist();

    cuori.forEach((cuore) => {
      const prodotto = cuore.closest(".product-highlight");
      const nomeEl = prodotto.querySelector("h3") || prodotto.querySelector("h4");
      const nome = nomeEl ? nomeEl.textContent.trim() : "";

      // Se già nella lista → cuore rosso
      if (lista.some(p => p.nome === nome)) {
        cuore.classList.add("active");
        cuore.innerHTML = "❤️";
      }

      cuore.style.cursor = "pointer";
      cuore.addEventListener("click", (e) => {
        e.preventDefault();

        const img = prodotto.querySelector("img").src;
        let listaCorrente = caricaWishlist();

        if (cuore.classList.contains("active")) {
          // Se già attivo → rimuovi
          listaCorrente = listaCorrente.filter(p => p.nome !== nome);
          salvaWishlist(listaCorrente);
          cuore.classList.remove("active");
          cuore.innerHTML = "♡";
        } else {
          // Aggiungi se non c'è
          const nuovo = { nome, img };
          if (!listaCorrente.some(p => p.nome === nome)) {
            listaCorrente.push(nuovo);
            salvaWishlist(listaCorrente);
          }
          cuore.classList.add("active");
          cuore.innerHTML = "❤️";
        }
      });
    });
  }

  // === PAGINA WISHLIST ===
  if (window.location.pathname.includes("WishListPage.html")) {
    const main = document.querySelector(".main");
    const lista = caricaWishlist();
    main.innerHTML = "";

    if (lista.length === 0) {
      main.innerHTML = '<div class="card"><p>Non hai salvato <strong>nulla</strong> nella tua lista dei desideri.</p></div>';
    } else {
      const titolo = document.createElement("h2");
      /*titolo.textContent = "Lista dei Desideri";
      titolo.style.textAlign = "center";
      titolo.style.color = "#a8433b";*/
      main.appendChild(titolo);

      const griglia = document.createElement("div");
      griglia.className = "products-grid";

      lista.forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <a href="product.html?nome=${encodeURIComponent(item.nome)}">
            <img src="${item.img}" alt="${item.nome}">
          </a>
          <p><strong>${item.nome}</strong></p>
          <p style="font-size: 12px; color: gray;">Aggiunto oggi</p>
        `;
        griglia.appendChild(card);
      });

      main.appendChild(griglia);
    }
  }
});
/*MODIFICARE IL COLLEGAMENTO TRA GLI ELEMENTI APPENA INSERITI NELLA WISHLISTPAGE.HTML e LE RELATIVE PAGINE DEI PRODOTTI */