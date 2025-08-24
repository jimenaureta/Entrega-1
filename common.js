// define la URL del JSON de productos (categoría 101).
export const PRODUCTS_101_URL =
  "https://japceibal.github.io/emercado-api/cats_products/101.json"; //

// hace el fetch y, si la respuesta no es OK, lanza un error; si todo va bien, devuelve el r.json()
export const getJSONData = (URL) =>
  fetch(URL).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`); //
    return r.json();
  });

// convierte una ruta relativa del JSON en una URL absoluta apuntando a https://japceibal.github.io/emercado-api/. Si path ya es una URL (http/https), la devuelve tal cual.
export const fullAsset = (path) => {
  const p = String(path || "").trim();
  if (/^https?:\/\//i.test(p)) return p;    
  const clean = p.replace(/^(\.\/|\/)+/g, ""); 
  return `https://japceibal.github.io/emercado-api/${clean}`;
};

const K = "sesionIniciada";
const U = "usuario";

export const sesionActiva = () => sessionStorage.getItem(K) === "true";

export const iniciarSesion = (user) => {
  sessionStorage.setItem(K, "true");
  sessionStorage.setItem(U, user || "");
};

export const cerrarSesion = () => {
  sessionStorage.removeItem(K);
  sessionStorage.removeItem(U);
  location.href = "index.html";
};

export const requerirSesion = () => {
  if (!sesionActiva()) location.href = "index.html";
};