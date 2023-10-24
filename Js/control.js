import {
    obtenerDatos
} from "./firebase.js";

let btnDatos = document.getElementById('btnDatos')
let clientes = []


window.addEventListener('DOMContentLoaded', async () => {
    let querySnapshot = await obtenerDatos()
    querySnapshot.forEach(doc => {
        clientes.unshift(doc.data())
    });
})

console.log(clientes);

btnDatos.addEventListener('click', () => {
    let clienteEncontrado = clientes.some(cliente => cliente.nombre === "Alan");

    if(clienteEncontrado){
        console.log("Cliente encontrado")
    }else{
        console.log("Cliente no encontrado")
    }
})






