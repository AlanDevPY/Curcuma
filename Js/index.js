import {
    registrarClientes,
    obtenerClientes,
    borrarCliente
} from "./firebase.js";



const btnRegistrar = document.getElementById('btnRegistrar')
let inputNombre = document.getElementById('inputNombre')
let inputApellido = document.getElementById('inputApellido')
let inputTelefono = document.getElementById('inputTelefono')
let inputDireccion = document.getElementById('inputDireccion')
let inputReferencia = document.getElementById('inputReferencia')


// FUNCIONES

btnRegistrar.addEventListener('click', (e) => {
    e.preventDefault();

    if (!(inputNombre.value === '' || inputApellido.value === '' || inputTelefono.value === '' || inputDireccion.value === '' || inputReferencia.value === '')) {
        let nombre = inputNombre.value;
        let apellido = inputApellido.value;
        let telefono = inputTelefono.value;
        let direccion = inputDireccion.value;
        let referencia = inputReferencia.value;
        registrarClientes(nombre, apellido, telefono, direccion, referencia)

        inputNombre.value = ""
        inputApellido.value = ""
        inputTelefono.value = ""
        inputDireccion.value = ""
        inputReferencia.value = ""
    } else {
        console.log('No se puede registrar');
        alert('Favor completa todo los campos')
    }
})

window.addEventListener("DOMContentLoaded", async () => {
    let tBody = document.querySelector(".tBody");
    // Llamar a la función onGetTask cuando se obtienen las tareas de la base de datos
    obtenerClientes((querySnapshot) => {
        let html = ""; // Variable para almacenar el HTML generado
        let numero = 1
        const clientes = []; // Arreglo para almacenar objetos de tareas

        // Iterar a través de cada documento en la consulta de tareas
        querySnapshot.forEach((doc) => {
            const cliente = doc.data(); // Obtener los datos de la tarea
            clientes.push({ ...cliente, id: doc.id }); // Agregar cada tarea al arreglo 'tasks' con su ID
            // console.log(cliente.telefono);
        });


        // Generar el HTML para cada tarea y agregarlo a la variable 'html'
        clientes.forEach((cliente) => {
            html += `
        <tr>
        <td>${numero++}</td>
        <td>${cliente.nombre} ${cliente.apellido}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.direccion} + ${cliente.referencia}</td>
        <td><button data-id="${cliente.id}" class="btn btn-warning" type="button">Eliminar</button></td>
    </tr>
             `;
        });

        // Insertar el HTML generado en el contenedor de tareas en el DOM
        tBody.innerHTML = html;

        const btnDelet = tBody.querySelectorAll(".btn");

        // Agregar un evento de clic a cada botón de borrado
        btnDelet.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                // Llamar a la función deletTask con el ID de la tarea asociado al botón
                borrarCliente(event.target.dataset.id);
            });
        });
    });
});