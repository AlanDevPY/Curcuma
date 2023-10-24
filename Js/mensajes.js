import {
    obtenerClientes,
} from "./firebase.js";


let btnEnvio = document.getElementById("btnEnvio")
let areaMensaje = document.getElementById("areaMensaje")
let operadora = 595
// let inputFile = document.getElementById("inputFile")




    btnEnvio.addEventListener('click', (e) => {
        e.preventDefault()


        obtenerClientes((querySnapshot) => {
            const clientes = []; // Arreglo para almacenar números de teléfono
            querySnapshot.forEach((doc) => {
                const cliente = doc.data();
                clientes.push(cliente);
            });

            clientes.forEach((cliente) => {

                var chat = {
                    secret: "e513c41e6b43f77bc144d81ba7c39db3914a7c59",
                    account: "1697991046e4da3b7fbbce2345d7772b0674a318d565354986185a6",
                    recipient: operadora+cliente.telefono,
                    type: "text",
                    message: `Hola *${cliente.nombre} ${cliente.apellido}*
${areaMensaje.value}
                    `, // Aquí debes proporcionar el mensaje que deseas enviar
                  }; 
          

                  $.ajax({
                    type: "POST",
                    url: "https://whats-flow.com/api/send/whatsapp",
                    data: chat,
                    success: function (response) {
                      // Maneja la respuesta del servidor aquí (puede requerir validación)
                      console.log(response);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                      // Maneja los errores de manera adecuada, muestra mensajes al usuario si es necesario
                      console.error("Error en la solicitud: " + textStatus, errorThrown);
                    },
                  });


            })
            
            areaMensaje.value = ""
        })
    })