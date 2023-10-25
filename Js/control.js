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


document.addEventListener("DOMContentLoaded", function() {
    var enviarButton = document.getElementById("enviar");
    var respuestaDiv = document.getElementById("respuesta");

    enviarButton.addEventListener("click", function() {
        var numero = document.getElementById("numero").value;
        var mensaje = document.getElementById("mensaje").value;
        var archivo = document.getElementById("archivo").files[0];

        var formData = new FormData();
        formData.append("secret", "API_SECRET"); 
        formData.append("account", "TU_ACCOUNT_ID");
        formData.append("recipient", numero);
        formData.append("type", "media");
        formData.append("message", mensaje);
        formData.append("media_file", archivo);

        var xhr = new XMLHttpRequest();
        
        xhr.open("POST", "https://whats-flow.com/api/send/whatsapp", true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                respuestaDiv.innerHTML = "Mensaje enviado: " + JSON.stringify(result, null, 4);
            } else {
                respuestaDiv.innerHTML = "Error al enviar el mensaje: " + xhr.statusText;
            }
        };

        xhr.onerror = function() {
            respuestaDiv.innerHTML = "Error en la solicitud AJAX";
        };

        xhr.send(formData);
    });
});







