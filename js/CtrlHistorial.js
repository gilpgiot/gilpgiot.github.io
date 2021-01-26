import {
  getFirestore
} from "../lib/fabrica.js";
import {
  cod, muestraError
} from "../lib/util.js";

const tbody =
  document.querySelector("tbody");

renderHistorial();
async function renderHistorial() {
  try {
    let html = "";
    const snap =
      await getFirestore().
        collection("Historial").
        orderBy("timestamp").
        get();
    snap.forEach(doc => {
      const data = doc.data();
      html += /* html */
        `<tr>
          <td>
            ${cod(doc.id)}
          </td>
          <td>
            ${cod(
          data.dispositivoId)}
          </td>
          <td>
            ${cod(data.valor.
            toString())}
          </td>
          <td>
            ${cod(data.timestamp.
              toString())}
          </td>
        </tr>`;
    });
    tbody.innerHTML = html;
  } catch (e) {
    muestraError(e);
  }
}