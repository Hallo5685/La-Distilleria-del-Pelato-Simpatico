// Attende che il DOM sia completamente caricato
document.addEventListener("DOMContentLoaded", () => {
  // Recupera l'utente loggato dal localStorage
  const utente = localStorage.getItem("utenteLoggato");
  if (!utente) {
    window.location.href = "LoginPage.html";
    return;
  }

  // Costruisce la chiave del carrello per l'utente corrente
  const carrelloKey = `carrello_${utente}`;
  // Recupera il carrello dal localStorage, oppure array vuoto se non esiste
  const carrello = JSON.parse(localStorage.getItem(carrelloKey)) || [];

  // Seleziona l'elemento principale della pagina
  const main = document.querySelector(".main");
  main.innerHTML = "";

  // Se il carrello è vuoto, mostra un messaggio e un pulsante per esplorare i prodotti
  if (carrello.length === 0) {
    main.innerHTML = `
      <div class="card">
        <p>Il tuo carrello è vuoto.</p>
        <a href="ProdoctsPage.html"><button class="button">Esplora Prodotti</button></a>
      </div>`;
    return;
  }

  // Inizializza variabili per il subtotale e il numero totale di articoli
  let subtotal = 0;
  let totalItems = 0;

  // Crea la struttura del contenitore dei prodotti
  const table = document.createElement("div");

  // Cicla su ogni elemento del carrello per mostrarlo
  carrello.forEach((item, index) => {
    const prezzo = parseFloat(item.prezzo);
    const quantita = item.quantita || 1;
    subtotal += prezzo * quantita;
    totalItems += quantita;

    // Crea una riga per ogni prodotto
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";
    row.style.marginTop = "20px";

    row.innerHTML = `
      <div><img src="${item.img}" alt="${item.nome}" style="width:80px; border-radius:10px;"></div>
      <div>
        <p><strong>${item.nome}</strong></p>
        <p>${item.descrizione || "Nessuna descrizione"}</p>
        <p>Quantity: <button class="minus">-</button> ${quantita} <button class="plus">+</button></p>
      </div>
      <div>$${(prezzo * quantita).toFixed(2)} <button class="remove">🗑️</button></div>
    `;

    // Aumenta quantità
    row.querySelector(".plus").addEventListener("click", () => {
      item.quantita = quantita + 1;
      salva();
    });

    // Diminuisce quantità (minimo 1)
    row.querySelector(".minus").addEventListener("click", () => {
      if (quantita > 1) {
        item.quantita = quantita - 1;
        salva();
      }
    });

    // Rimuove prodotto
    row.querySelector(".remove").addEventListener("click", () => {
      carrello.splice(index, 1);
      salva();
    });

    table.appendChild(row);
  });

  // Crea il riepilogo del carrello
  const summary = document.createElement("div");
  summary.style.marginTop = "40px";
  summary.innerHTML = `
    <p>Subtotal (${totalItems})</p>
    <p>Spese di Spedizione: Free</p>
    <p>N° prodotti: ${totalItems}</p>
    <h3>Total: $${subtotal.toFixed(2)}</h3>
    <button class="button" onclick="window.location.href='PagamentoPage.html'">Paga</button>
  `;

  // Aggiunge prodotti e riepilogo al DOM
  main.appendChild(table);
  main.appendChild(summary);

  // Funzione per salvare il carrello e ricaricare la pagina
  function salva() {
    localStorage.setItem(carrelloKey, JSON.stringify(carrello));
    window.location.reload();
  }
});
