import {
  getFirestore
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

/** @type {HTMLOutputElement} */
const ctDispositivo = document.
  querySelector("#ctDispositivo");
/** @type {HTMLInputElement} */
const ctSalida = document.
  querySelector("#ctSalida");
/** @type {HTMLMeterElement} */
const ctEntrada = document.
  querySelector("#ctEntrada");

const firestore = getFirestore();
const colSalida =
  firestore.collection("Salida");
const colEntrada =
  firestore.collection("Entrada");
const dispositivoId = prompt(
  "Identificador de Dispositivo:",
  "iot1");

if (dispositivoId) {
  ctSalida.addEventListener(
    "click", modificaSalida);
  ctDispositivo.value =
    dispositivoId;
  setup();
}
async function setup() {
  try {
    escuchaEntrada();
    await leeSalida();
  } catch (e) {
    muestraError(e);
  }
}
async function leeSalida() {
  const doc = await colSalida.
    doc(dispositivoId).get();
  if (doc.exists) {
    const data = doc.data();
    ctSalida.checked =
      Boolean(data.valor);
  }
}
async function modificaSalida() {
  try {
    const valor =
      ctSalida.checked ? 1 : 0;
    await colSalida.
      doc(dispositivoId).
      set({ valor });
  } catch (e) {
    muestraError(e);
  }
}
function escuchaEntrada() {
  colEntrada.
    doc(dispositivoId).
    onSnapshot(
      doc => {
        if (doc.exists) {
          const data = doc.data();
          ctEntrada.value =
            data.valor || 0;
        }
      },
      e => {
        muestraError(e);
        escuchaEntrada();
      });
}