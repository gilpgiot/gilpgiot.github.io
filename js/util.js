/** Muestra un error en la consola y un cuadro de alerta con el mensaje.
 * @param {Error} e descripción del error. */
export function muestraError(e) {
  console.error(e);
  alert(e.message);
}

/** Codifica un texto para que escape los caracteres especiales y no se
 * pueda interpretar como HTML. Esta técnica evita la inyección de código.
 * @param {string} texto
 * @returns {string} un texto que no puede interpretarse como HTML. */
export function cod(texto) {
  return (texto || "").toString()
    .replace(/[<>"']/g,
      /** @param {string} letra */
      letra => {
        switch (letra) {
          case "<": return "&lt;";
          case ">": return "&gt;";
          case '"': return "&quot;";
          case "'": return "&#039;";
          default: return letra;
        }
      });
}