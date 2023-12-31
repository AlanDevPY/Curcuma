import {
    obtenerClientes,
} from "./firebase.js";


let btnEnvio = document.getElementById("btnEnvio")
let areaMensaje = document.getElementById("areaMensaje")
let operadora = 595
let inputFile = document.getElementById("inputFile");




    btnEnvio.addEventListener('click', (e) => {
        e.preventDefault()


        obtenerClientes((querySnapshot) => {
            const clientes = []; // Arreglo para almacenar números de teléfono
            querySnapshot.forEach((doc) => { 
                const cliente = doc.data();
                clientes.push(cliente);
            });

            clientes.forEach((cliente) => {

            var formData = new FormData();
        formData.append("secret", "e513c41e6b43f77bc144d81ba7c39db3914a7c59"); 
        formData.append("account", "1698170542e4da3b7fbbce2345d7772b0674a318d5653806aec6798");
        formData.append("recipient", operadora+cliente.telefono);
        formData.append("type", "media");
        formData.append("message", `Hola *${cliente.nombre}${cliente.apellido}* 
${areaMensaje.value}
        
        `);
        formData.append("media_file", inputFile.files[0]);

        var xhr = new XMLHttpRequest();
        
        xhr.open("POST", "https://whats-flow.com/api/send/whatsapp", true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                console.log("Mensaje enviado: " + JSON.stringify(result, null, 4));
                alert("Enviando mensajes, puede cerrar esta ventana")
            } else {
                console.log("Error al enviar el mensaje: " + xhr.statusText);
            }
        };

        xhr.onerror = function() {
            console.log("Error en la solicitud AJAX");
        };

        xhr.send(formData);
            })
            inputFile.value = ""
            areaMensaje.value = ""
        })
    })