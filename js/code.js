// -------------****-------------ANIMACION PARA VIDEO 

var v = document.getElementById("header_video");
v.autoplay = true;
v.load();
v.onplaying = function () {
    document.body.style.overflow = '';
};

//Executes only when the video ends
v.onended = function () {

    // Enabling the scroller 
    document.body.style.overflow = '';

    // Scrolling to the next element by
    // linking to its Id
    document.getElementById("landing_page").scrollIntoView();
    // document.body.style.overflow = 'hidden';

};

// -------------****-------------MODIFICAR TABLA DEL LOCAL STORAGE (AGREGAR ITEM) 
var input_tipo = document.getElementById('tipo_user');
console.log(input_tipo);
var input_marca = document.getElementById('marca_user');
var input_modelo = document.getElementById('modelo_user');
var input_especificacion = document.getElementById('especificacion_user');

function guardar_data() {
    debugger
    let contador_data = 1

    if (localStorage.getItem("contador") == null) {
        localStorage.setItem('contador', contador_data)
    } else {
        contador_data = localStorage.getItem("contador")
    }

    var tipo = document.getElementById('tipo_user').value;
    var marca = document.getElementById('marca_user').value;
    var modelo = document.getElementById('modelo_user').value;
    var especificacion = document.getElementById('especificacion_user').value;

    localStorage.setItem("tipo_" + contador_data, tipo);
    localStorage.setItem("marca_" + contador_data, marca);
    localStorage.setItem("modelo_" + contador_data, modelo);
    localStorage.setItem("especificacion_" + contador_data, especificacion);

    contador_data = parseInt(contador_data) + 1;
    localStorage.setItem("contador", contador_data);
    console.log(contador_data);
    let contador_actual = parseInt(contador_data) - 1;
    listado_data(contador_actual);

    document.getElementById("formulario_items").reset()
}

function listado_data(contador_actual = 1, actualiza_tabla = false) {
    debugger
    let body_tabla = document.getElementById("data-usuario-read");

    let titulo_formulario = document.getElementById("boton_formulario");
    titulo_formulario.innerHTML = `Agregar otro item`;

    if (actualiza_tabla) {
        let contador_futuro = localStorage.getItem('contador')
        for (let x = 1; x < contador_futuro; x++) {
            if (localStorage.getItem('tipo_' + x) != null && localStorage.getItem('marca_' + x) != null && localStorage.getItem('modelo_' + x)  != null && localStorage.getItem('especificacion_' + x)  != null) {
                body_tabla.innerHTML += `
            <tr class="blanco">
            <td>${localStorage.getItem('tipo_' + x)}</td>
            <td>${localStorage.getItem('marca_' + x)}</td>
            <td>${localStorage.getItem('modelo_' + x)}</td>
            <td>${localStorage.getItem('especificacion_' + x)}</td>
            <td>
            <button class="fas fa-edit fs-5 me-3 logos_botones blanco fondo_negro" onclick="editar_elemento(${x})"></button>
            <button class="fas fas fa-trash-alt fs-4 logos_botones blanco fondo_negro"  onclick="borrar_elemento(${x})"></button>
            </td>
            </tr>
            `
            }
        }
    } else {
        body_tabla.innerHTML += `
        <tr class="blanco">
        <td>${localStorage.getItem('tipo_' + contador_actual)}</td>
        <td>${localStorage.getItem('marca_' + contador_actual)}</td>
        <td>${localStorage.getItem('modelo_' + contador_actual)}</td>
        <td>${localStorage.getItem('especificacion_' + contador_actual)}</td>
        <td>
        <button class="fas fa-edit fs-5 me-3 logos_botones blanco fondo_negro" onclick="editar_elemento(${contador_actual})"></button>
        <button class="fas fas fa-trash-alt fs-4 logos_botones blanco fondo_negro"  onclick="borrar_elemento(${contador_actual})"></button>
        </td>
        </tr>
        `
    }
}

listado_data(1, true)

function editar_elemento(indice_dato) {
    debugger
    let boton = document.getElementById("boton_formulario");
    boton.setAttribute('onclick', `editar_elemento_accion(${indice_dato})`);

    let titulo_formulario = document.getElementById("boton_formulario");
    titulo_formulario.innerHTML = `Actualizar item`;

    input_tipo.value = localStorage.getItem("tipo_" + indice_dato);
    input_marca.value = localStorage.getItem("marca_" + indice_dato);
    input_modelo.value = localStorage.getItem("modelo_" + indice_dato);
    input_especificacion.value = localStorage.getItem("especificacion_" + indice_dato);
}

function editar_elemento_accion(indice_dato) {
    // debugger
    var tipo_actualizacion = document.getElementById('tipo_user').value
    var marca_actualizacion = document.getElementById('marca_user').value
    var modelo_actualizacion = document.getElementById('modelo_user').value
    var especificacion_actualizacion = document.getElementById('especificacion_user').value

    localStorage.setItem("tipo_" + indice_dato, tipo_actualizacion)
    localStorage.setItem("marca_" + indice_dato, marca_actualizacion)
    localStorage.setItem("modelo_" + indice_dato, modelo_actualizacion)
    localStorage.setItem("especificacion_" + indice_dato, especificacion_actualizacion)

    let body_tabla = document.getElementById("data-usuario-read")
    body_tabla.innerHTML = ''

    // let titulo_formulario = document.getElementById("titulo_accion_formulario")
    // titulo_formulario.innerHTML = `Insertar nuevo dato`

    listado_data(1, true)
    let boton = document.getElementById("boton_formulario")
    boton.setAttribute('onclick', `guardar_data()`)

    document.getElementById("formulario_items").reset()
}

function borrar_elemento(indice_dato) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "Recuerda que entre mas items, te podremos armar una mejor consola!",
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Si, borralo!',
        cancelButtonText: 'No, cancela!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            let body_tabla = document.getElementById("data-usuario-read");
            body_tabla.innerHTML = '';
            localStorage.removeItem("tipo_" + indice_dato);
            localStorage.removeItem("marca_" + indice_dato);
            localStorage.removeItem("modelo_" + indice_dato);
            localStorage.removeItem("especificacion_" + indice_dato);
            listado_data(1, true);

            swalWithBootstrapButtons.fire(
                'Borrado!',
                'El item ha sido borrado.',
                'success'
            )
            document.getElementById("formulario_items").reset()
        }
    })
}

// -------------****-------------MODIFICAR TABLA DEL LOCAL STORAGE (ENVIAR FORMULARIO) 

function enviar_formulario() { //Guarda los datos del usuario y el textbox, luego envia la informacion.
    debugger
    let contador_data = 1
    if (localStorage.getItem("contador") == null) {
        localStorage.setItem('contador', contador_data)
    } else {
        contador_data = localStorage.getItem("contador")
    }
    var nombre = document.getElementById('nombre_user').value;
    var telefono = document.getElementById('telefono_user').value;
    var correo = document.getElementById('correo_user').value;
    var direccion = document.getElementById('direccion_user').value;
    var remark = document.getElementById('remark_user').value;
    var presupuesto = document.getElementById('presupuesto_user').value;

    localStorage.setItem("nombre_", nombre);
    localStorage.setItem("telefono_", telefono);
    localStorage.setItem("correo_", correo);
    localStorage.setItem("direccion_", direccion);
    localStorage.setItem("remark_", remark);
    localStorage.setItem("remark_", presupuesto);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Dentro de las proximas 3 horas nos contactataremos contigo y te mostraremos todas las opciones que tienes para armar tu equipo de ensueño. Recuerda #¡SomosGamers!',
        showConfirmButton: false,
        timer: 5000
    })

    document.getElementById("formulario_info").reset()
    document.getElementById("data-usuario-read").reset()
    document.getElementById('nombre_user').reset()
    document.getElementById('telefono_user').reset()
    document.getElementById('correo_user').reset()
    document.getElementById('direccion_user').reset()
    document.getElementById('remark_user').reset()
    document.getElementById('presupuesto_user').reset()

}
