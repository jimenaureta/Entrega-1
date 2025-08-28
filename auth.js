import { iniciarSesion } from "./common.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const u = (document.getElementById("usuario")?.value || "").trim();
    const p = (document.getElementById("password")?.value || "").trim();

    if (!u || !p) {
      alert("Complete Email y Contraseña.");
      (u ? document.getElementById("password") : document.getElementById("usuario"))?.focus();
      return;
    }

    iniciarSesion(u);
    location.href = "products.html";
  });
});