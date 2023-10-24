import {
    obtenerDatos
} from "./firebase.js";

let btnDatos = document.getElementById('btnDatos')
let clientes = []


window.addEventListener('DOMContentLoaded', async () => {
    let querySnapshot = await obtenerDatos()
    querySnapshot.forEach(doc => {
        clientes.push(doc.data())
    });
})

console.log(clientes);

btnDatos.addEventListener('click', () => {
    clientes.forEach( cliente => {
        console.log(`Su nombre es ${cliente.nombre} ${cliente.apellido}`);
    })
})






