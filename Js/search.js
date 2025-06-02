// Aspetta che tutto l'HTML sia stato caricato prima di eseguire il codice
document.addEventListener("DOMContentLoaded", function () 
{
  // Seleziona l'input della barra di ricerca (campo di testo)
  const searchInput = document.querySelector(".search-bar");
  // Seleziona tutti gli elementi dei prodotti nella pagina
  const productElements = document.querySelectorAll(".product-highlight");
  // Aggiunge un ascoltatore di eventi: ogni volta che si digita qualcosa nell'input
  searchInput.addEventListener("input", function () {
    // Prende il testo scritto nella barra e lo converte in minuscolo
    const searchTerm = searchInput.value.toLowerCase();
    // Scorre tutti i prodotti uno per uno
    productElements.forEach((product) => {
      //Prende il nome del prodotto
      const productName = product.querySelector("h3, h4").textContent.toLowerCase();
      // Se il nome del prodotto include il testo digitato
      if (productName.includes(searchTerm)) 
        {
        product.style.display = "flex";
      } else 
      {
        product.style.display = "none";
      }
    });
  });
});
