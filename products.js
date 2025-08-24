// Permite traer cosas de otro archivo JS, funciona sólo en módulos.
import {
  getJSONData,
  PRODUCTS_101_URL,
  fullAsset,
  requerirSesion, //
  cerrarSesion,
} from "./common.js";

// Respaldo cuando la imagen que viene en el JSON no carga.
const backupImages = {
  "Chevrolet Onix Joy":
    "https://www.chevrolet.com.uy/content/dam/chevrolet/south-america/uruguay/espanol/index/cars/2021-onix/colorizer/01-images/new-colorizer/ago-2022/colorizer-blanco.jpg?imwidth=1200",
  "Fiat Way":
    "https://http2.mlstatic.com/D_NQ_NP_687550-MLU50708884548_072022-O.webp",
  "Suzuki Celerio":
    "https://www.suzuki.com.uy/public/color5.png",
  "Peugeot 208":
    "https://www.pngplay.com/wp-content/uploads/13/Peugeot-208-2019-Download-Free-PNG.png",
  "Bugatti Chiron":
    "https://purepng.com/public/uploads/large/purepng.com-black-bugatti-chiron-carcarvehicletransportbugatti-961524653349rn5ct.png",
};

//Cuando termina de cargar la página, verifica que haya sesión. Conecta el botón salir y busca el contenedor.
// También pide el JSON de los productos, limpia el contenedor y luego recorre la lista.
document.addEventListener("DOMContentLoaded", async () => {
  requerirSesion();

  document.getElementById("btnSalir")?.addEventListener("click", cerrarSesion);
  const cont = document.getElementById("productos-container");

  try {
    const { products = [] } = await getJSONData(PRODUCTS_101_URL);
    cont.innerHTML = "";

    products.forEach((p) => {
      const art = document.createElement("article");
      art.className = "fila";

      // --- figura + imagen ---
      const fig = document.createElement("figure");
      fig.className = "thumb";

      const img = document.createElement("img");
      img.alt = p.name;
      img.loading = "lazy";
      img.referrerPolicy = "no-referrer"; // evita bloqueos por referrer

      // 1) intentamos con la imagen del JSON
      const jsonURL = fullAsset(p.image);
      img.src = jsonURL;

      // control de reintento con respaldo
      let triedBackup = false;

      img.onerror = () => {
        // 2) si falla la del JSON, probamos la de respaldo (si existe)
        if (!triedBackup && backupImages[p.name]) {
          triedBackup = true;
          const backup = backupImages[p.name];
          console.warn("[IMG] Falla JSON, probando backup:", p.name, "=>", backup);
          img.src = backup;
          return;
        }
        // 3) si también falla, placeholder
        const ph = `https://placehold.co/800x480?text=${encodeURIComponent(p.name)}`;
        console.error("[IMG] Falla backup, usando placeholder:", p.name, "=>", ph);
        img.src = ph;
      };

      // log para depurar la URL que intenta primero, asigna una imagen genérica en caso de que falle.
      console.log("[IMG try JSON]", p.name, "=>", jsonURL);

      // pone la imagen dentro del <figure class="thumb">.
      fig.appendChild(img);

      // Permite cargar título, vendidos, descripción y precio usando los datos del producto.
      const info = document.createElement("div");
      info.className = "info";
      info.innerHTML = `
        <h2 class="nombre">${p.name}</h2>
        <span class="vendidos">${p.soldCount} unidades</span>
        <p class="desc">${p.description}</p>
        <span class="precio">USD ${p.cost}</span>
      `;

        // agrega la figura (imagen) y el bloque de info dentro del <article class="fila">.
      art.append(fig, info);
      cont.appendChild(art); // mete ese article en el contenedor
    });
  } catch (e) {
    cont.textContent = `Error cargando productos: ${e.message}`; // Si algo falla en el proceso (fetch, etc.), el catch muestra un mensaje de error dentro del contenedor
  }
});