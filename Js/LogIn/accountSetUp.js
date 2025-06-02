function inizializzaAccountPredefiniti() {
  if (!localStorage.getItem("accountUtenti")) {
    const utentiPredefiniti = [
        { email: "martino@gmail.it", password: "martino123" },
        { email: "elonora@gmail.it", password: "elonora123" },
        { email: "asia@gmail.it", password: "asia123" }
    ];

    localStorage.setItem("accountUtenti", JSON.stringify(utentiPredefiniti));
  }
}

document.addEventListener("DOMContentLoaded", inizializzaAccountPredefiniti);
