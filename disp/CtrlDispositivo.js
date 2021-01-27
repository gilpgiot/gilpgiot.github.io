import {
  ProxyEntrada
} from "./ProxyEntrada.js";
import {
  ProxyHistorial
} from "./ProxyHistorial.js";
import {
  ProxySalida
} from "./ProxySalida.js";
import {
  urlDeColección,
  urlDeDocumento
} from "./utilIoT.js";

/** @type {HTMLOutputElement} */
const ctDispositivo = document.
  querySelector("#ctDispositivo");
/** @type {HTMLOutputElement} */
const ctSalida = document.
  querySelector("#ctSalida");
/** @type {HTMLOutputElement} */
const iotError = document.
  querySelector("#iotError");
/** @type {HTMLInputElement} */
const ctEntrada = document.
  querySelector("#ctEntrada");
/** @type {HTMLInputElement} */
const ctSondea = document.
  querySelector("#ctSondea");

const dispositivoId = prompt(
  "Identificador del Dispositivo",
  "iot1");
const ID_PROYECTO = "gilpgiotx";
const URL_SALIDA =
  urlDeDocumento(ID_PROYECTO,
    "Salida", dispositivoId);
const URL_ENTRADA =
  urlDeDocumento(ID_PROYECTO,
    "Entrada", dispositivoId);
const URL_HISTORIAL =
  urlDeColección(ID_PROYECTO,
    "Historial");
let entrada = 0;
let proxySalida =
  new ProxySalida(URL_SALIDA);
let proxyEntrada =
  new ProxyEntrada(URL_ENTRADA);
let proxyHistorial =
  new ProxyHistorial(
    dispositivoId, URL_HISTORIAL);

if (dispositivoId) {
  ctDispositivo.value =
    dispositivoId;
  programa();
}
function sondeaSalida() {
  return ctSondea.checked;
}
/** @param {number} valor */
function muestraSalida(valor) {
  ctSalida.value =
    (valor || 0).toFixed(0);
}
function recuperaEntrada() {
  return ctEntrada.valueAsNumber;
}
/** @param {string} mensaje */
function muestraError(mensaje) {
  console.error(mensaje);
  iotError.value = mensaje;
}
async function setup() {
  await
    muestraLaSalidaDelServidor();
  await envíaLaEntrada(true);
}
async function loop() {
  await
    muestraLaSalidaDelServidor();
  await envíaLaEntrada(false);
}
async function
  muestraLaSalidaDelServidor() {
  if (sondeaSalida()) {
    const res =
      await proxySalida.get();
    if (res.error.length > 0) {
      muestraError(res.error);
    } else {
      muestraSalida(res.valor);
    }
  }
}
/** @param {boolean} forzosa */
async function
  envíaLaEntrada(forzosa) {
  const nuevaEntrada =
    recuperaEntrada();
  if (forzosa ||
    entrada != nuevaEntrada) {
    let error =
      await proxyEntrada.
        set(nuevaEntrada);
    if (error.length > 0) {
      muestraError(error);
      return;
    }
    error = await proxyHistorial.
      add(nuevaEntrada);
    if (error.length > 0) {
      muestraError(error);
      return;
    }
    entrada = nuevaEntrada;
  }
}
async function programa() {
  await setup();
  await repiteLoop();
}
async function repiteLoop() {
  await loop();
  setTimeout(repiteLoop, 1000);
}