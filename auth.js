import { iniciarSesion, sesionActiva } from "./common.js"; // Importa las utilidades.

console.log("[auth] init, origen:", location.origin, location.pathname); // Para ver origen y ruta en la consola.

if (sesionActiva()) {
    console.log("[auth] ya hay sesión, redirigiendo a products.html"); // Chequea si hay inicio de sesión
    location.href = "products.html";
}

// Espera a que carga el DOM
addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm"); // Toma el formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const u = document.getElementById("txtUsuario").value.trim(); // Lee los campos
        const p = document.getElementById("pssContraseña").value.trim(); 
        if (!u || !p) {
            alert("Complete Usuario y Contraseña.");
            return;
        }
        iniciarSesion(u);
        console.log("[auth] redirigiendo a products.html");
        location.href = "products.html";
    });
});