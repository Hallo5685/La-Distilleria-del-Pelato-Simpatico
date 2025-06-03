document.addEventListener("DOMContentLoaded", () => {
  const WISHLIST_KEY = "wishlist";

  function salvaWishlist(lista) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(lista));
  }

  function caricaWishlist() {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  }

  function nomeToPagina(nome) {
    return (
      nome
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/\s+/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        + "Page.html"
    );
  }

  // === PAGINA PRODOTTI ===
  if (window.location.pathname.includes("ProdoctsPage.html")) {
    const cuori = document.querySelectorAll(".wishlist-icon");
    const lista = caricaWishlist();

    cuori.forEach((cuore) => {
      const prodotto = cuore.closest(".product-highlight");
      const nomeEl = prodotto.querySelector("h3") || prodotto.querySelector("h4");
      const nome = nomeEl ? nomeEl.textContent.trim() : "";

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
          listaCorrente = listaCorrente.filter(p => p.nome !== nome);
          salvaWishlist(listaCorrente);
          cuore.classList.remove("active");
          cuore.innerHTML = "♡";
        } else {
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
      main.appendChild(titolo);

      const griglia = document.createElement("div");
      griglia.className = "products-grid";
      //Formatta il titolo dekla pagina
      lista.forEach(item => {
        const nomePagina = nomeToPagina(item.nome);

        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <a href="${nomePagina}">
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