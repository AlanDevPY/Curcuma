import{
    registrarClientes
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

    if(inputNombre.value === '' || inputApellido.value === '' || inputTelefono.value === ''|| inputDireccion.value === '' || inputReferencia.value === '' ){
        let nombre = inputNombre.value;
        let apellido = inputApellido.value;
        let telefono = inputTelefono.value;
        let direccion = inputDireccion.value;
        let referencia = inputReferencia.value;
        registrarClientes(nombre,apellido,telefono,direccion,referencia)
    }
})


